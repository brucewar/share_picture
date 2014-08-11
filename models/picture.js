/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('picture', { 
    upload_date: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW
    },
    fullimage_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbnail_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_avatar: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};
