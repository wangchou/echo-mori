import express from 'express';
import fs from 'fs';
import https from 'https'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import helmet from 'helmet'
import { ttsAPI } from './tts.mjs'
import { mecabAPI } from './mecab.mjs'

var app = express()
app.use(helmet())
app.use(morgan('tiny'))

//            rollup
// client.js ========> bundle.js location
app.use('/', express.static('public'))

// server api
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

// use get only because => chrome don't cache any xhr post response
app.get('/tts', ttsAPI)
app.get('/mecab', mecabAPI)

var port = 4000
app.listen(port, function () {
    console.log('Example app listening on port 3000!');
  });