const Producto = require('../models/Producto');

const multer = require('multer');
const shorid = require('shortid');

const configuracionMulter = {
  storage: fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __dirname+'../../uploads/');
    },
    filename: (req, file, cb) => {
      const extension = file.mimetype.split('/')[1];
      cb(null, `${shorid.generate()}.${extension}`);
    }
  }),
  fileFilter(req, file, cb) {
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
      cb(null,true);
    } else {
      cb(new Error('Fomato no válido'))
    }
  }
}

// pasar la configuracion y el campo
const upload = multer(configuracionMulter).single('imagen');

// Sube un archivo
exports.subirArchivo = (req,res,next) => {
  upload(req,res, function (error) {
    if(error) {
      res.json({ mensaje: error})
    }
    return next();
  })
}

// Agrega nuevos productos
exports.nuevoProducto = async(req, res, next) => {
  const producto = new Producto(req.body);

  try {

    if(req.file.filename) {
      producto.imagen = req.file.filename
    }

    await producto.save();
    res.json({
      msg: 'Se agrego un nuevo producto'
    });
  } catch (error) {
    console.log(error);
    next();
  }
}

// Mostrar Productos
exports.mostrarProductos = async(req, res, next) => {
  try {
    //obtener todos los productos
    const productos = await Producto.find({});

    res.json(productos);

  } catch (error) {
    console.log(error);
    next();
  }
}

// Mostrar Producto por su id
exports.mostrarProducto = async(req, res, next) => {

    const producto = await Producto.findOne({_id: req.params.idProducto});

    if(!producto) {
      res.json({
        msg: 'Ese producto no existe'
      });
      return next();
    }

    // Mostrar el producto
    res.json(producto);
}

// Actualizar producto por su id
exports.actualizarProducto = async(req, res, next) => {
  try {
    

    // construir nuevo producto
    let nuevoProducto = req.body;

    // Verificar si hay imagen nueva
    if(req.file) {
      nuevoProducto.imagen = req.file.filename;
    } else {
      let productoAnterior = await Producto.findById(req.params.idProducto);
      nuevoProducto.imagen = productoAnterior.imagen
    }

    let producto = await Producto.findOneAndUpdate({_id: req.params.idProducto}, nuevoProducto, { new: true });

    res.json(producto);

  } catch (error) {
    console.log(error);
    next();
  }
}

// Eliminar producto por su id
exports.eliminarProducto = async(req, res, next) => {
  try {
    await Producto.findOneAndDelete({_id: req.params.idProducto});

    res.json({
      msg: 'El producto se ha eliminado'
    });
    
  } catch (error) {
    console.log(error);
    next();
  }
}

//

exports.buscarProducto = async(req, res, next) => {
  try {
    // obtener el query
    const {query} = req.params; 
    const producto = await Producto.find({nombre: new RegExp(query,'i')});
    res.json(producto);

  } catch (error) {
      console.log(error);
      next();
  }
}