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
	 home: function(req, res)
    {
     Horario.find().exec(function(err, eventos)
       {
         if(err){
           console.log(err);
         }
				  //{eventos:eventos[1].nombre};
					var dirid = {}
				 sails.log(eventos);
				 for (var i = 0; i < eventos.length; i++) {
					 var id = eventos[i].id;
					 var nombre = eventos[i].nombre;
					 dirid[nombre] = id;
				 };
				 sails.log(dirid);
         return res.view('homepage', {eventos: eventos,dirid:dirid});
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
						_.each(momentos2, function(momento) {

							var date2 = new Date(momento.diaInicio);
							var diff = Math.ceil((Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24)));

							sails.log(diff);
							sails.log(i);
							if(diff == i){
								aux.push(momento);
								 momentos2.splice(momentos2.indexOf(momento), 1);
							}

			      });
					};
						dirMomentos[i] = aux;
						sails.log(dirMomentos);
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
