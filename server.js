const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  logger = require('morgan'),
  mongoose = require('mongoose');

const routes = require('./app/routes');

const config = require('./config/config'),
  User = require('./app/models/user');

app.set('port', process.env.PORT || 8800);
mongoose.connect(config.database);
app.set('secret', config.secret);

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(logger('dev'));

routes(app);
app.get('/', (req, res) => {
  res.send({
    message: 'This is the beginning of awesomeness'
  });
})

app.listen(app.get('port'));
console.log(`App running on http://localhost:${app.get('port')}` );
