//Crear el Servidor con Express

// Importamos el modulo de Express
const express = require("express");
// Importamos las rutas de la API
const taskRoutes = require("./routes/tasks");
// Importamos el middleware para manejo de errores
const errorHandler = require("./middlewares/errorHandler");

 // Creamos una instancia de Express
const app = express();
// Definimos el puerto del servidor en donde se ejecutará la API
const PORT = 3000;

/// Middleware para parsear el cuerpo de las solicitudes en
//formato JSON.Tambien conocido como middleware de aplicación.
app.use(express.json());

// Middleware para manejar las rutas de la API. Tambien
//conocido como middleware de montaje o de enrutamiento.
app.use("/tasks", taskRoutes)

// Middleware para manejar errores.
app.use(errorHandler)

// Iniciamos el servidor en el puerto que aplique
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/`)
})
