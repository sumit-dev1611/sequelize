var jwt = require('jsonwebtoken');
var validation = require('../middleware/validation');
var model = require('../seqdb/db');

module.exports = {

    register: (req, res, next) => {
        validation.validateRegistration(req.body, function(err, data) {
            if (err) {
                next(err)
            } else {
                var detail = new model.user({
                    username: data.username,
                    email: data.email,
                    password: data.password,
                    firstname: data.firstname,
                    lastname: data.lastname
                })
                detail.save().then((data) => {
                    if (data) {
                        res.json({ user_detail: data })
                    }
                }).catch((err) => {
                    next(err);
                });
            }
        })
    },

    login: (req, res, next) => {
        validation.validateLogin(req.body, function(err, data) {
            if (err) {
                next(err)
            } else {
                model.user.find({ where: { username: data.username, password: data.password } }).then((users) => {
                    if (users) {
                        var payload = { user_id: users.id };
                        var token = jwt.sign(payload, "abc", {
                            expiresIn: 3600000
                        });
                        res.json({ message: "ok", "Access token": token });
                    } else {
                        next('Not a user !!!     Get registered');
                    }
                }).catch((err) => {
                    next(err)
                });
            }
        });
    },

    get: (req, res, next) => {
        model.user.find({ where: { id: req.user.id }, include: [model.address] }).then((complete_data) => {
            if (complete_data) {
                res.json({ user_detail: complete_data })
            } else {
                next("can't fetch data");
            }
        }).catch((err) => {
            next(err);
        });
    },

    delete: (req, res, next) => {
        model.user.destroy({ where: { id: req.user.id } }).then((result) => {
            if (result) {
                res.json({ success: "success" });
            }
        }).catch((err) => {
            next(err);
        });
    },

    list: (req, res, next) => {
        model.user.findAll({ offset: ((req.query.page) * parseInt(req.query.limit)), limit: parseInt(req.query.limit) }).then((data) => {
            if (data) {
                res.json({ list: data });
            }
        }).catch((err) => {
            next(err);
        });
    },

    address: (req, res, next) => {
        validation.validateAddress(req.body, function(err, data) {
            if (err) {
                next(err)
            } else {
                var userAddress = new model.address({
                    user_id: data.user_id,
                    address: data.address,
                    phone_no: data.phone_no
                });
                userAddress.save().then((data) => {
                    if (data) {
                        res.json({ address: data })
                    }
                }).catch((err) => {
                    next(err);
                });
            }
        });
    }

}