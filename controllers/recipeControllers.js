//Import Dependencies
const express = require('express')
const axios = require('axios')
const apiUrlFront = process.env.SEARCH_BY_INGREDIENTS_API_URL
const apikey = process.env.API_KEY
const apiUrlRecipe = process.env.RECIPE_API_URL

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
// GET -> /ID
router.get('/:id', (req, res) => {
    const { username, loggedIn, userId } = req.session
      // find a specific place using the id
    recipe.findById(req.params.id)
    // we have to make our api call
    axios(`${apiUrlCard}?apiKey=${apikey}`)
    // if we get data, render an index page
    .then(apiRes => {
    // apiRes.data is an array of objects
    res.send(apiRes.data)
    //res.render('recipes/recipe', {recipes: apiRes.data.recipes, username, userId, loggedIn})
    })
    // if something goes wrong, display an error page
    .catch(err => {
    console.log('error')
    res.redirect(`/error?error=${err}`)
    })
})

// POST -> /recipe/add
// gets a recipe card from the recipe page and then
//it can be saved to favorite page
router.post('/add', (req, res) => {
    const { username, loggedIn, userId } = req.session

    const theRecipe = req.body
    theRecipe.owner = userId
    // default value for a checked checkbox is 'on'
    // this line of code converts that two times
    // which results in a boolean value
    theRecipe.favorite = !!theRecipe.favorite

    Recipe.create(theRecipe)
    .then(newRecipe => {
    res.send(newRecipe)
    res.redirect(`/recipes/favorite`)
    })
    .catch(err => {
    console.log('error')
    res.redirect(`/error?error=${err}`)
    })
})

//Export Router
module.exports = router