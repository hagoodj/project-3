var db = require('../models');
var path = require('path');

module.exports = function (app) {

    app.get("/requestorcardform", function (req,res) {
        res.sendFile(path.join(__dirname + "public/assets/requestorcardform.html"));
    })

    app.get("/api/requestorcards", function (req, res) {

        db.RequestorCard.findAll({}).then(function (data) {
            var reuestorCardObject = {
                requestorCards: data
            };
            res.render("index2", reuestorCardObject)
        });

    });

    app.post("/api/new/requestorcard", function (req, res) {

        db.RequestorCard.create(req.body).then(function (dbRequestorCard) {
            res.json(dbRequestorCard);
        });

    });

}