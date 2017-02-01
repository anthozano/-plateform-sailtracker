var User = require('../models/User');
var passwordHash = require('password-hash');

var UserController = {
  signin: function(req, res) {
    if (req.session.warning) {
      req.session.warning = undefined;
      res.render('users/signin', {warning: "You're not allowed to access this page, you've been redirected here."});
    } else {
      res.render('users/signin');
    }
  },
  login: function(req, res) {
    if (req.session.attempt) {
      req.session.attempt = req.session.attempt + 1;
    } else {
      req.session.attempt = 1;
    }
    if (req.session.attempt < 4) {
      console.log({
        username: req.body.username,
        password: passwordHash.generate(req.body.username)
      });
      User.findOne({
        username: req.body.username
      }, function (err, user) {
        if (err) return console.error(err);
        if (user) {
          console.log(user);
          if (passwordHash.verify(req.body.password, user.password)) {
            req.session.attempt = 0;
            req.session.user = user;
            res.redirect('/home');
          }
        } else {
          console.log("Wrong username/password");
          console.log(user);
          res.render('users/signin', {warning: "Wrong username/password"});
        }
      });
    } else {
      res.render('users/signin', {error: "Sorry, it's at least your 3rd attempt to login and fail, you are now blocked !"});
    }
  },
  home: function (req, res) {
    console.log(req.session.user);
    if (req.session.user) {
      res.render('users/home', {username : req.session.user.username});
    } else {
      req.session.warning = true;
      res.redirect('/signin');
    }
  },
  signup: function (req, res) {
    res.render('users/signup');
  },
  logout: function(req, res) {
    if (req.session.user)
      req.session.user = undefined;
    res.redirect("/");
  },
  create: function (req, res) {
    var user = new User(req.body);
    User.findOne({username: user.username},function (err, dbUser) {
      console.log(dbUser);
      if (err) {
        console.log(err);
      } else{
        if (dbUser == null) {
          user.password = passwordHash.generate(req.body.password);
          user.save();
          req.session.user = user;
          res.redirect('/home');
        } else {
          res.render('users/signup', {error: "User already exists"});
        }
      }
    });
  },
  index: function(req, res) {
    User.find(function(err, users) {
      res.render('users/index', {users: users});
    });
  },
  read: function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
      res.render('users/show', {user: user});
    });
  },
  edit: function (req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
      res.render('users/edit', {user: user});
    });
  },
  update: function(req, res) {
    User.findOneAndUpdate({_id: req.params._id}, function(err, user) {
      res.redirect('/users');
    });
  },
  delete: function(req, res) {
    User.findOneAndRemove({_id: req.params._id}, function(err, user) {
      res.redirect('/users');
    });
  }
};

module.exports = UserController;
