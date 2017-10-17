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
				res.redirect('/gestionador/evento/' + momento.evento.id);
			});
		},
};
