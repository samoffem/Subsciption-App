
module.exports = (sequelize, DataType)=>{
    const Subscription = sequelize.define('Subscription', {});

    Subscription.associate = function(models){
        Subscription.belongsTo(models.User)
        Subscription.belongsTo(models.Channel)
    }
    return Subscription
}