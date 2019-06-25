import MeCab from 'mecab-async'
import mcache from 'memory-cache'
import os from 'os'

const mecab = new MeCab()
const isMac = os.type() === 'Darwin'
if (isMac) {
    mecab.command = 'mecab -d /usr/local/lib/mecab/dic/mecab-ipadic-neologd/ -E "<改行>\\n"';
} else {
    mecab.command = 'mecab -d /usr/lib/mecab/dic/mecab-ipadic-neologd -E "<改行>\\n"';
}

// https://medium.com/the-node-js-collection/simple-server-side-cache-for-express-js-with-node-js-45ff296ca0f0
var cache = (duration) => {
    return (req, res, next) => {
        if (!req.query || !req.query.jpnStr) return res.sendStatus(400)
        let key = req.query.jpnStr
        let cachedText = mcache.get(key)
        if (cachedText) {
            res.send(cachedText)
            return
        } else {
            res.sendResponse = res.send
            res.send = (text) => {
                mcache.put(key, text, duration * 1000)
                res.sendResponse(text)
            }
            next()
        }
    }
}

export let mecabAPI = [
    cache(86400),
    async (req, res) => {
        if (!req.query || !req.query.jpnStr) return res.sendStatus(400)
        console.log(new Date().toLocaleString(), req.query.jpnStr)
        mecab.parse(req.query.jpnStr, function (err, result) {
            if (err) {
                return res.status(500).send({ error: 'Something failed!' })
            }
            // trimedResult = [[kanji, 詞性, furikana, yomikana]]
            let trimedResult = result.map((arr) => [arr[0], arr[1], arr[arr.length - 2], arr[arr.length - 1]])
            res.set('Cache-Control', 'public, max-age=30000000')
            res.json(trimedResult)
        });
    }
]
