//Crear las Rutas de la API

const { constants } = require('buffer');
const express = require('express'); // Importamos el modulo de Express
const fs = require("fs") // Importamos el modulo Filesystem
const path = require("path"); // Importamos el modulo Path
const { title } = require('process');

// creando una nueva instancia de un enrutador express
const router = express.Router();

// construyendo una ruta de archivo absoluta para al .json
const tasksFilePath = path.join(__dirname, "../../data/tasks.json")
// __dirname -> VAriable global que guarda la ruta al
// directorio donde esta el archivo actualmente ejecutado

// Leer tareas desde el archivo
const readTasks = () => {
    // Leer el archivo. Este poderoso metodo nos permite leer archivos de manera sincrona.
    const tasksData = fs.readFileSync(tasksFilePath);
    // Retornar los datos en formato JSON.
    return JSON.parse(tasksData);
}

// Escribir tareas en el archivo
const writeTasks = (tasks) => { 
    // Escribir los datos en el archivo. Este poderoso metodo nos permite escribir
    //archivos de manera sincrona.
    fs.writeFileSync(tasksFilePath, JSON.stringify(tasks, null, 2)) // aplicamos sangria para un resultado mucho más legible
}

// Crear una nueva tarea
router.post("/", (req, res) => {
    const tasks = readTasks();
    const newTask = {
        id: tasks.length + 1, // simulamos un id autoincrementable
        title: req.body.title, // obtenemos el titulo de la tarea desde el cuerpo de la solicitud
        description: req.body.description, // obtenemos la descripcion de la tarea desde el cuerpo de la solicitud
    };
    tasks.push(newTask);
    writeTasks(tasks);
    // Seteamos el estado exitoso y devolvemos tambien message y la tarea creada
    res.status(201).json({ message: "Tarea creada exitosamente", task: newTask })
    //.json en node -> - internamente para convertir el objeto JavaScript en una cadena JSON
    // - Establece el encabezado 'Content-Type' de la respuesta a 'application/json'.
    // - Envía la cadena JSON como el cuerpo de la respuesta al cliente
})

// Obtener todas las tareas
router.get("/", (req, res) => {
    const tasks = readTasks();
    res.json(tasks);
})

// Obtener una tarea por ID
router.get("/:id", (req, res) => {
    const tasks = readTasks();
    const task = tasks.find((t) => t.id === parseInt(req.params.id)); //req.params. accede al query params especificado en la URL
    if (!task) {
        return res.status(404).json({ message: "Tarea no encontrada" });
    }
    res.json(task);
})

// Actualizar una tarea por ID
router.put("/:id", (req, res) => {
    const tasks = readTasks();
    const taskIndex = tasks.findIndex((t) => t.id === parseInt(req.params.id));
    if (taskIndex === -1) {
        return res.status(404).json({ message: "Tarea no encontrada" });
    }
    const updatedTask = {
        ...tasks[taskIndex],
        title: req.body.title,
        description: req.body.description,
    };
    tasks[taskIndex] = updatedTask;
    writeTasks(tasks);
    res.json({message: "Tarea actualizada exitosamente", task: updatedTask})
})

// Eliminar una tarea por ID
router.delete("/:id", (req, res) => {
    const tasks = readTasks();
    const newTasks = tasks.filter((t) => t.id !== parseInt(req.params.id)); // Se 
    if (tasks.length === newTasks.length) {
        return res.status(404).json({ message: "Tarea no encontrada", task: `${tasks.length}`,  task2: `${newTasks.length}`, newTasks,})
    }
    writeTasks(newTasks);
    res.json({message: "Tarea eliminada exitosamente"})
})

module.exports = router;






