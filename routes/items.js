const express = require("express")
const router = new express.Router()
const items = require("../fakedb")
const ExpressError = require("../expressError")

router.use(express.json())
// let itemsArr = items

router.get("/", function (req, res) { 
    res.json({items})
})

router.post("/", function (req, res) {
    const newItem = { name: req.body.name, price: req.body.price }
    items.push(newItem)
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
    res.json({ item: foundItem })
})

router.delete("/:name", function (req, res) {
    const foundItemIndex = items.findIndex(item => item.name === req.params.name)
    if (foundItemIndex === -1) {
        throw new ExpressError("Item not found", 404)
    }
    
    let foundItem = items[foundItemIndex]

    items.splice(foundItemIndex, 1)
    res.json({ deleted: foundItem })

})

module.exports = router