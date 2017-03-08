module.exports = function (req, res, next) {
  if (req.session.user) {
    res.locals.loggedUser = req.session.user;
    if (req.session.user.role.name == "Admin") {
      next();
    } else {
      var error = {
        level: "warning",
        message: "Not allowed, admin only"
      };
      req.session.message = error;
      res.redirect('/');
    }
  } else {
    var error = {
      level: "warning",
      message: "Not allowed, please login"
    };
    req.session.message = error;
    res.redirect('/signin');
  }
};
