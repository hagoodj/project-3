module.exports = function(sequelize, DataTypes) {
    var Request = sequelize.define("Request", {
        amount: {
            type: DataTypes.INTEGER
        },
        accepted: {
            type: DataTypes.BOOLEAN
        }
    })
    return Request
};