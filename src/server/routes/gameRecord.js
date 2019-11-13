import express from 'express'
import passport from 'passport';

const router = express.Router();

// auth logout
router.get('/', async (req, res) => {
    if (req.user == undefined) {
        res.send({});
        return;
    }
    req.db.GameRecord.findAll({
        where: {
            googleId: req.user.googleId
        }
    }).then((records) => {
        res.send(records.map(record => ({
            setId: record.setId,
            starCount: record.starCount,
            gameScore: record.gameScore,
            startTime: record.startTime,
            endTime: record.endTime,
        })))
    });
});

// auth with google+
router.post('/', async (req, res) => {
    if (req.user == undefined) {
        res.sendStatus(200);
        return;
    }
    req.db.GameRecord.create({
        ...req.body,
        googleId: req.user.googleId
    }).then((record) => {
        console.log('created new record: ', req.body);
        res.sendStatus(200)
    });
});

export default router;