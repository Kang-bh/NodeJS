const { Op } = require('sequelize');
const { Good, Auction, User } =require('../models');

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

const renderGoods = (req, res) => {
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
        return res.redirect('/');
    } catch (error) {
        console.error(error);
        next(error);
    }
}

const renderGood = async (req, res, next) => {
    try {
        const [good, auction] = await Promise.all([
            Good.findOne({
                where : { id : req.params.goodId },
                include : {
                    model: User,
                    as: 'Owner',
                },
            }),
            Auction.findAll({
                where : { GoodId : req.params.goodId },
                include : {model: User},
                order: [['bid', 'ASC']],
            }),
        ]);
        console.log(3)
        res.render('auction', {
            title: `${good.name} - NodeAuction`,
            good,
            auction,
        });
    } catch (err) {
        console.error(err);
        next(err);
    }
}

const bidGoods = async (req, res, next) => {
    try {
        const {bid, msg} = req.body;
        const good = await Good.findOne({
            where : {
                id : req.params.goodId
            },
            include : {
                model : Auction,
            },
            order : [[{model : Auction}, 'bid', "DESC"]],
        });

        if (!good) {
            return res.status(404).send("The good is not exist");
        }
        if (good.price >= bid) {
            return res.status(403).send('The price must be higher than the starting bid price');
        }
        if (new Date(good.createdAt).valueOf() + (24 * 60 * 60 * 1000) < new Date()) {
            return res.status(403).send('The Auction is already finished')
        }
        if (good.Auctions?.bid >= bid) {
            return res.status(403).send('The price must be higher than the previous bid price');
        }
        const result = await Auction.create({
            bid,
            msg,
            UserId: req.user.id,
            GoodId: req.params.id,
        })

        req.app.get('io').to(req.params.goodId).emit('bid', {
            bid : result.bid,
            msg : result.msg,
            nick : req.user.nick,
        })
        return res.send('ok');
    } catch (err) {
        console.error(err);
        return next(err);
    }
}

module.exports = {
    renderMain,
    renderJoin,
    renderGood,
    renderGoods,
    createGood,
    bidGoods,
}