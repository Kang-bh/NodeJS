const Sequelize = require('sequelize');
const User = require("./user");
const config = require('../config/config.json')['test']
const sequelize = new Sequelize(config.database, config.username, config.password, config);

describe('User model', () => {
    test('static init method', () => {
        expect(User.init(sequelize)).toBe(User);
    })
    test('static associoate method', () => {
        const db = {
            User : {
                hasMany: jest.fn(),
                belongsToMany: jest.fn()
            },
            Post : {} 
        }
        User.associate(db)
        expect(db.User.hasMany).toBeCalledWith(db.Post);
        expect(db.User.belongsToMany).toBeCalledTimes(2);
    })

})