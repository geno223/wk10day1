// Import Dependencies

const express = require("express")
const Fruit = require("../models/fruit.js")

// Create the Router

const router = express.Router()


// Routes

//seed route to get test data
router.get("/seed", async (req, res) => {

    try {
    // array of starter fruits
    const startFruits = [
        { name: "Orange", color: "orange", readyToEat: false },
        { name: "Grape", color: "purple", readyToEat: false },
        { name: "Banana", color: "orange", readyToEat: false },
        { name: "Strawberry", color: "red", readyToEat: false },
        { name: "Coconut", color: "brown", readyToEat: false },
        ]
    // Delete All Fruits
    await Fruit.deleteMany({})

    // Seed my starter fruits
    const fruits = await Fruit.create(startFruits)

    // send a response (res) to end the route
    res.json(fruits)
    
    } catch (error) {
        res.send("There was an Error")
        console.log(error.message)
    }
})

//Index Route
router.get("/", async (req, res) => {
    
    try{

        const fruits = await Fruit.find({})
        // render to a template
        res.render("fruits/index.ejs", {fruits})


    } catch (err) {
        console.log("-----", err.message)
        res.status(400).send("error, read logs")
    }
})



//New Route
router.get("/new", (req, res) => {
    
    try{

        res.render("fruits/new.ejs")


    } catch (err) {
        console.log("-----", err.message)
        res.status(400).send("error, read logs")
    }
})









//Create Route

router.post("/", async (req, res) => {
    
    try{

        // checkbox gives you on or nothing (correct that data)
        // check if readytoEat should be true
        req.body.readyToEat = req.body.readyToEat === "on" ? true : false

        // find the url encoded new fruit with .body
        const newFruit = req.body

        //push the new fruit into the db (we can just use .create with the model because of mongoose)

        await Fruit.create(newFruit)

        res.redirect("/fruits")


    } catch (err) {
        console.log("-----", err.message)
        res.status(400).send("error, read logs")
    }
})



//Edit Route

router.get("/:id/edit", async (req, res) => {
    
    try{
        // get the id
        const id = req.params.id

        // find the fruit in the db
        const indyFruit = await Fruit.findById(id)

        res.render("fruits/edit.ejs", {indyFruit})


    } catch (err) {
        console.log("-----", err.message)
        res.status(400).send("error, read logs")
    }
})



//Update Route
router.put("/:id", async (req, res) => {
    
    try{

        // get the id

        const id = req.params.id
        // checkbox gives you on or nothing (correct that data)
        // check if readytoEat should be true
        req.body.readyToEat = req.body.readyToEat === "on" ? true : false

        // find the url encoded updated fruit with .body
        const updatedFruit = req.body

        //find the new id and then update the fruit into the db (we can just use .findbyIdandupdate with the model because of mongoose)

        await Fruit.findByIdAndUpdate(id, updatedFruit)

        res.redirect(`/fruits/${id}`)


    } catch (err) {
        console.log("-----", err.message)
        res.status(400).send("error, read logs")
    }
})





//Delete Route

router.delete("/:id", async (req, res) => {

    //get the id
    const id = req.params.id

    //delete the fruit
    await Fruit.findByIdAndDelete(id)

    //redirect to main
    res.redirect('/fruits')

})




//Show Route

router.get("/:id", async (req, res) => {
    
    try{

        // get the id and store in a variable
        const id = req.params.id
        
        // find the particular fruit from the db

        const indyFruit = await Fruit.findById(id)

        //render the page for showing fruit

        res.render("fruits/show.ejs", {indyFruit})

    } catch (err) {
        console.log("-----", err.message)
        res.status(400).send("error, read logs")
    }
})



// Export the Router

module.exports = router