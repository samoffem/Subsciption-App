const {sequelize, Channel} = require('../models')
const channels = require('./channels.json')

sequelize.sync({force:true})
.then(function(){
    channels.map(async (channel)=>{
        await Channel.create(channel)
    })
}).catch(err=>console.log(err))