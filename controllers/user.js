var User = require('../models/user');
module.exports.controller = function (app) {

    router.get('/home', function (req, res) {
        console.log(req.session.user);
        if (req.session.user) {
            res.render('users/index', {username : req.session.user.username});
        } else {
            req.session.warning = true;
            res.redirect('/login');
        }
    });

    router.get('/login', function (req, res) {
        if (req.session.warning) {
            req.session.warning = undefined;
            res.render('users/login', {warning: "You're not allowed to access this page, you've been redirected here."});
        } else {
            res.render('users/login');
        }
    });

    router.post('/login', function (req, res) {
        if (req.session.attempt) {
            req.session.attempt = req.session.attempt + 1;
        } else {
            req.session.attempt = 1;
        }
        if (req.session.attempt < 4) {
            User.findOne(req.body, function (err, user) {
                if (err) return console.error(err);
                if (user) {
                    console.log(user);
                    req.session.attempt = 0;
                    req.session.user = user;
                    res.redirect('/home');
                } else {
                    console.log("Wrong username/password");
                    res.render('users/login', {warning: "Wrong username/password"});
                }
            });
        } else {
            res.render('users/login', {error: "Sorry, it's at least your 3rd attempt to login and fail, you are now blocked !"});
        }
    });

}