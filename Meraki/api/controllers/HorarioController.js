/**
 * HorarioController
 *
 * @description :: Server-side logic for managing horarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	listarEventos: function(req, res)
   {
    Horario.find().exec(function(err, eventos)
      {
        if(err){
          console.log(err);
        }
        return res.view('admin/index', {
	        eventos: eventos
	      });
      });
   },
   detalleEvento: function(req, res)
    {
      Horario.findOne({id: req.param("id")}).populate('momentos').exec(function (err, evento){
        if (err) {
          return res.serverError(err);
        }
        if (!evento) {
          return res.notFound('Nop, no hay nada amigos');
        }
				sails.log(evento);
					return res.view('admin/detalleEvento', {
						evento: evento
					});
        });
      },
		  create: function(req, res) {
		      Horario.create(req.params.all(), function eventoCreated(err, evento) {
						if (err) {
							res.serverError(err);
		          return res.redirect('/gestionador');
		        }
		        res.redirect('/gestionador/evento/' + evento.id);
		      });
		    },
			editarEvento: function(req, res)
	     {
	       Horario.update({id: req.param("id")},req.params.all()).exec(function (err, evento){
					 if (err) {
						 res.serverError(err);
						 return res.redirect('/gestionador');
					 }
					 res.redirect('/gestionador/evento/' + evento.id);
	         });
	       }
};