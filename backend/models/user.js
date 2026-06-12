const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {

  }

  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true, 

      }
    },
    email_verified_at: {
      type: DataTypes.DATE,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: "User"
  })
  return User;
}