require('dotenv').config();
const express = require('express');

const userRoutes = require('./modules/user/routes/user.routes');
const meetingRoutes = require('./modules/meeting/routes/meeting.routes');
const errorMiddleware = require('./middlewares/error.middleware');

const app = express();

app.use(express.json());

app.use('/users', userRoutes);
app.use('/meetings', meetingRoutes);

app.use(errorMiddleware);

module.exports = app;
