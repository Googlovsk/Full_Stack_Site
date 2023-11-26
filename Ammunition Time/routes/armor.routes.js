const ArmorRouter = require('express')
const armorRouter = new ArmorRouter()
const armorController = require('../controllers/armor.controller.js')

armorRouter.post('/armor', armorController.createArmor)
armorRouter.get('/armor', armorController.getAllArmor)
armorRouter.get('/armor/:id', armorController.getArmor)
armorRouter.put('/armor/:id', armorController.updateArmor)
armorRouter.delete('/armor/:id', armorController.deleteArmor)

module.exports = armorRouter