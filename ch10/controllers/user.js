const User = require('../models/user');

exports.addFollowing = async (req, res, next) => {
    try { 
        const user = await User.findOne({ where: { id: req.user.id } });
        if (user) {
            await user.addFollowings(parseInt(req.params.id, 10));
            res.status(200).send('success');
        } else {
            res.status(404).send('no user');
        }
    } catch (error) {
        console.error(error);
        next(error);
    }
}
