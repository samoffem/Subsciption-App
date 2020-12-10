
module.exports = (sequelize, DataType)=>{
    const Channel = sequelize.define('Channel', {
        id:{
            type:DataType.UUID,
            defaultValue: DataType.UUIDV4,
            allowNull: false,
            primaryKey:true
        },
        name:{
            type: DataType.STRING,
            unique: true
        }
    })
    return Channel
}