var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser')
var path = require('path')

var upload = multer();
var app = express();

var port = (process.env.PORT || 8080)

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(upload.array());

var autocomplete = require('./autocomplete.js');
app.use('/api/autocomplete',autocomplete);

var search = require('./weatherSearch.js');
app.use('/api/search',search);

app.use(express.static(path.join(__dirname+'/dist/weather-angular-app')));

app.use('/*', (req,res)=>{
    res.sendFile(path.join(__dirname+'/dist/weather-angular-app/index.html'));
})

app.listen(port);