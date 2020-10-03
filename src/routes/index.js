const { Router } = require('express');
const clienteController = require('../controllers/clienteController');
const productoController = require('../controllers/productoController');
const pedidoController = require('../controllers/pedidoController');
const usuarioController = require('../controllers/usuarioController');

// middle para proteget las rutas
const auth = require('../middlewares/auth');

const router = Router();

/* --- CLIENTES ---- */

// Agrega nuevos clientes via POST
router.post('/clientes',
  auth,
  clienteController.nuevoCliente
);

// Obtener todos los clientes
router.get('/clientes', 
  auth,
  clienteController.mostrarClientes
);

// Obtiene un cliente por su id
router.get('/clientes/:idCliente',
  auth,
  clienteController.mostrarCliente
);

// Actualizar cliente
router.put('/clientes/:idCliente',
  auth,
  clienteController.actualizarCliente
);

// Eliminar un cliente por su id
router.delete('/clientes/:idCliente', 
  auth,
  clienteController.eliminarCliente
);



/* --- PRODUCTOS ---- */

// nuevos productos
router.post('/productos',
  auth,
  productoController.subirArchivo,
  productoController.nuevoProducto
);

// Muestra todos los productos
router.get('/productos', 
  auth,
  productoController.mostrarProductos
);

// Muestra un producto por su id
router.get('/productos/:idProducto',
  auth,
  productoController.mostrarProducto
);

// Actualizar producto
router.put('/productos/:idProducto',
  auth,
  productoController.subirArchivo,
  productoController.actualizarProducto
);

// Eliminar producto por su id
router.delete('/productos/:idProducto',
  auth,
  productoController.eliminarProducto
);

// Busqueda de productos
router.post('/productos/busqueda/:query',
  productoController.buscarProducto
);


/* --- PEDIDOS ---- */

// Agregar nuevos pedidos
router.post('/pedidos/nuevo/:idUsuario',
  auth,
  pedidoController.nuevoPedido
);

// Mostrar todos los pedidos
router.get('/pedidos',
  auth,
  pedidoController.mostrarPedidos
);

// Mostrar pedido por su id
router.get('/pedidos/:idPedido',
  auth,
  pedidoController.mostrarPedido
);

// Actualizar pedido por su id
router.put('/pedidos/:idPedido',
  auth,
  pedidoController.actualizarPedido
);

// Eliminar un pedido por su id
router.delete('/pedidos/:idPedido',
  auth,
  pedidoController.eliminarPedido
);


/* --- USUARIOS ---- */
router.post('/crear-cuenta',
  auth,
  usuarioController.registrarUsuario
);


router.post('/iniciar-sesion',
  usuarioController.autenticarUsuario
);



module.exports = router;