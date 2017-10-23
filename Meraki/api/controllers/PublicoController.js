/**
 * PublicoController
 *
 * @description :: Server-side logic for managing publicoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	home: function(req, res)
	 {
		Horario.find().exec(function(err, eventos)
			{
				if(err){
					console.log(err);
				}
				 //{eventos:eventos[1].nombre};
				var dirid = []
				sails.log(eventos);
				for (var i = 0; i < eventos.length; i++) {
					dirid.push([eventos[i].nombre,eventos[i].id]);

				};
				sails.log(dirid);

				return res.view('homepage', {eventos: eventos,dirid:dirid});
			});
	 },
	 eventos: function(req, res)
 	 {
 		Horario.find().exec(function(err, eventos)
 			{
 				if(err){
 					console.log(err);
 				}
				events = {}
				var i = 0;
				_.each(eventos, function(evento) {
					even = {}
					even["nombre"] = evento.nombre;
					even["id"] = evento.id;
					var inicio = new Date(evento.diaInicio);
					var fin = new Date(evento.diaFin);
					even["fechaInicio"] = inicio.getFullYear()+"-"+(inicio.getMonth()+1)+"-"+inicio.getDate()+"T"+evento.horaInicio;
					even["fechaFin"] = fin.getFullYear()+"-"+(fin.getMonth()+1)+"-"+fin.getDate()+"T"+evento.horaFin;
					events[i] = even;
					i++;
				});
				console.log(events);
 				return res.view('user/eventos', {events: events});
 			});
 	 },
	 momentos: function(req, res)
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
							console.log("Imprimir momentos2 en "+ j);
							console.log(momentos2);
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

					return res.view('user/momentos', {
						evento: evento,
						cantDias: cantDias,
						dirMomentos: dirMomentos
					});
        });
      },

};
