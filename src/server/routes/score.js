import express from 'express'
import passport from 'passport';

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.user) {
        res.send({});
        return;
    }
    req.db.Score.findAll({
        where: {
            googleId: req.user.googleId
        }
    }).then((rows) => {
        res.send(rows.map(row => ({
            sentenceId: row.sentenceId,
            score: row.score
        })))
    }).catch((err) => {
        res.send({})
    });
});

router.post('/', async (req, res) => {
    if (!req.user) {
        res.sendStatus(200);
        return;
    }

    req.body.forEach(row => {
        req.db.Score.upsert({
            googleId: req.user.googleId,
            sentenceId: row.sentenceId,
            score: row.score
        }).then((record) => {
        });
    })
});

export default router;