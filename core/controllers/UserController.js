var User = require('../models/User');
var Role = require('../models/Role');
var passwordHash = require('password-hash');
var sha1 = require('sha1');
  
var UserController = {

  /**
   * Render the user signin page
   * @param req
   * @param res
   */
  signin: function (req, res) {
    if (req.session.message) {
      res.locals.message = req.session.message;
      req.session.message = undefined;
    }
    if (req.session.warning) {
      req.session.warning = undefined;
      res.render('users/signin', {warning: "You're not allowed to access this page, you've been redirected here."});
    } else {
      res.render('users/signin');
    }
  },

  /**
   * Holds user login
   * @param req
   * @param res
   */
  login: function (req, res) {
    User.findOne({
      username: req.body.username
    }, function (err, user) {
      if (err) return console.error(err);
      if (user) {
        if (passwordHash.verify(req.body.password, user.password)) {
          req.session.user = user;
          res.redirect('/home');
        } else {
          res.redirect('/signin');
        }
      }
    });
  },

  /**
   * Render the user home page
   * @param req
   * @param res
   */
  home: function (req, res) {
    res.render('users/home');
  },

  /**
   * Render the user signup page
   * @param req
   * @param res
   */
  signup: function (req, res) {
    res.render('users/signup');
  },

  /**
   * Logs out the user
   * @param req
   * @param res
   */
  logout: function (req, res) {
    if (req.session.user)
      req.session.user = undefined;
    res.redirect("/");
  },

  /**
   * Create an user
   * @param req
   * @param res
   */
  create: function (req, res) {
    Role.findOne({name: 'Silver'}, function (err, role) {
      var user = new User({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        username: req.body.username,
        role: {
          _id: role._id,
          name: role.name
        },
        api_secret: sha1(req.body.username)
      });
      User.findOne({username: user.username}, function (err, dbUser) {
        console.log(dbUser);
        if (err) {
          console.log(err);
        } else {
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
    });
  },

  /**
   * Index/list the users
   * @param req
   * @param res
   */
  index: function (req, res) {
    User.find(function (err, users) {
      res.render('users/index', {users: users});
    });
  },

  /**
   * Read an user
   * @param req
   * @param res
   */
  read: function (req, res) {
    User.findOne({_id: req.params.id}, function (err, user) {
      res.render('users/show', {user: user});
    });
  },

  /**
   * Edit an user
   * @param req
   * @param res
   */
  edit: function (req, res) {
    User.findOne({_id: req.params.id}, function (err, user) {
      Role.find({}, function (err, results) {
        if (err) {
          console.log(err);
          res.send(err);
        } else {
          res.render('users/edit', {user: user, roles: results});
        }
      });
    });
  },

  /**
   * Update an user
   * @param req
   * @param res
   */
  update: function (req, res) {
    console.log(req.body);
    Role.findOne({_id: req.body.role}, function (err, role) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        console.log(role._id);
        User.findOneAndUpdate({_id: req.params.id}, {
          name: req.body.name,
          surname: req.body.surname,
          email: req.body.email,
          username: req.body.username,
          role: {
            _id: role._id,
            name: role.name
          }
        }, function (err, user) {
          if (err) {
            console.log(err);
            res.send(err);
          } else {
            console.log(user)
          }
        });
      }
    });
    res.redirect('/users');
  },

  /**
   * Delete an user
   * @param req
   * @param res
   */
  delete: function (req, res) {
    console.log(req.params)
    User.findOneAndRemove({_id: req.params.id}, function (err, user) {
      if (err) {
        console.log(err);
        res.send(err);
      } else {
        res.redirect('/users');
      }
    });
  }

};

module.exports = UserController;
