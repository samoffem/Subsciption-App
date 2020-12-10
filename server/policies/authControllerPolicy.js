const Joi = require('joi')

module.exports = {
    register(req, res, next){
        const schema = Joi.object({
            email: Joi.string().email(),
            password: Joi.string().regex(new RegExp('^[a-zA-Z0-9]{4,32}$'))
        })
        const {error, value} = schema.validate(req.body)

        if(error){
            console.log(error)
            switch(error.details[0].context.key){
                case 'email':
                    res.status(400).send({
                        error: "You must provide a valid email address"
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `The password provided failed to match one of the following rules
                        <br/>
                        1. It must contain only the following characters: lowercase, uppercase, numbers
                        <br/>
                        2. Your password must not be less than 4 characters or greater than 32 characters
                        `
                    })
                    break
                default:
                    res.status(400).send({
                        error: "Invalid registration Information"
                    })
            }

        }else{
            next()          
        }

    }
    
}