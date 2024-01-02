// Import Dependencies
const express = require('express') //express framework
const morgan = require('morgan') //morgan logger for request info
const session = require('express-session')
const MongoStore = require('connect-mongo') // connect-mongo(for the session)
require('dotenv').config()
const methodOverride = require('method-override') // for forms and CRUD

//Middleware Function
// this function takes an entire app as an argument and runs it through middleware
const middleware = (app) => {
    // middleware runs before all routes
    // EVERY request is first processed through middleware
    // method-override - allows us to use forms to their full potential
    app.use(methodOverride('_method'))
    // this will allow us to get data from forms as req.body
    app.use(express.urlencoded({ extended: true }))
    // morgan logs our requests to the console
    app.use(morgan('tiny')) //tiny is a qualifier that says - be short
    // to serve stylesheets, we use static files in the public directory
    app.use(express.static('public'))
    // to utilize json we can add this:
    app.use(express.json())
}
//    app.use(
//                session({
//        secret: process.env.SECRET,
//        store: MongoStore.create({
//        mongoUrl: process.env.DATABASE_URL
//        }),
//        saveUninitialized: true,
//        resave: false
//        })
//        )

//Export the Middleware Function
module.exports = middleware