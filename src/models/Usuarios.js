const { Schema, model} = require('mongoose');

const usuarioSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true
  },
  nombre: {
    type: String,
    required: 'Agrega tu Nombre', 
  },
  password: {
    type: String,
    required: true
  }
});

module.exports = model('Usuario', usuarioSchema);