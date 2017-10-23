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
			 res.redirect('/gestionador/evento/' + momento.horario);
			 });
		 },
	detalleMomento: function(req, res)
	 	 {
	 		 Momento.findOne({id: req.param("idMoment")}).exec(function (err, momento){
	 			 if (err) {
	 				 res.serverError(err);
	 				 return res.redirect('/gestionador');
	 			 }
	 			 return res.view('admin/detalleMomento', {
					 momento: momento,
					 idEvento: req.param("id")
				 	})
	 			 });
	 		 },
		activarMomento: function(req, res)
	 	 	 {
	 	 		 Horario.findOne({id: req.param("id")}).exec(function (err, evento){
		 	 			 if (err) {
		 	 				 res.serverError(err);
		 	 				 return res.redirect('/gestionador');
		 	 			 }
						 if (evento.momentoActivo != '') {
							 	Momento.update({id:evento.momentoActivo},{activo:'false'}).exec(function (err, hor){if (err) { res.serverError(err);}});
							}
						});
				 var dt = new Date();
				 var hora = dt.getHours()+ ":" + dt.getMinutes()  + ":" + dt.getSeconds();
				 Horario.update({id:req.param("id")},{momentoActivo:req.param("idMomento")}).exec(function (err, hor){if (err) { res.serverError(err);}});
				 Momento.update({id:req.param("idMomento")},{activo:'true',horaActiva:hora}).exec(function (err, momento){
					 if (err) { res.serverError(err);}
					 var url = '/gestionador/evento/' + momento[0].horario + '/momento/'+ momento[0].id;
					 console.log(url);
					 res.redirect(url);
				 });
 	 		 }
};
