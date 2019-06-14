import express from 'express';
import fs from 'fs';
import https from 'https';

var app = express();

//            rollup
// client.js ========> bundle.js location
app.use('/', express.static('public'))

// server api
app.get('/greeting', async (req, res) => {
  res.send('Hello ')
});

var port = 4000
https.createServer({
  key: fs.readFileSync('localhost.key'),
  cert: fs.readFileSync('localhost.crt')
}, app).listen(port, function () {
  console.log(`Express Server listening on port ${port}!`)
});
