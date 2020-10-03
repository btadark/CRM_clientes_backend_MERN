const Cliente = require('../models/Cliente');

// Agrega nuevo cliente
exports.nuevoCliente = async (req, res, next) => {
  const cliente = new Cliente(req.body);

  try {
    // Almacenar el registro
    await cliente.save();
    res.json({
      msg: 'Se agrego un nuevo cliente'
    })
  } catch (error) {
    // si hay un error
    res.send(error);
    next();
  }
}

// Muestra todos los clientes
exports.mostrarClientes = async (req, res, next) => {

  try {
    const clientes = await Cliente.find({});
    res.json(clientes);
  } catch (error) {
    console.log(error);
    next();
  }
}


// Muestra un cliente por su id
exports.mostrarCliente = async (req, res, next) => {

  const cliente = await Cliente.findById(req.params.idCliente);

  if(!cliente) {
    res.json({ msg: 'no existe el cliente'});
    next();
  }

  // Mostrar el cliente
  res.json(cliente);
}

// Actualiza un cliente por su id
exports.actualizarCliente = async (req, res, next) => { 
  try {
    const cliente = await Cliente.findOneAndUpdate({ _id: req.params.idCliente}, req.body, {new: true});

    res.json(cliente);
    
  } catch (error) {
    res.send(error);
    next();
  }
}

// Eliminar un cliente por su id

exports.eliminarCliente = async (req, res, next) => { 
  try {
   await Cliente.findOneAndDelete({_id: req.params.idCliente}); 
    res.json({
      msg: 'El cliente se ha eliminado'
    })
  } catch (error) {
    console.log(error);
    next();
  }
}
