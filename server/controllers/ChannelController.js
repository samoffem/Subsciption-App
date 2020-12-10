const {Channel} = require('../models')


module.exports = {
    async index(req, res){
        try{
            const channel = await Channel.findAll({
                limit:10
            })
            res.send(channel)
            
        } catch(err){
            console.log(err)
            res.status(500).send({
                error: "An error has occured trying to fetch channel"
            })
        }
    },
    async post(req, res){
        try{
            
            const channel = await Channel.create(req.body)
            res.send(channel)
            
        } catch(err){
            console.log(err)
            res.status(500).send({
                error: "An error has occured trying to create channel"
            })
        }
    }


    
}