const express = require('express')
const characterRoute = require('./routes/characterRoute.js')
const roundRoute = require('./routes/roundRoute.js')
const cors = require('cors')

require('dotenv').config()

const app = express()
app.use(express.json());
app.use(cors())

app.use('/characters', characterRoute)
app.use('/rounds', roundRoute)

const PORT = process.env.PORT || 3000
app.listen(PORT, (error) => {
    if(error) {
        throw error
    }

    console.log(`Server listening on Port ${PORT}`)
})