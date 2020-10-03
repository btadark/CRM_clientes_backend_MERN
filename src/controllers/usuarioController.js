const Usuario = require('../models/Usuarios');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Usuarios = require('../models/Usuarios');

exports.registrarUsuario = async (req, res) => {
   
  // leer los datos del usuario y colocalos
  const usuario = new Usuario(req.body);
  
  usuario.password = await bcrypt.hash(req.body.password, 12);

  try {
    await usuario.save();
    res.json({
      msg: 'Usuario Creado'
    });

  } catch (error) {
    console.log(error);
    res.json({msg: 'Hubo un error'});
  }
};

exports.autenticarUsuario = async(req, res, next) => {
  
  // Buscar el usuario
  const { email, password } = req.body; 
  const usuario = await Usuarios.findOne({ email });

  if(!usuario) {
    // Si el usuario no existe
    await res.status(401).json({ msg: 'Ese usuario no existe'});
    next();
  } else {
    // El usuario existe, verificar si el password es correcto o incorrecto
    if(!bcrypt.compareSync(password, usuario.password)) {
      // Si el password no es incorrecto
      await res.status(401).json({ msg: 'Password incorrecto'});
      next();
    } else {
      // Password correcto, firmar el token
      const token = jwt.sign({
        email: usuario.email,
        nombre: usuario.nombre,
        id: usuario.id
      }, 'LLAVESECRETA', {
        expiresIn: '1h'
      });

      // Retornar el token

      res.json({token});
    }

  }
}