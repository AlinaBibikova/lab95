const express = require('express');
const multer = require('multer');
const config = require('../config');
const nanoid = require('nanoid');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');
const checkUser = require('../middleware/checkUser');

const Cocktail = require('../models/Cocktail');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, config.uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, nanoid() + path.extname(file.originalname))
    }
});

const upload = multer({storage});
const router = express.Router();

router.get('/', checkUser, async (req, res) => {
    const criteria = {isPublished: true};

    if (req.user && req.user.role === 'admin') {
        delete criteria.isPublished
    }

    try {
        const cocktail = await Cocktail.find(criteria);
        return res.send(cocktail);
    } catch {
        return res.sendStatus(500);
    }
});

router.get('/:id', checkUser, async (req, res) => {
    const criteria = {isPublished: true, _id: req.params.id};

    if (req.user && req.user.role === 'admin') {
        delete criteria.isPublished
    }

    try {
        const cocktail = await Cocktail.findOne(criteria);

        if (cocktail) {
            return res.send(cocktail);
        } else {
            return res.sendStatus(404);
        }

    } catch {
        return res.sendStatus(500);
    }
});

router.post('/', auth, upload.single('image'), async (req, res) => {
    const cocktailData = req.body;
    if (req.file) {
        cocktailData.image = req.file.filename;
    }

    try {
        const cocktail = new Cocktail(cocktailData);

        await cocktail.save();
        return res.send({message: 'Cocktail added!', artist: cocktail});
    } catch {
        return res.sendStatus(400);
    }
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        await Cocktail.deleteOne({_id: req.params.id});
        return res.sendStatus(200);
    } catch {
        return res.status(400);
    }
});

router.post('/:id/toggle_publish', [auth, permit('admin')], async (req, res) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);

        if(!cocktail) {
            return res.sendStatus(404);
        }

        cocktail.isPublished = !cocktail.isPublished;
        await cocktail.save();

        return res.send(cocktail);
    } catch {
        return res.sendStatus(400);
    }
});

module.exports = router;