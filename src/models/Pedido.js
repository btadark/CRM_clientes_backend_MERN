const { Schema, model } = require('mongoose');

const pedidoSchema = new Schema({
  cliente: {
    type: Schema.ObjectId,
    ref: 'Cliente'
  },
  pedido: [{
    producto: {
      type: Schema.ObjectId,
      ref: 'Producto'
    },
    cantidad: Number
  }],
  total: {
    type: Number
  }
});

module.exports = model('Pedido', pedidoSchema);