const http = require('http');

const clientes = [
    {
        id: 1,
        nombre: "Juan Pérez",
        correo: "juan@gmail.com",
        telefono: "71234567",
        direccion: "Av. Banzer #123"
    }
];

const servidor = http.createServer((req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        return res.end();
    }
    
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200);
        return res.end(JSON.stringify({ mensaje: "API PROGRA WEB II" }));
    }

    if (req.url === "/api/clientes" && req.method === "GET") {
        res.writeHead(200);
        return res.end(JSON.stringify(clientes));
    }

    const matchGetId = req.url.match(/^\/api\/clientes\/(\d+)$/);
    if (matchGetId && req.method === "GET") {
        const id = Number(matchGetId[1]);
        const cliente = clientes.find(c => c.id === id);

        if (!cliente) {
            res.writeHead(404);
            return res.end(JSON.stringify({ mensaje: "Cliente no encontrado" }));
        }

        res.writeHead(200);
        return res.end(JSON.stringify(cliente));
    }

    if (req.url === "/api/clientes" && req.method === "POST") {
        let cuerpo = "";

        req.on('data', chunk => {
            cuerpo += chunk.toString();
        });

        req.on('end', () => {
            try {
                const datosJson = JSON.parse(cuerpo);

                const nuevoCliente = {
                    id: clientes.length + 1,
                    nombre: datosJson.nombre,
                    correo: datosJson.correo,
                    telefono: datosJson.telefono,
                    direccion: datosJson.direccion
                };

                clientes.push(nuevoCliente);

                res.writeHead(201, { "Content-Type": "application/json" });
                res.end(JSON.stringify(nuevoCliente));
            } catch (error) {
                res.writeHead(400);
                res.end(JSON.stringify({ mensaje: "JSON inválido o datos incorrectos" }));
            }
        });
        return;
    }

    res.writeHead(404);
    res.end(JSON.stringify({ mensaje: "Ruta o recurso no encontrado" }));
});

const PORT = 3000;
servidor.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});