module.exports = function (sequelize, DataTypes) {

    var User = sequelize.define('User', {

        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 10]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [6, 10]
            }
        },
        email: {
            type: DataTypes.STRING,
            validate: {
                isEmail: true
            }
        }
    });
    User.associate = function (models) {

        User.belongsToMany(models.donatorcard, {
            through: {
                model: models.request
            }
        });
        
    };

    User.associate = function (models) {

        User.belongsToMany(models.requestorcard, {
            through: {
                model: models.donation
            }
        });

    };

    return User;
};