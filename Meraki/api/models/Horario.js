/**
 * Horario.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre: {
      type: 'string',
      required: true
    },
    diaInicio: {
      type: 'string'
    },
    diaFin: {
      type: 'string'
    },
    horaInicio: {
      type: 'string'
    },
    horaFin: {
      type: 'string'
    },
    momentoActivo: {
      type: 'integer'
    },
    momentos: {
      collection: 'momento',
      via: 'horario'
    },
    user: {
      model: 'user'
    }

    // Attribute methods
    //getInicio: function (){
    //  return this.inicio.toString().substring(0, 15);
    //}
  }
};
