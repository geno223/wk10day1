///////////////////////////////////
// IMPORT OUR DEPS
///////////////////////////////////
require("dotenv").config() // load .env variables
const express = require("express") // our web framework
const morgan = require("morgan") // our logger
const methodOverride = require("method-override") // override forms
const mongoose = require("mongoose") // connect to our mongodb

//Database connection 

const DATABASE_URL = process.env.DATABASE_URL

//establish our connection
mongoose.connect(DATABASE_URL)

// Events for when the connection changes
mongoose.connection
.on("open", () => {console.log("connected to Mongo")})
.on("close", () => {console.log("Disconnected from Mongo")})
.on("error", (error) => {console.log(error)})

/////////////////////////////////////////
// Create Our Fruits Model
/////////////////////////////////////////
// destructure Schema and model into their own variables
const {Schema, model} = mongoose
// const Schema = mongoose.Schema
// const model = mongoose.model

// Schema - Shape of the Data
const fruitSchema = new Schema({
    name: String,
    color: String,
    readyToEat: Boolean
})

// Model - object for interacting with the db
const Fruit = model("Fruit", fruitSchema)

//Creat our express object

const app = express()

/////////////////////////////
// Register our Middleware
////////////////////////////////////////////////////
app.use(morgan("dev")) //logger
app.use(methodOverride("_method")) // override form submissions
app.use(express.urlencoded({extended: true})) // parse urlencoded bodies
app.use(express.static("public")) // serve files from public folder


//////////////////////////////
// Routes
/////////////////////////////////////////////////////
app.get("/", (req, res) => {
    res.send("your server is running... better catch it")
})

///////////////////////////////////////////////////////
// Server Listener
////////////////////////////////////////////////////////
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})