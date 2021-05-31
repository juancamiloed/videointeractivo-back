//importamos las dependencia mongoose
const { Schema, model } = require("mongoose");

// Segenera el esquema base
const SCHEMA = new Schema({
    nombre: { type: String, require: true },
    apellido: String,
    correoestudiante: String,
    edad: Number,
    intereses: String
});


// exportamos el schema generado
exports.universidad = model("Estudiante", SCHEMA);