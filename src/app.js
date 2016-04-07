var path = require('path');
var express = require('express');
var compression = require('compression');
var favicon = require('serve-favicon');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var session = require('express-session');

var RedisStore = require('connect-redis')(session);
var url = require('url');
var csrf = require('csurf');

var router = require('./router.js');
var port = process.env.PORT || process.env.NODE_PORT || 3000;

var app = express();
app.use('/assets', express.static(path.resolve(__dirname + '/../client/')));
app.use(compression());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.use(favicon(__dirname + '/../client/img/favicon.png'));
app.disable('x-powered-by');

router(app);
console.log("Router Loaded...");

var roomServer = require('./roomHandler.js');
console.log("Room Handler Loaded...");

roomServer(app, port);