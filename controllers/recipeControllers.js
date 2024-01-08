//Import Dependencies
const express = require('express')
const axios = require('axios')

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

// gets a recipe card from the recipe page and then
//it can be saved to favorite page
//router.post('/favorite', (req, res) => {
//    const { username, loggedIn, userId } = req.session
//    if (user) {
//        res.redirect('/recipes/favorite')
//    }
//    .catch(err => {
//        console.log('error')
//        res.redirect(`/error?error=${err}`)
//    })

//Export Router
module.exports = router