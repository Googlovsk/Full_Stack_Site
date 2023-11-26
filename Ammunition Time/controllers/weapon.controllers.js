const db = require('../db.js')

class WeaponController{
    async createWeapon(req, res){
        const {name, info, price, dmgtype, weight, img} = req.body
        const newWeapon = await db.query(`INSERT INTO weapons (name, info, price, dmgtype, weight, img) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [name, info, price, dmgtype, weight, img])
        res.json(newWeapon.rows[0])
    }
    async getAllWeapons(req, res){
        const weapons = await db.query(`SELECT * FROM weapons`)
        res.json(weapons.rows)
    }
    async getWeapon(req, res){
        const id = req.params.id
        const weapon = await db.query(`SELECT * FROM weapons WHERE id = $1`, [id])
        if (weapon.rows.length > 0){
            res.json(weapon.rows[0])
        } else {
            res.status(404).json({ error: 'Weapon no found'})
        }
    }
    async updateWeapon(req, res){
        const id = req.params.id
        const {name, info, price, dmgtype, weight, img} = req.body
        const weapons = await db.query(`UPDATE weapons SET name = $1, info = $2, price = $3, dmgtype = $4, weight = $5, img = $6 WHERE id = $7 RETURNING *`, [name, info, price, dmgtype, weight, img, id])
        res.json(weapons.rows)
    }
    async deleteWeapon(req, res){
        const id = req.params.id
        const deletedweapon = await db.query(`DELETE FROM weapons WHERE id = $1`, [id])
        res.json(deletedweapon.rows)
    }
}

module.exports = new WeaponController()