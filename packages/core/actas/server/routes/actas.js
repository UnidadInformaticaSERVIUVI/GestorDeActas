'use strict';

// Acta authorization helpers
var hasAuthorization = function(req, res, next) {
  if (!req.user.isAdmin && !req.acta.user._id.equals(req.user._id)) {
    return res.status(401).send('User is not authorized');
  }
  next();
};

var hasPermissions = function(req, res, next) {

    req.body.permissions = req.body.permissions || ['authenticated'];

    for (var i = 0; i < req.body.permissions.length; i++) {
      var permission = req.body.permissions[i];
      if (req.acl.user.allowed.indexOf(permission) === -1) {
            return res.status(401).send('User not allowed to assign ' + permission + ' permission.');
        }
    }

    next();
};

module.exports = function(Actas, app, auth) {
  
  var actas = require('../controllers/actas')(Actas);

  app.route('/api/actas')
    .get(actas.all)
    .post(auth.requiresLogin, hasPermissions, actas.create);    
  app.route('/api/actas/:actaId')
    .get(auth.isMongoId, actas.show)
    .put(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, actas.update)
    .delete(auth.isMongoId, auth.requiresLogin, hasAuthorization, hasPermissions, actas.destroy);

  // Finish with setting up the actaId param
  app.param('actaId', actas.acta);
};
