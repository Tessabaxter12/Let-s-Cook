//Our Schema and dependencies 
const mongoose = require('../utils/connection')

// destructuring the Schema and model from mongoose
const { Schema, model } = mongoose

//Schema definition
const placeSchema = new Schema({
    title: { type: String, required: true },
    wantToTry: { type: Boolean, required: true },
    favorite: { type: Boolean, required: true },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

//create user model
const Recipe = model('Recipe', recipeSchema)

//export user model
module.exports = Recipe