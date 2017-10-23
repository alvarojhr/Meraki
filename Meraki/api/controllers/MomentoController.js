/**
 * MomentoController
 *
 * @description :: Server-side logic for managing momentoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	create: function(req, res) {
			Momento.create(req.params.all(), function eventoCreated(err, momento) {
				if (err) {
					res.serverError(err);
					return res.redirect('/gestionador');
				}
				console.log(momento);
				res.redirect('/gestionador/evento/' + momento.horario);
			});
		},
	editarMomento: function(req, res)
	 {
		 Momento.update({id: req.param("id")},req.params.all()).exec(function (err, evento){
			 if (err) {
				 res.serverError(err);
				 return res.redirect('/gestionador');
			 }
			 });
		 }
};
