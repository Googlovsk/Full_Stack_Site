const db = require('../db.js')

class ArmorController{
    async createArmor(req, res){
        const {name, info, price, weight, img} = req.body
        const newArmor = await db.query(`INSERT INTO armor (name, info, price, weight, img) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [name, info, price, weight, img])
        res.json(newArmor.rows[0])
    }
    async getAllArmor(req, res){
        const armor = await db.query(`SELECT * FROM armor`)
        res.json(armor.rows)
    }
    async getArmor(req, res){
        const id = req.params.id
        const armor = await db.query(`SELECT * FROM armor WHERE id = $1`, [id])
        if (armor.rows.length > 0){
            res.json(armor.rows[0])
        } else {
            res.status(404).json({ error: 'Armor no found'})
        }
    }
    async updateArmor(req, res){
        const id = req.params.id
        const {name, info, price, weight, img} = req.body
        const armor = await db.query(`UPDATE armor SET name = $1, info = $2, price = $3, weight = $4, img = $5 WHERE id = $6 RETURNING *`, [name, info, price, weight, img, id])
        res.json(armor.rows)
    }
    async deleteArmor(req, res){
        const id = req.params.id
        const deletedArmor = await db.query(`DELETE FROM armor WHERE id = $1`, [id])
        res.json(deletedArmor.rows)
    }
}

module.exports = new ArmorController()