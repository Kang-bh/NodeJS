const { Op } = require('sequelize');
const { Good } =require('../models');

const renderMain = async (req, res, next) => {
    try {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const goods = await Good.findAll({
            where : {
                SoldId : null, createdAt : { [Op.gte] : yesterday}
            }
        });

        res.render('main', {
            title : 'NodeAuction',
            goods,
        });
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const renderJoin = (req, res) => {
    res.render('join', {
        title : '회원가입 - NodeAuction',
    });
};

const renderGood = (req, res) => {
    res.render('good', { title : '상품 등록 - NodeAuction'});
}

const createGood = async (req, res, next) => {
    try {
        const { name, price } = req.body;
        await Good.create({
            OwnerId: req.user.id, // todo : study sequelize
            name,
            img: req.file.filename,
            price,
        })
        res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
}

module.exports = {
    renderMain,
    renderJoin,
    renderGood,
    createGood,
}