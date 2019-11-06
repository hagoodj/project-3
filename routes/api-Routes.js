var db = require('../models');
var path = require('path');

module.exports = function (app) {

    app.get("/requestorcardform", function (req,res) {
        res.sendFile(path.join(__dirname + "/../public/assets/requestorcardform.html"));
    })

    app.get("/:id", function (req, res) {

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

    // *****************************************************************************

    app.get("/donatorcards/:userid", function (req, res) {

        db.DonatorCard.findAll({
            where: {
                UserId: req.params.userid
            }
        }).then(function (dbDonatorCard) {
            res.json(dbDonatorCard);
        });

    });

    app.get("/requests/:cardid", function (req, res) {

        db.Request.findAll({
            where: {
                DonatorCardId: req.params.cardid
            }
        }).then(function (data) {
            var requestsObject = {
                requests: data
            };
            res.render("requests", requestsObject)
        });

    });

    // *****************************************************************************

    app.get("/requestorcards/:userid", function (req, res) {

        db.RequestorCard.findAll({
            where: {
                UserId: req.params.userid
            }
        }).then(function (dbRequestorCard) {
            res.json(dbRequestorCard);
        });

    });

    app.get("/donations/:cardid", function (req, res) {

        db.Donation.findAll({
            where: {
                RequestorCardId: req.params.cardid
            }
        }).then(function (data) {
            var donationsObject = {
                donations: data
            };
            res.render("donations", donationsObject)
        });

    });

    // ******************************************************************************

    // app.get("/allcards/:userid", function (req, res) {

    //     db.RequestorCard.findAll({
    //         where: {
    //             UserId: req.params.userid
    //         }
    //     }).then(function (data) {
    //         var requestorCardObject = {
    //             requestorCard: data
    //         };
    //         res.render("usercards", requestorCardObject, donatorCardObject)
    //     });

    // });

}