const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const expressValidator = require('express-validator');
const passport = require('passport');
const port = process.env.PORT || 3000;
require('dotenv').config();
require('./services/passport');

const app = express();

//import route
const authRoute = require('./routes/authRoute');

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
app.use(passport.initialize());
app.use(passport.session());

//route middleware
app.use('/api', authRoute);

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
})

