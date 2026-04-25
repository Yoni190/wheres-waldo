const express = require('express')
const characterRoutes = require('./routes/characterRoute.js')
const cors = require('cors')

require('dotenv').config()

const app = express()
app.use(express.json());
app.use(cors())

app.use('/characters', characterRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT, (error) => {
    if(error) {
        throw error
    }

    console.log(`Server listening on Port ${PORT}`)
})