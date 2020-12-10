const {User} = require('../models')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const config = require('../config/config')

function jwtSignUser(user){
    const ONE_WEEK = 60*60*24*7
    return jwt.sign(user, config.authentication.jwtSecret, {
        expiresIn: ONE_WEEK
    })
}

module.exports = {
    async register(req, res){
        try{
            let hashPassword = bcrypt.hashSync(req.body.password, 8)
            let userData = {
                email: req.body.email,
                password: hashPassword
            }
            const user = await User.create(userData)
            const userJSON = user.toJSON()
            res.send({
                user: userJSON
            })
        } catch(err){
            res.status(400).send({
                error: "This email account is already in use"
            })
        }
    },

    async login(req, res){
        try{
            const {email, password} = req.body
            const user = await User.findOne({
                where: {
                    email: email
                }
            })
            
            if(!user){
                return res.status(403).send({
                    error: "Invalid Email"
                })
            }
            const isPasswordValid = await user.comparePassword(password)
            if(!isPasswordValid){
                return res.status(403).send({
                    error: "The password is incorrect"
                })
            }
            const userJSON = user.toJSON()
            res.send({
                user: userJSON,
                token: jwtSignUser(userJSON)
            })
            
           
        } catch(err){
            console.log(err)
            res.status(500).send({
                error: "An error has occured trying to log in"
            })
        }
    },

    getUser(req, res){
        try{
            console.log(req.user)
            res.send(req.user)
            
            // const {email, password} = req.body
            // const user = await User.findOne({
            //     where: {
            //         email: email
            //     }
            // })
            
            // if(!user){
            //     return res.status(403).send({
            //         error: "Invalid Email"
            //     })
            // }
            // const isPasswordValid = await user.comparePassword(password)
            // if(!isPasswordValid){
            //     return res.status(403).send({
            //         error: "The password is incorrect"
            //     })
            // }
            // const userJSON = user.toJSON()
            // res.send({
            //     user: userJSON,
            //     token: jwtSignUser(userJSON)
            // })
            
           
        } catch(err){
            console.log(err)
            res.status(500).send({
                error: "An error has occured trying to get user"
            })
        }
    }
}