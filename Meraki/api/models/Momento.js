/**
 * Momento.js
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
    horario: {
      model: 'horario',
      required: true
    },
    ponente: {
      type: 'string',
      required: true
    },
    activo:{
      type: 'boolean'
    },
    horaActiva: {
      type: 'string'
    },
    presentacion: {
      type: 'string'
    },
    diaInicio: {
      type: 'string'
    },
    horaInicio: {
      type: 'string'
    },
    horaFin: {
      type: 'string'
    },
    preguntar: {
      type: 'boolean'
    },
    puntaje: {
      type: 'boolean'
    },
    score: {
      type: 'integer',
      defaultsTo: '5'
    },
    cant_votos: {
      type: 'integer',
      defaultsTo: '0'
    },
    preguntas: {
      collection: 'pregunta',
      via: 'momento'
    },
    // Add a reference to User
    palabras: {
      collection: 'palabraClave',
      via: 'momentos',
      dominant: true
    }
  }
};
