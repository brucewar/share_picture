/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('game', { 
    game_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    game_id: {
      type: DataTypes.INTEGER(11),
      primaryKey: true,
      allowNull: false,
    },
    create_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    picture_pathes: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    played_times: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
    },
    last_players: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    owner_id: {
      type: DataTypes.STRING,
      allowNull: true,
    }
  });
};
