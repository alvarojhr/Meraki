/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
    name: {
      type: 'string'
    },
    encryptedPassword: {
      type: 'string',
    },
    staff: {
      type : "boolean",
     defaultsTo : false
    },
    email: {
      type: 'email',
      required: true,
      unique: true
    },
    horarios: {
      collection: 'horario',
      via: 'user'
    },
    // Este método es para evitar pasar toda la información del modelo
   // Evitamos pasar los siguientes parámetros: password, confirmation, encryptedpassword y _csrf.
   toJSON: function() {
     var obj = this.toObject();
     delete obj.password;
     delete obj.confirmation;
     delete obj.encryptedPassword;
     delete obj._csrf;
     return obj;
   }
  }
};
