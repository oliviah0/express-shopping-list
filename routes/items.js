const express = require("express")
const router = new express.Router()
// const items = require("../fakedb")
const ExpressError = require("../expressError")
const {readFile, writeToFile} = require('./fn')

router.use(express.json())
let items = readFile()

router.get("/", function (req, res) { 
    res.json({items})
})

router.post("/", function (req, res) {
    const newItem = { name: req.body.name, price: req.body.price }
    items.push(newItem);
    writeToFile(JSON.stringify(items))
    res.status(201).json({ item: newItem })
})

router.get("/:name", function (req, res) { 
    const foundItem = items.find(item => item.name === req.params.name)
    if (!foundItem) {
        throw new ExpressError("Item not found", 404)
    }
    res.json({ item: foundItem })
})

router.patch("/:name", function (req, res) { 
    const foundItem = items.find(item => item.name === req.params.name)
    if (!foundItem) {
        throw new ExpressError("Item not found", 404)
    }
    foundItem.name = req.body.name
    foundItem.price = req.body.price
    writeToFile(JSON.stringify(items))
    res.json({ item: foundItem })
})

router.delete("/:name", function (req, res) {
    const foundItemIndex = items.findIndex(item => item.name === req.params.name)
    if (foundItemIndex === -1) {
        throw new ExpressError("Item not found", 404)
    }
    items.splice(foundItemIndex, 1)
    writeToFile(JSON.stringify(items))
    res.json({ message: "Deleted" })
})

module.exports = router