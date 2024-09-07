const express = require('express');
const morgan = require('morgan');
const moviesRouter = require('./Routes/moviesRoutes')

const app = express();
const logger = (req, res, next) => {
    console.log("Custom logger middleware called");
    next();
}

//middleware
app.use(express.json());
if(process.env.NODE_ENV === 'developement'){
    app.use(morgan('dev'));
}
app.use(express.static('./public'));
app.use(logger);
app.use((req, res, next) => {
    req.requestedAt = new Date().toISOString();
    next();
});
app.use('/api/v1/movies', moviesRouter);

module.exports = app;