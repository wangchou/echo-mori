import express from 'express'
import { getUserByUserName } from '../db'
import jsonwebtoken from 'jsonwebtoken'
const user = express.Router()
user.post('/login', async function(req, res){
    let { userName, password } = req.body
    try {
        let user = await getUserByUserName(req.db, userName)
        console.log(user.password)
        console.log(user.id)
        console.log(user)
        let token = jsonwebtoken.sign({userid: user.id},
            'secret',
            { expiresIn: '24h'}
        )
        if (user.password == password) {
            res.status(200).json({
                'message': 'success',
                'token': token
            })
        }
    }
    catch(err) {
        console.log(err)
        res.status(400).json({
            'message': err
        })
    }
})

export { user }
