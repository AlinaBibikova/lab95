const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CocktailSchema = new Schema ({
    user: {
        type: Schema.ObjectId,
        ref: 'User',
    },
    nameCocktail: {
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
        {nameIngredient: String,
        amount: String,
        position: {type: Number, required: true}}
        ],
    rating: [{userId: String,
         grade: String}]
});

const Item = mongoose.model('Item', CocktailSchema);

module.exports = Item;