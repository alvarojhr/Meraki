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
					var inicio = new Date(evento.diaInicio);
					even["fechaInicio"] = inicio.getFullYear()+"-"+(inicio.getMonth()+1)+"-"+inicio.getDate()+"T"+evento.horaInicio;
					var fin = new Date(evento.diaFin);
					even["fechaFin"] = fin.getFullYear()+"-"+(fin.getMonth()+1)+"-"+fin.getDate()+"T"+evento.horaFin;
					events[i] = even;
					i++;
				});
				console.log(events);
 				return res.view('user/eventos', {events: events});
 			});
 	 },

};
