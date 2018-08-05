const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const path = require('path')

app.set('port', (process.env.PORT || 5000))

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

app.use(morgan('dev'))

app.use(cors())

app.use(express.static(`${__dirname}/dist`))

app.get('*', (req, res) => res.sendFile(path.join(`${__dirname}/index.html`)))

app.listen(app.get('port'), () => console.log('running on port', app.get('port')))
