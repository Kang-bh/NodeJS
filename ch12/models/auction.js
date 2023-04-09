const Sequelize = require('sequelize');

class Auction extends Sequelize.Model {
  static initiate(sequelize) {
    Auction.init({
      bid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0,
      },
      msg: {
        type: Sequelize.STRING(100),
        allowNull: true,
      },
    }, {
      sequelize,
      timestamps : true,
      paranoid : true,
      modelName : 'Auction',
      tableName : 'auctions',
      charset : 'utf8',
      collate : 'utf8_general_ci',
    });
  }

  static associate (db) {
    db.Auction.hasMany(db.User);
    db.Auction.hasMany(db.Good);
  }
};

module.exports = Auction;