const express = require('express')
const cors = require('cors')
const route = require('./routes')
const {sequelize} = require('./models')
const config = require('./config/config')
require('./passport-config')

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(route)


sequelize.sync({force:false})
.then(()=>{
    app.listen(config.port)
    console.log(`server started on port ${config.port}`)
})