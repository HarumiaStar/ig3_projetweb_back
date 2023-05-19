const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors')

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/userRoute');
const filmsRouter = require('./routes/filmRoute');
const genresRouter = require('./routes/genreRoute');
const sessionsRouter = require('./routes/sessionRoute');
const bookingsRouter = require('./routes/bookingRoute');
const cinemasRouter = require('./routes/cinemaRoute');

const app = express();

app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/films', filmsRouter);
app.use('/genres', genresRouter);
app.use('/sessions', sessionsRouter);
app.use('/bookings', bookingsRouter);
app.use('/cinemas', cinemasRouter);

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGODB_URL);
}

module.exports = app;
