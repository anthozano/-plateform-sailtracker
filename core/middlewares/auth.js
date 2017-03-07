
module.exports = function(req, res, next) {
  if (!req.session.user) {
    // req.session.warning = true;
    // res.redirect('/signin');
  } else {
    res.locals.loggedUser = req.session.user;
  }
  next();
};