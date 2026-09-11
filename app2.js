const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

const productos = [
    {
        id: 1,
        nombre: "Laptop Toshiba",
        precio: 10000,
    },
    {
        id: 2,
        nombre: "Monitor",
        precio: 2500,
    }
];

const clientes = [
    {
        id: 1,
        nombre: "Pancho Lopez",
        correo: "pancho@ejemplo.com",
        telefono: "71234567",
        direccion: "Av. Alemana #123"
    }
];

app.get("/", (req, res) => {
    res.send("API PROGRA WEB II");
});

app.get("/api/productos", (req, res) => {
    res.json(productos);
});

app.get("/api/productos/:id", (req, res) => {
    const id = Number(req.params.id);
    const producto = productos.find(producto => producto.id === id);
    if (!producto) {
        return res.status(404).json({
            mensaje: "Producto no encontrado"
        });
    }
    res.json(producto);
});

app.post("/api/productos", (req, res) => {
    const nuevoProducto = {
        id: productos.length + 1,
        nombre: req.body.nombre,
        precio: req.body.precio,
    };
    productos.push(nuevoProducto);
    res.status(201).json(nuevoProducto);
});



app.get("/api/clientes", (req, res) => {
    res.json(clientes);
});

app.get("/api/clientes/:id", (req, res) => {
    const id = Number(req.params.id);
    const cliente = clientes.find(c => c.id === id);
    if (!cliente) {
        return res.status(404).json({
            mensaje: "Cliente no encontrado"
        });
    }
    res.json(cliente);
});

app.post("/api/clientes", (req, res) => {
    const nuevoCliente = {
        id: clientes.length + 1, 
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
    };
    
    clientes.push(nuevoCliente);
    

    res.status(201).json(nuevoCliente);
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`); 
});


//codigos de estado HTTP
// 200 OK: La solicitud se ha procesado correctamente.
// 201 Created: La solicitud se ha procesado correctamente y se ha creado un nuevo recurso.
// 400 Bad Request: La solicitud no se puede procesar debido a un error del cliente.
// 401 Unauthorized: La solicitud requiere autenticación y el cliente no ha proporcionado credenciales válidas.
// 403 Forbidden: El cliente no tiene permiso para acceder al recurso solicitado.
// 404 Not Found: El recurso solicitado no se ha encontrado en el servidor.
// 500 Internal Server Error: Se ha producido un error en el servidor al procesar la solicitud.

