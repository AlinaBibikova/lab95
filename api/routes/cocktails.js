const express = require('express');
const multer = require('multer');
const config = require('../config');
const nanoid = require('nanoid');
const auth = require('../middleware/auth');
const permit = require('../middleware/permit');

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


router.get('/', auth, (req, res) => {
    if (req.user.role === 'user') {
        Cocktail.find({published: true})
            .then(result => {res.send(result)})
            .catch(() => res.sendStatus(500));
    } else {
        Cocktail.find()
            .then(artist => res.send(artist))
            .catch(() => res.sendStatus(500));
    }
});

router.post('/', auth, upload.single('image'), (req, res) => {
    const cocktailData = req.body;
    if (req.file) {
        cocktailData.image = req.file.filename;
    }

    const cocktail = new Cocktail(cocktailData);

    cocktail.save()
        .then(result => res.send(result))
        .catch(error => res.status(400).send(error))
});

router.delete('/:id', [auth, permit('admin')], async (req, res) => {
    try {
        await Cocktail.deleteOne({_id: req.params.id});
        return res.sendStatus(200);
    } catch (error) {
        return res.status(400).send(error);
    }
});

router.post('/publish/:id', [auth, permit('admin')], async (req, res) => {
    try {
        const cocktail = await Cocktail.findById(req.params.id);
        cocktail.published = req.body.status;
        cocktail.save();
        res.send({message: "Published"})
    } catch (e) {
        res.send({message: "Error occured"})
    }
});