const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.static('public'));

const users = require('./routes/users');
const cocktails = require('./routes/cocktails');

app.use(cors());

const port = 8000;

mongoose.connect(config.dbUrl, config.mongoOptions).then( () => {
    app.use('/users', users);
    app.use('/cocktails', cocktails);
});

app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
});