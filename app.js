var express = require('express');
var sm = require('sitemap');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var port = (process.env.PORT || 3000);

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express()
    , sitemap = sm.createSitemap({
    hostname: 'https://tessellator.herokuapp.com',
    cacheTime: 600000000,
    urls: [
        { url: '/', changefreq: 'daily'}
    ]
});

app.use(express.static(__dirname + '/public'))
    .use(cors())
    .use(cookieParser());

app.get('/sitemap.xml', function(req, res) {
    sitemap.toXML( function (err, xml) {
        if (err) {
            return res.status(500).end();
        }
        res.header('Content-Type', 'application/xml');
        res.send( xml );
    });
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);

module.exports = app;
