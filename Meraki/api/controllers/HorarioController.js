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
	 home: function(req, res)
    {
     Horario.find().exec(function(err, eventos)
       {
         if(err){
           console.log(err);
         }
         return res.view('homepage', {
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
				var date1 = new Date(evento.getInicio());
				var date2 = new Date(evento.getFin());
				var timeDiff = Math.abs(date2.getTime() - date1.getTime());
				var cantDias = Math.ceil((timeDiff / (1000 * 3600 * 24))+1);

				_.each(evento.momentos, function(momento) {
					sails.log(momento);
	      });
					return res.view('admin/detalleEvento', {
						evento: evento,
						cantDias: cantDias
					});
        });
      },
		  create: function(req, res) {
		      Horario.create(req.params.all(), function eventoCreated(err, evento) {
						if (err) {
							res.serverError(err);
		          return res.redirect('/gestionador');
		        }
		        res.redirect('/gestionador/evento/' + this.id);
		      });
		    },
			editarEvento: function(req, res)
	     {
	       Horario.update({id: req.param("id")},req.params.all()).exec(function (err, evento){
					 if (err) {
						 res.serverError(err);
						 return res.redirect('/gestionador');
					 }
					 sails.log(evento.id);
					 sails.log(evento.nombre);
					 res.redirect('/gestionador/evento/' + this.id);
	         });
	       }
};
