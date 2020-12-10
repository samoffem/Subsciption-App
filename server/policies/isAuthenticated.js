const passport = require('passport')

const isAuthenticated = (req, res, next)=>{
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
module.exports = isAuthenticated