const WeaponRouter = require('express')
const weaponRouter = new WeaponRouter()
const weaponController = require('../controllers/weapon.controllers.js')

weaponRouter.post('/weapon', weaponController.createWeapon)
weaponRouter.get('/weapon', weaponController.getAllWeapons)
weaponRouter.get('/weapon/:id', weaponController.getWeapon)
weaponRouter.put('/weapon/:id', weaponController.updateWeapon)
weaponRouter.delete('/weapon/:id', weaponController.deleteWeapon)

module.exports = weaponRouter