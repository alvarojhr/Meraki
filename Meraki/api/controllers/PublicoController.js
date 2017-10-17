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
};
