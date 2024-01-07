//Import Dependencies
const express = require('express')
const axios = require('axios')
const apiUrlFront = process.env.SEARCH_BY_INGREDIENTS_API_URL_BASE
const apikey = process.env.API_KEY
const apiUrlRecipe = process.env.RECIPE_API_URL

//Create Router
const router = express.Router()

//Routes + Controllers
// GET -> /Search/allRecipes
router.get('/all', (req, res) => {
    const { username, loggedIn, userId } = req.session
    // we have to make our api call
    axios(`${apiUrlRecipe}?apiKey=${apikey}`)
        // if we get data, render an index page
        .then(apiRes => {
            console.log('this came back from the api: \n', apiRes.data[0])
            // apiRes.data is an array of counvtry objects
            //res.send(apiRes.data)
            res.render('recipes/search', {recipes: apiRes.data.recipes, username, userId, loggedIn})
        })
        // if something goes wrong, display an error page
        .catch(err => {
            console.log('error')
            res.redirect(`/error?error=${err}`)
        })
})

// POST -> /places/add
// gets data from the all countries show pages and adds to the users list
//router.post('/add', (req, res) => {
//    const { username, loggedIn, userId } = req.session

//    const thePlace = req.body
//    thePlace.owner = userId
    // default value for a checked checkbox is 'on'
    // this line of code converts that two times
    // which results in a boolean value
  //  thePlace.visited = !!thePlace.visited
  //  thePlace.wishlist = !!thePlace.wishlist
  //  thePlace.favorite = !!thePlace.favorite

 //   Place.create(thePlace)
 //       .then(newPlace => {
            // res.send(newPlace)
 //           res.redirect(`/places/mine`)
 //       })
 //       .catch(err => {
 //           console.log('error')
 //           res.redirect(`/error?error=${err}`)
 //       })
//})

//Export Router
module.exports = router