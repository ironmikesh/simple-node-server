//set up express
const express = require('express');
const app = express();

//Configuring the database for use with mongoose
const config = require('./config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


//set up parse requests for JSON with body-parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Connecting to the database
mongoose.connect(config.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true //needed for new mongodb Server Monitoring and Discovery engine
}).then(() => {
    console.log('Successfully connected to the database');
}).catch(err => {
    console.log('Could not connect to the database, Exiting now...', err);
    process.exit();
});

//set up routing - add additional routes here
require('./application.routes.js')(app);

//default route
app.get('/', (req, res) => {
    res.json({"message": "Welcome to Mikey's Product App!"});
});

//Enable CORS for all HTTP methods
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

//listen on port 3000
app.listen(config.serverport, () => {
    console.log("Server is listening on port 3000");
});