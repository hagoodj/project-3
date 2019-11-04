var db = require("../models");
var path = require("path");

module.exports = function(app) {

    app.get("/", function(req, res){
        res.sendFile(path.join(__dirname + "/../public/assets/form.html"));
    })

    // To retrive all donator cards from database
    
    // Server side javascript to create a new donator card
    app.post("/api/new/donatorcard", function(req, res){

        db.DonatorCard.create({
            startdate: req.body.startDate,
            enddate: req.body.endDate,
            category: req.body.category,
            item: req.body.item,
            itemnumber: req.body.noOfItems,
            location: req.body.location,
            image: req.body.image
        }).then(function(result){
            res.json(result);
        }).catch(function(err){
            console.log(err);
        })
    })
}