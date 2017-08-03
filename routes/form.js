var passport = require('passport');
var form = require('../controller/formRoutes.js')
var express = require('express');
var router = express();

router.route('/user/register/').post(form.register)

router.route('/user/login/').post(form.login)

router.route('/user/get').get(passport.authenticate('bearer', { session: false }), form.get)

router.route('/user/delete').all(passport.authenticate('bearer', { session: false }), form.delete)

router.route('/user/list').get(passport.authenticate('bearer', { session: false }), form.list)

router.route('/user/address').post(passport.authenticate('bearer', { session: false }), form.address)

module.exports = router;