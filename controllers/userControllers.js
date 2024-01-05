//Import Dependencies
const express = require('express')
const User = require('../models/user')
const bcrypt = require('bcryptjs')

//Create Router
const router = express.Router()

//Routes + Controllers
// GET -> SignUp - /users/signup
router.get('/signup', (req, res) => {
    const { username, loggedIn, userId } = req.session
    res.render('users/signup', { username, loggedIn, userId })
})
// POST -> SignUp - /users/signup
router.post('/signup', async (req, res) => {
    // const { username, loggedIn, userId } = req.session
    const newUser = req.body
    // we need to encrypt the password, which is what we will save to the db
    // bcrypt is an encryption service
    // genSalt creates 'salt rounds' -> puts it through 10 rounds of encrypting
    newUser.password = await bcrypt.hash(
        newUser.password, 
        await bcrypt.genSalt(10)
    )
    // we can now create our user
    User.create(newUser)
        .then(user => {
            // the new user will be created and redirected to the login page
            res.redirect('/users/login')
        })
        .catch(err => {
            console.log('error')
            // uses error page
            res.redirect(`/error?error=${err}`)
        })
})

// GET -> Login -> /users/login
router.get('/login', (req, res) => {
    const { username, loggedIn, userId } = req.session
    res.render('users/login', { username, loggedIn, userId })
})

// POST -> Login
router.post('/login', async (req, res) => {
    // const { username, loggedIn, userId } = req.session
    // pulls credentials from the req.body
    const { username, password } = req.body
    // search the db for the user
    // since usernames are unique
    User.findOne({ username })
        .then(async (user) => {
            // if the user exists
            if (user) {
                // we compares the password they put in with the one we have stored
                // will send either a truthy or a falsey value
                const result = await bcrypt.compare(password, user.password)
                if (result) {
                    // if the pws match -> log them in and create the session
                    req.session.username = username
                    req.session.loggedIn = true
                    req.session.userId = user.id
                    // once we're logged in, redirect to the home page
                    res.redirect('/')
                } else {
                    res.redirect(`/error?error=something%20wrong%20with%20credentials`)
                }
            } else {
                res.redirect(`/error`)
            }
        })
        .catch(err => {
            console.log('error')
            res.redirect(`/error?error=${err}`)
        })
})

// GET -> Logout - /users/logout
router.get('/logout', (req, res) => {
    const { username, loggedIn, userId } = req.session
    res.render('users/logout', { username, loggedIn, userId })
})
// DELETE -> Logout
router.delete('/logout', (req, res) => {
    req.session.destroy(() => {
        res.redirect('/')
    })
})

//Export Router
module.exports = router