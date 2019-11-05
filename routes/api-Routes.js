var db = require('../models');
var path = require('path');

module.exports = function (app) {

    app.get("/requestorcardform", function (req,res) {
        res.sendFile(path.join(__dirname + "/../public/assets/requestorcardform.html"));
    })

    app.get("/", function (req, res) {

        db.RequestorCard.findAll({}).then(function (data) {
            var requestorCardObject = {
                requestorCards: data
            };
            res.render("index2", requestorCardObject)
        });

    });

    app.post("/api/new/requestorcard", function (req, res) {

        db.RequestorCard.create(req.body).then(function (dbRequestorCard) {
            res.json(dbRequestorCard);
        });

    });

    app.post("/api/new/donation", function (req, res) {

        db.Donation.create(req.body).then(function (dbDonation) {
            res.json(dbDonation);
        });

    });

}