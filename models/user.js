/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', { 
    user_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
    },
    nick_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    avatar_path: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};
