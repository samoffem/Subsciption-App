const bcrypt = require('bcryptjs')

module.exports = (sequelize, DataType)=>{
    const User = sequelize.define('User', {
        id:{
            type:DataType.UUID,
            defaultValue: DataType.UUIDV4,
            allowNull: false,
            primaryKey:true
        },
        email: {
            type: DataType.STRING,
            unique: true
        },
        password: DataType.STRING
    })

    User.prototype.comparePassword = function(password) {
        
        return bcrypt.compare(password, this.password).then(function(result){
            return result
        })
        
    }

    return User
}
    