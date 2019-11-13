import express from 'express'
import passport from 'passport';

const router = express.Router();

router.get('/', async (req, res) => {
    if (!req.user) {
        res.send({});
        return;
    }
    req.db.UserSaid.findAll({
        where: {
            googleId: req.user.googleId
        }
    }).then((rows) => {
        res.send(rows.map(row => ({
            sentenceId: row.sentenceId,
            said: row.said
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
        req.db.UserSaid.upsert({
            googleId: req.user.googleId,
            sentenceId: row.sentenceId,
            said: row.said
        }).then((record) => {
            console.log('upsert userSaids: ', record);
        });
    })
});

export default router;