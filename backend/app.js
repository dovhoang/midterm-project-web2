const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const port = process.env.PORT || 3000;

const app = express();

//import route
const authRoute = require('./routes/authRoute');

require('dotenv').config();

// connect db
mongoose
    .connect(process.env.DATABASE, {
        useNewUrlParser: true,
        useCreateIndex: true
    })
    .then(() => console.log('DB Connected'));

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(expressValidator());
app.use(cookieParser());


//route middleware
app.use('/api', authRoute);
app.get('/', (req, res) => {
    res.send('hello');
})

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})

