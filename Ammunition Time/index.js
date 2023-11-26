const express = require('express')
const cors = require('cors')

const weaponRouter = require('./routes/weapon.routes.js')
const armorRouter = require('./routes/armor.routes.js')

const PORT = process.env.PORT || 8080
const app = express()

app.use(cors())
app.use(express.json())

app.use(weaponRouter)
app.use(armorRouter)


app.listen(PORT, ()=>console.log(`Server started on port ${PORT}`))