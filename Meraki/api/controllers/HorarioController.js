/**
 * HorarioController
 *
 * @description :: Server-side logic for managing horarios
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	listarEventos: function(req, res)
   {
    Horario.find().exec(function(err, b)
      {
        if(err){
          console.log(err);
        }
        sails.log('Found "%s"', b);
        return res.json(b);
      });
   },
   listarMomentos: function(req, res)
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
      }
};
