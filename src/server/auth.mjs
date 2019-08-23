import jsonwebtoken from 'jsonwebtoken'

export let verifyToken = function (req, res, next) {
    try {
        let decoded = jsonwebtoken.verify(req.token, 'secret')
        console.log(decoded)
        req['userid'] = decoded.userid
        next()
    } catch(err) {
        res.status(400).json({
            'message': err.message
        })
    }
}
