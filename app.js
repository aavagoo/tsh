const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routes = require('./routes/index');
const errorsHandler = require('./middlewares/ErrorsHandler');
const path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use(errorsHandler.notFound);
app.use(errorsHandler.catchErrors);

module.exports = app;