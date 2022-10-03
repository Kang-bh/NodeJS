const Sequelize = require('sequelize');

module.exports = class Domian extends Sequelize.Model {
    static init(sequelize) {
        return super.init({
            host: {
                type: Sequelize.STRING(80),
                allowNull: false,
            },
            type: {
                type: Sequelize.ENUM('free', 'premium'),
                allowNull: false,
            },
            clientSecret: {
                type: Sequelize.UUID, // sequelize type 지원, 유효성 검사까지 해준다.
                allowNull: false,
            },
        }, {
            sequelize,
            timestamps: true,
            paranoid: true,
            modelName: 'Domain',
            tableName: 'domains',
        });
    }


    static associate(db) {
        db.Domain.belongsTo(db.User);
    }
}