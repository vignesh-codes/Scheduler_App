let express = require('express')
let app = express();
var port = process.env.PORT || 8080;
let bodyParser = require('body-parser');
//import mongoose
let mongoose = require('mongoose');
var cors = require('cors')
var morgan = require('morgan')

const config = require ('./configs/db.config');



app.use(cors())

//configure bodyparser to hande the post requests
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json())

app.use(morgan('combined'))

// Welcome message
app.get('/', (req, res) => res.send('Welcome to Express'));

// Launch app to the specified port
app.listen(port, function() {
    console.log("Backend Api created by V"+ port);
})

//Import routes
let apiRoutes = require("./routes/routes")

//Use API routes in the App
app.use('/api', apiRoutes)

//import body parser
var User = require('./models/userModel');


//connect to mongoose
const mongo = mongoose.connect(config.database, config.options);
mongo.then(() => {
    mongoose.set('useFindAndModify', false)
    mongoose.set('returnOriginal', false);

    console.log('connected');
}, error => {
    console.log(error, 'error');
})
