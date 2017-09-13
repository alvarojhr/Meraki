/**
 * Momento.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    nombre: {
      type: 'string'
    },
    horario: {
      model: 'horario'
    },
    ponente: {
      type: 'string'
    },
    inicio: {
      type: 'date'
    },
    fin: {
      type: 'date'
    },
    preguntas: {
      type: 'boolean'
    },
    puntaje: {
      type: 'boolean'
    },
    score: {
      type: 'integer'
    },
    cant_votos: {
      type: 'integer'
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
