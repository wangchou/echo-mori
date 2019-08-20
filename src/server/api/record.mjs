import express from 'express'
import jsonwebtoken from 'jsonwebtoken'
import { verifyToken } from '../auth'

const record = express.Router()

record.get('/', getRecordList)
record.post('/', verifyToken, createRecord)

function getRecordList(req, res) {
    console.log(req.query)
    res.send(req.query)
}

async function createRecord(req, res) {
    let mode = req.body.mode
    let userId = req.userid
    let scores = req.body.score
    let totalScore = 0
    for (let score of scores) {
        totalScore = totalScore + score.score
    }
    res.status(200).send("success")
}

export { record }
