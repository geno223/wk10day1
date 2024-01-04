
// Import Our Dependencies

require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override") // override for forms
const fruitController = require("./controllers/fruit.js")




// run the app
const app = express()


// middleware

app.use(morgan("dev")) // the string dev is the type of logs that morgan will send (in documentation)
app.use(methodOverride("_method")) // allow for put and delete requests
app.use(express.urlencoded({extended: true})) // parse url encoded bodys (forms that we can look reqs)
app.use(express.static("public")) // basically adding a folder of public to serve files

// add the router to be specific to the fruit controller if it starts with /fruits in URL
app.use("/fruits", fruitController)

// ROUTES



//trial route - simple get
app.get("/", (req, res) => {
    res.send("your server is running")
})

// server listener
const PORT = process.env.PORT || 3013
app.listen(PORT, () => console.log(`listening on ${PORT}`))
