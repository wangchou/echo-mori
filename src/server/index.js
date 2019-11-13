import express from 'express';
import cookieSession from 'cookie-session'
import passport from 'passport'
import authRoutes from './routes/auth.js'
import passportSetup from './config/passport-setup.js'
import config from './config/config.js'
import fs from 'fs';
import https from 'https'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import ttsRoute from './routes/tts.js'
import userRoute from './routes/user.js'
import gameRecordRoute from './routes/gameRecord.js'
import db from './models/index.js'

var app = express()
app.use(helmet())
app.use(morgan('dev'))

//            rollup
// client.js ========> bundle.js location
app.use('/', express.static('public'))

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // 1 day
    keys: [config.session.cookie]
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(function (req, res, next) {
    req.db = db;
    next();
});

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('/auth', authRoutes);

// use get only because => chrome don't cache any xhr post response
app.get('/tts', ttsRoute)
app.get('/user', userRoute)
app.use('/gameRecord', gameRecordRoute)

app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

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
