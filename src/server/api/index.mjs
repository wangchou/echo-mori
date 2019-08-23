import express from 'express'
import { record } from './record'
import { user } from './user'

const api = express.Router()
api.use('/record', record)
api.use('/user', user)

export { api }
