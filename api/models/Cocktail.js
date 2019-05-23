const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CocktailSchema = new Schema({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    name: {
        type: String,
        required: true,
    },
    image: String,
    recipe: {
        type: String,
        required: true,
    },
    published: {
        type: Boolean,
        default: false,
        enum: [true, false]
    },
    ingredients: [
        {
            name: String,
            amount: String,
            position: {type: Number, required: true}
        }
    ],
    rating: [
        {
            userId: String,
            grade: String
        }
    ]
});

const Cocktail = mongoose.model('Cocktail', CocktailSchema);

module.exports = Cocktail;