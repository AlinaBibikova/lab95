const User = require('../models/User');

const checkUser = async (req, res, next) => {
    const token = req.get('Authorization');
    if (token) {
        const user = await User.findOne({token});
        req.user = user;
    }
    next();
};

module.exports = checkUser;