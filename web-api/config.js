require("dotenv").config();

//dotenv global variables
const MONGO_CONECTION_URI = process.env.MONGO_CONECTION_URI;
const MONGO_PORT = process.env.MONGO_PORT;
const MONGO_DB_NAME = process.env.MONGO_DB_NAME;
const API_PORT = process.env.API_PORT;

export { MONGO_CONECTION_URI, MONGO_PORT, MONGO_DB_NAME, API_PORT };
