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
      Horario.findOne({id: req.param("id")}).populate('momentos').exec(function (err, found){
        if (err) {
          return res.serverError(err);
        }
        if (!found) {
          return res.notFound('Nop, no hay nada amigos');
        }
        sails.log('Found "%s"', found);
          return res.json(found);
        });
      },
		  create: function(req, res) {
		      Horario.create(req.params.all(), function eventoCreated(err, user) {
						if (err) {
							res.serverError(err);
		          return res.redirect('/gestionador');
		        }
		        res.redirect('/gestionador/evento/' + user.id);
		      });
		    }
};
