const { MongoClient } = require('mongoose');
const dbConfig = require('../config/db.config')

const HOST = dbConfig.HOST;
const USER = dbConfig.USER; //Le pasamos los datos del objeto db.config
const PASSWORD = dbConfig.PASSWORD;
const DATA_BASE = dbConfig.DB;

// Nombre de bd
const dbName = DATA_BASE;
// Conexión URL 
//const url = 'mongodb+srv://AdminDB:<root>@cluster0.515us.mongodb.net/universidad?retryWrites=true&w=majority';
const url = `mongodb+srv://${USER}:${PASSWORD}@cluster0.515us.mongodb.net/${DATA_BASE}?retryWrites=true&w=majority`;

const client = new MongoClient(url, {
  useUnifiedTopology: true
});

module.exports = async () => {
  // Conectamos al servidor
  await client.connect();
  return client.db(dbName); // retornamos la conexión con el nombre de la bd a usar
};