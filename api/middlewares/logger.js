
module.exports = function(req, res, next) {
  if (req.session.logger) {
    res.logger = req.session.logger;
    req.session.logger = undefined;
  }
  req.logger = function(type, content) {
    if (req.session.logger === undefined) {
      req.session.logger = {};
    }
    req.session.logger[type] = content;
  }
  next();
};