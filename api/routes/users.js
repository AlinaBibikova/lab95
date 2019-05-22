const express = require('express');
const axios = require('axios');
const nanoid = require('nanoid');
const User = require('../models/User');

const router = express.Router();
const config = require('../config');

router.post('/facebookLogin', async (req, res) => {
    const inputToken = req.body.accessToken;
    const accessToken = config.facebook.appId + '|' + config.facebook.appSecret;
    const debugTokenUrl = `https://graph.facebook.com/debug_token?input_token=${inputToken}&access_token=${accessToken}`;

    try {
        const response = await axios.get(debugTokenUrl);

        const responseData = response.data;

        if (responseData.data.error) {
            return res.status(500).send({error: 'Token incorrect'});
        }

        if (responseData.data.user_id !== req.body.id) {
            return res.status(500).send({error: 'User is wrong'});
        }

        let user = await User.findOne({facebookId: req.body.id});

        if (!user) {
            user = new User({
                username: (req.body.email ||req.body.name) || req.body.id,
                displayName: req.body.name || 'Anonymous',
                avatar: req.body.picture.data.url,
                password: nanoid(),
                facebookId: req.body.id
            });
        }

        user.generateToken();

        await user.save();

        return res.send({message: 'Login or register successful!', user});
    } catch (e) {
        return res.status(500).send({error: 'Something went wrong'});
    }
});

module.exports = router;