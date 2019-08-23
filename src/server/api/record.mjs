import express from 'express'
import jsonwebtoken from 'jsonwebtoken'
import { verifyToken } from '../auth'
import { createGameRecord, createGameRecordDetail, queryGameRecordByMode } from '../db'
const record = express.Router()

record.get('/', getRecordList)
record.post('/', verifyToken, createRecord)

async function getRecordList(req, res) {
    console.log(req.query)
    try {
        let result = await queryGameRecordByMode(req.db, req.query.mode)
        res.send(result)
    } catch (err) {
        res.status(400).send(err.message)
    }
}

async function createRecord(req, res) {
    try {
        let mode = req.body["mode"]
        let userId = req.userid
        let scores = req.body["score"]
        let sentenSetId = req.body.sentenceSetId
        let totalScore = 0
        for (let score of scores) {
            totalScore = totalScore + score.score
        }
        let gameRecordId = await createGameRecord(req.db, userId, mode, totalScore, sentenSetId)

        for (let score of scores) {
            await createGameRecordDetail(req.db, gameRecordId, score.sentenceId, score.score)
        }
        res.status(200).send("success")
    } catch (err) {
        res.status(400).json({
            "error": err.message
        })
    }
}



export { record }
