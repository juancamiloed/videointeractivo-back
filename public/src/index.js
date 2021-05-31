// importando dependencias
const Express = require("express");
const { connect } = require("mongoose");
const bodyParser = require("body-parser")
let cors = require("cors")
// llamando al schema
const { universidad } = require("./schema.js");
const dbConfig = require('../config/db.config')

//creamos el servidor con express (en react aca es cuando ponemos app), 
//le indicamos después que use cors como método de seguridad para el envío de datos y bodyparser para leer los datos HTTP POST. Este body-parser analiza los datos codificados y los pasa a JSON.
const Server = Express();
Server.use(cors())
Server.use(bodyParser.json())
Server.use(bodyParser.urlencoded({ extended: true})); //analiza el texto como datos codificados en URL (que es cómo los navegadores tienden a enviar datos)

// Parametros de conexion
const HOST = dbConfig.HOST;
const USER = dbConfig.USER; //Le pasamos los datos del objeto db.config
const PASSWORD = dbConfig.PASSWORD;
const DATA_BASE = dbConfig.DB;

// Preparando cadena de conexion
const CONECTOR = `mongodb+srv://${USER}:${PASSWORD}@cluster0.515us.mongodb.net/${DATA_BASE}?retryWrites=true&w=majority`;
const OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true
};

// Router para crear datos 
Server.post("/crear", (request, response) => {
    // Preparando los datos que seran enviados a mongodb
    console.log(request.body)

    const DATA = {
        nombre: request.body.nombre,
        apellido: request.body.apellido,
        correoestudiante: request.body.correoestudiante,
        edad: request.body.edad,
        intereses: request.body.intereses
    };

    // Se indica que se crea un nuevo registro
    const ESTU = new universidad(DATA);

    // Se recibe la respuesta generada al crear un nuevo registro.
    ESTU.save((error, data) => {
        // En caso de error mostramos el problema
        if (error) {
            response.status(404);
            response.json(error);
        } else {
            // en caso de que todo salga correcto enviamos la respuesta.
            response.status(200);
            response.json(data);
        }
    });
});

// Routere para consultar todos los datos generados.
Server.get("/", (request, response) => {
    
    // Generamos una busqueda completa.
    universidad.find({}, (error, data) => {
        // En caso de error mostramos el problema
        if (error) {
            response.status(404);
            response.json(error);
        } else {
             // en caso de que todo salga correcto enviamos la respuesta.
            response.status(200);
            response.json(data);
            console.log(data);
        }
    });
});


// Abriendo la conexión a mongoDB Atlas
connect(CONECTOR, OPTIONS, MongoError => {
    // si algo sale mal mostramos el error y paramos el servidor
    if (MongoError) {
        console.error(MongoError);
        process.exit(1);
    }
    // se inicia el servidor
    Server.listen(9000, error => {
        // En caso de error indicamos el problemas
        if (error) {
            console.error(error);
            process.exit(1);
        }
        console.log("Conexión establecida con MongoDB Altas");
        console.log("Servidor listo");
    });
}
);