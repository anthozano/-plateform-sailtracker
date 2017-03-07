module.exports = function (req, res, next) {
  if (req.session.user) {
    next()
  } else {
    var error = {
      level: "warning",
      message: "Not allowed, please login"
    };
    req.session.message = error;
    res.redirect('/signin');
  }
};
