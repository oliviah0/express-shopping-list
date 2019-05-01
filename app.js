const express = require("express")
const app = express();
const itemsRoutes = require("./routes/items")
const ExpressError = require("./expressError")

app.use(express.json())
app.use("/items", itemsRoutes)
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
    res.render("index");
});

/**Error handler if route doesn't exist or anything else */
app.use(function(req, res, next) {
    const err = new ExpressError("Not Found", 404)
    return next(err)
});

/**General error handler to make message pretty */
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    return res.json({
        error: err.message
    });
});

module.exports = app