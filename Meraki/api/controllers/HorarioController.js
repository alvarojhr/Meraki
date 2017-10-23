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
        return res.view('admin/index', {eventos: eventos});
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
				var date1 = new Date(evento.diaInicio);
				var date2 = new Date(evento.diaFin);
				var timeDiff = Math.abs(date2.getTime() - date1.getTime());
				var cantDias = Math.ceil((timeDiff / (1000 * 3600 * 24))+1);
				var dirMomentos = {};
				var momentos2 = [];
				_.each(evento.momentos, function(momento) {
					momentos2.push(momento);
				});
				for (var i = 0; i < cantDias; i++) {
					var aux = []
					if(momentos2.length > 0){
						for(var j = 0; j <momentos2.length;j++) {
							momento = momentos2[j];
							var date2 = new Date(momentos2[j]["diaInicio"]);
							var diff = Math.ceil((Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)));
							if(diff == i){
								aux.push(momento);
								 //momentos2.splice(momentos2.indexOf(momento), 1);
							}
			      };
						if (aux.length == 0){
							aux = [0];
						}
					}
					else{
						aux = [0];
					};
						dirMomentos[i] = aux;
				};

					return res.view('admin/detalleEvento', {
						evento: evento,
						cantDias: cantDias,
						dirMomentos: dirMomentos
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
					 sails.log(evento.id);
					 sails.log(evento.nombre);
					 res.redirect('/gestionador/evento/' + evento.id);
	         });
	       }
};
