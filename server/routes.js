const express = require('express')
const authControllerPolicy = require('./policies/authControllerPolicy')
const AuthController = require('./controllers/AuthController')
const ChannelController = require('./controllers/ChannelController')
const SubscriptionController = require('./controllers/SubscriptionController')
const passport = require('passport')
const {isAuthenticated} = require('./policies/isAuthenticated')


const route = express.Router()

const isAuth = (req, res, next)=>{
    passport.authenticate('jwt', (err, user)=>{
        if(err || !user){
            res.status(403).send({
                error: "You do not have access to this resources"
            })
        }else{
            req.user = user
            next()
        }
    })(req, res, next)
}

route.post('/register', authControllerPolicy.register, AuthController.register)
route.get('/getuser', isAuth, AuthController.getUser)
route.post('/login', AuthController.login)
route.get('/channels', ChannelController.index)
route.post('/channel', ChannelController.post)
route.get('/subscription', SubscriptionController.index)
route.get('/allsub', SubscriptionController.allSub)
route.post('/subscription', SubscriptionController.post)
route.delete('/unsubscribe', SubscriptionController.remove)

module.exports = route