//Schema and dependencies
const mongoose = require('../utils/connection')

//Destructuring the Schema and model from mongoose
const { Schema, model } = mongoose

//Schema definition
const recipeSchema = new Schema({
    title: { type: String },
    id: { type: String, required: true },
    instructions: { type: String, required: true },
    tried: { type: Boolean, default: false },
    favorite: { type: Boolean, default: false },
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
})

//Create user model
const Recipe = model('Recipe', recipeSchema)

//export user model
module.exports = Recipe