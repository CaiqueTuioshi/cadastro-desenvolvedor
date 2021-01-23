require("dotenv").config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});
const mongoose = require('mongoose')
const routes = require('./routes')

const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors())
app.use(routes)

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true
})

module.exports = app;