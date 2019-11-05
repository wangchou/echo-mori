import express from 'express';
import fs from 'fs';
import https from 'https'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import { ttsAPI } from './tts.js'
import db from "./models/index.js"

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
app.use(function (req, res, next) {
    req.db = db;
    next();
});

// use get only because => chrome don't cache any xhr post response
app.get('/tts', ttsAPI)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: app.get('env') === 'development' ? err : {}
    });
});

var port = 4000
https.createServer({
    key: fs.readFileSync('src/server/config/localhost.key'),
    cert: fs.readFileSync('src/server/config/localhost.crt')
}, app).listen(port, function () {
    console.log(`Express Server listening on port ${port}!`)
})
