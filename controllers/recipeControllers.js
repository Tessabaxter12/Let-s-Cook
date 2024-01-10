//Import Dependencies
const express = require('express')
const axios = require('axios')
const Recipe = require('../models/recipe')

//Create Router
const router = express.Router()

//Routes + Controllers
// GET -> /Search/allRecipes
router.get('/all', (req, res) => {
    const { username, loggedIn, userId } = req.session
    // we have to make our api call
    axios('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(response => {
    //    res.send(response.data)
    // apiRes.data is an array of objects
    res.render('recipes/search', {recipes: response.data.meals, username, userId, loggedIn})
    })
    // if something goes wrong, display an error page
    .catch(err => {
    console.log(err)
    res.redirect(`/error?error=${err}`)
    })
})

//Routes + Controllers
//Sends To Search By Ingredients Page
router.get('/ingredient', (req, res) => {
    const { username, loggedIn, userId } = req.session
    res.render('recipes/ingredient', { username, loggedIn, userId })
})

// GET -> /Search By Ingredients Recipes
router.get('/result', (req, res) => {
    const { username, loggedIn, userId } = req.session
    // we have to make our api call
    axios(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${req.query.ingredient}`)
    // if we get data, render an index page
    .then(apiRes => {
    // apiRes.data is an array of objects
    //res.send(apiRes.data)
    res.render('recipes/result', {recipes: apiRes.data.meals, username, userId, loggedIn})
    })
    // if something goes wrong, display an error page
    .catch(err => {
    console.log('error')
    res.redirect(`/error?error=${err}`)
    })
})

//gets data from the recipe search page and add it to the users list
router.post('/favorite', (req, res) => {
    const { username, loggedIn, userId } = req.session
    
    const theRecipe = req.body
    theRecipe.owner = userId
    theRecipe.favorite = false

    Recipe.create(theRecipe)
        .then(newRecipe => {
            res.redirect(`/recipes/favorite`)
        })
        .catch(err => {
            console.log('error')
            res.redirect(`/error?error=${err}`)
        })
})

//displays all the user's saved favorites
router.get('/favorite', (req, res) => {
    const { username, loggedIn, userId } = req.session
    // query the db for all recipe to the logged in user
    Recipe.find({ owner: userId })
        // display them in a list format
        .then(userRecipe => {
            console.log(userRecipe)
            res.render('recipes/favorite', { recipes: userRecipe, username, loggedIn, userId })
        })
        // or display any errors
        .catch(err => {
            console.log('error')
            res.redirect(`/error?error=${err}`)
        })
})

// Delete route
// Remove Recipe from a user's list to an authorized user
router.post('/delete/:id', async (req, res) => {
    try{
        const { username, loggedIn, userId } = req.session
          // get the recipe id from the url
        const recipeId = req.params.id
          // target the specific recipe
        const recipe = await Recipe.findById(recipeId)
      // determine if loggedIn user is authorized to delete this(aka, the owner)
    if (recipe.owner == userId) {
          // here is where we delete
        await Recipe.findByIdAndDelete(recipeId)
        return res.redirect('/recipes/favorite')
    }
    } catch(err) {
        console.log('error')
        res.redirect(`/error?error=${err}`)
    }
})

// UPDATE -> /recipe/update/:id
router.post('/update/:id', async (req, res) => {
    try{
        const { username, loggedIn, userId } = req.session
          // get the recipe id from the url
        const recipeId = req.params.id
          // target the specific recipe
        const recipe = await Recipe.findById(recipeId)
      // determine if loggedIn user is authorized to delete this(aka, the owner)
    if (recipe.owner == userId) {
          // here is where we update
        await Recipe.findByIdAndUpdate(recipeId,{title:req.body.title})
        return res.redirect('/recipes/favorite')
    }
    } catch(err) {
        console.log('error')
        res.redirect(`/error?error=${err}`)
    }
})

//Export Router
module.exports = router