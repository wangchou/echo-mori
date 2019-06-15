import express from 'express';
import fs from 'fs';
import https from 'https';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import ttsAPI from './tts.mjs'

var app = express();
app.use(morgan('tiny'))

//            rollup
// client.js ========> bundle.js location
app.use('/', express.static('public'))

// server api
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/tts', ttsAPI);

var port = 4000
https.createServer({
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.crt')
}, app).listen(port, function () {
  console.log(`Express Server listening on port ${port}!`)
});
