const {Subscription} = require('../models')
module.exports = {
    async index(req, res){
        try{
            const {UserId} = req.query
            const subscription = await Subscription.findAll({
                where: {
                    UserId
                }
            })
            res.send(subscription)
            
        } catch(err){
            console.log(err)
            res.status(500).send({
                error: "An error has occured trying to fetch subscription"
            })
        }
    },
    async allSub(req, res){
        try{
            const {UserId} = req.query
            const subscription = await Subscription.findAll({})
            res.send(subscription)
            
        } catch(err){
            console.log(err)
            res.status(500).send({
                error: "An error has occured trying to fetch subscription"
            })
        }
    },
    async post(req, res){
        try{
            
            if(req.body.UserId == null || req.body.ChannelId == null){
                res.send("cannot create subscription for null")
                return
            }
            const existing = await  Subscription.findOne({
                where:{
                    UserId: req.body.UserId,
                    ChannelId: req.body.ChannelId
                }
            })
            if(existing){
                res.status(403).send({
                    error: "User already subscribed to this channel"
                })
                return
            }
            const subscription = await Subscription.create(req.body)
            res.send(subscription)
            
        } catch(err){
            console.log(err)
            res.status(500).send({
                error: "An error has occured trying to create subscription"
            })
        }
    },
    async remove(req, res){
        try{
            const {ChannelId, UserId} = req.body
            const subscription = await Subscription.destroy({
                where:{
                    ChannelId,
                    UserId
                }
            })
            res.send(subscription)

        }catch(err){
            res.status(500).send({
                error: "An error occur trying to unsubscribe"
            })
        }
    }
    
}