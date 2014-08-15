/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('picture', { 
    id: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      autoIncrement: true
    },
    upload_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    fullimage_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbnail_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    user_id: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};
