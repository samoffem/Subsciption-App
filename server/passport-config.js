const passport = require('passport')
const JWTStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const config = require('./config/config')
const {User} = require('./models')

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.authentication.jwtSecret
}

const strategy = new JWTStrategy(opts, async (payload, next)=>{

    try{
        const user = await User.findOne({
            where:{
                id: payload.id
            }
        })

        if(!user){
            return next(new Error, false)
        }
        return next(null, user)

    }catch{
        return next(new Error, false)
    }
})

passport.use(strategy)