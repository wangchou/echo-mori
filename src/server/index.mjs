import express from 'express';
import fs from 'fs';
import https from 'https'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import { ttsAPI } from './tts.mjs'
import { mecabAPI } from './mecab.mjs'
import { getSelfRecognizedAPI, selfRecognizedAPI } from './selfRecognized.mjs'
import mysql from "mysql"

var db = mysql.createConnection({
    host: "localhost",
    user: "forest_user",
    password: "forest_user",
    database: "bokenn",
    insecureAuth : true
});

db.connect(function(err) {
    if (err) {
        console.log('connecting error', err);
        return;
    }
    console.log('connecting success');
});


var app = express()
app.use(helmet())
app.use(morgan('dev'))

//            rollup
// client.js ========> bundle.js location
app.use('/', express.static('public'))

// server api
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// db state
app.use(function(req, res, next) {
    req.db = db;
    next();
});

// use get only because => chrome don't cache any xhr post response
app.get('/tts', ttsAPI)
app.get('/mecab', mecabAPI)
app.get('/updateSelfRecognized', selfRecognizedAPI)
app.get('/selfRecognized', getSelfRecognizedAPI)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

var port = 4000
https.createServer({
    key: fs.readFileSync('src/server/localhost.key'),
    cert: fs.readFileSync('src/server/localhost.crt')
}, app).listen(port, function () {
    console.log(`Express Server listening on port ${port}!`)
})
