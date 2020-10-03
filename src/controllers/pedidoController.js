const Pedido = require('../models/Pedido');
const Producto = require('../models/Producto');


// Crear nuevoPedido
exports.nuevoPedido = async(req, res, next) => {
  const pedido = new Pedido(req.body);
  
  try {
    await pedido.save();
    res.json({
      msg: 'Se agrego un nuevo pedido'
    })
  } catch (error) {
    console.log(error);
    next();  
  }
}

 // Mostrar todos los pedidos
 exports.mostrarPedidos = async (req,res,next) => {
   try {
    const pedidos = await Pedido.find({}).populate('cliente').populate({ 
       path: 'pedido.producto',
       model: 'Producto'
    });
    res.json(pedidos);
   } catch (error) {
    console.log(error);
    next();
   }
 }

 // Mostrar pedido por su id
 exports.mostrarPedido = async (req,res,next) => {
   const pedido = await Pedido.findById(req.params.idPedido).populate('cliente').populate({ 
    path: 'pedido.producto',
    model: 'Producto'
   });

   if(!pedido) {
    res.json({
      msg: 'No existe el pedido'
    })
    return next();
   }

   // Mostrar el pedido
   res.json(pedido);
 }

 // Actualizar pedido por su id
 exports.actualizarPedido = async (req,res,next) => {
   try {
     const pedido = await Pedido.findOneAndUpdate({_id: req.params.idPedido}, req.body, { new: true}).populate('cliente').populate({ 
      path: 'pedido.producto',
      model: 'Producto'
     });

     res.json(pedido);

   } catch (error) { 
     console.log(error);
     next();
   }
 }

 // Eliminar pedido por su id
 exports.eliminarPedido = async (req,res,next) => {
  try {
    await Pedido.findOneAndDelete({_id: req.params.idPedido});
    res.json({
      msg: 'Pedido Eliminado'
    });
  } catch (error) {
    console.log(error);
    next();
  }
 }
 