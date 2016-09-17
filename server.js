var express     = require('express'),
    routes      = require('./backapp/routes.js'),
    mongoose    = require('mongoose'),
    path        = require('path')
    uuid        = require('uuid-v4'),
    port     = process.env.PORT || 8080,
    passport = require('passport'),
    flash    = require('connect-flash'),

    bodyParser = require('body-parser'),
    session     = require('express-session'),

    configDB = require('./backapp/config/db.js');

    //yelp        = require('yelp');

var app = express();

mongoose.connect(configDB.url);

app.use('/public', express.static(process.cwd() + '/public'));
//app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(process.cwd() + '/node_modules'));
//app.use(express.static(path.join(__dirname, 'node_modules')));
//app.use('/controllers', express.static(process.cwd() + '/app/controllers'));

require('./backapp/config/passport')(passport);

app.use(session({ secret: 'locallingtesting' }));
app.set('view engine', 'ejs');
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
routes(app, passport);

var port = process.env.PORT || 8080;
app.listen(port, function() {
    console.log('Listening in port : '+port+'...');
});


