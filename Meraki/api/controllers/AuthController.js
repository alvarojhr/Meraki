/**
 * AuthController
 *
 * @description :: Server-side logic for managing auths
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
 var passport = require('passport');

 module.exports = {

     _config: {
         actions: false,
         shortcuts: false,
         rest: false
     },

     login: function(req, res) {
         passport.authenticate('local', function(err, user, info) {
             if ((err) || (!user)) {
							 console.log("Ha ocurrido un error");
                 return res.send({
                     message: info.message,
                     user: user
                 });
             }
             req.logIn(user, function(err) {
							 console.log("Ha entrado en el método logIn");
                 if (err) res.send(err);
                 return res.redirect('/gestionador');
             });

         })(req, res);
     },

     logout: function(req, res) {
         req.logout();
         res.redirect('/');
     }
 };
