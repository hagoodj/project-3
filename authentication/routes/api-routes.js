var db = require("../models");
const Op = db.Profile.Op;
var bcrypt = require("bcrypt");

module.exports = function (app) {
    // Index page
    app.get("/", function (req, res) {
        res.render("index", { test: "test" })
    })

    app.put("/api/user/", function (req, res) {
        var pw = req.body.password;
        db.users.findAll({
            where: {
                email: req.body.email
            }
        }).then(function(data) {
            if (pw) {
                var hash = data[0].dataValues.password;
                bcrypt.compare(pw, hash, function(err, conf) {
                    if (err) throw err;

                    if (conf) {
                        res.json(data)
                    } else {
                        res.send(conf)
                    }
                })
            } else {
                res.json(data);
            }
        }).catch(function(err) {
            console.log(err)
        })
    })

    // auto signin process
    app.put("/api/user/auto", function (req, res) {
        db.users.findAll({
            where: {
                email: req.body.email,
                password: req.body.password
            }
        }).then(function(data) {
            res.json(data)
        }).catch(function(err) {
            console.log(err)
        })
    })

    app.post("/api/user/", function (req, res) {
        var pw = req.body.password
        bcrypt.hash(pw, 10, function(err, hash) {
            db.users.create({
                email: req.body.email,
                password: hash,
                accountType: req.body.accountType
            }).then(function (data) {
                db.Profile.create({
                    userId: data.dataValues.id,
                    accountType: req.body.accountType
                })
                res.json(data);
            }).catch(function (err) {
                res.json(err)
            })
        })
    })

    async function newFunction(promise) {
        return await promise;
    }