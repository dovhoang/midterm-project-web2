const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const expressValidator = require('express-validator');
//const passport = require('passport');
const port = process.env.PORT || 8000;
require('dotenv').config();
//require('./services/passport');

const app = express();

//import route
const authRoute = require('./routes/authRoute');
const boardRoute = require('./routes/boardRoute');
const tagRoute = require('./routes/tagRoute');
const userRoute = require('./routes/userRoute');

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
app.use(cors());
//app.use(passport.initialize());
//app.use(passport.session());

//route middleware
app.use('/api', authRoute);
app.use('/api', userRoute);
app.use('/api', boardRoute);
app.use('/api', tagRoute);

app.listen(port, () => {
    console.log(`${port}`);
})

