const express = require('express')
const { prisma } = require('./lib/prisma.js')

require('dotenv').config()

const app = express()

app.get('/', async (req, res) => {
    const characters = await prisma.character.findMany()
    res.json({ message: characters })
})

const PORT = process.env.PORT || 3000
app.listen(PORT, (error) => {
    if(error) {
        throw error
    }

    console.log(`Server listening on Port ${PORT}`)
})