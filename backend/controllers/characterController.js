const { prisma } = require('../lib/prisma.js')

const check = async (req, res) => {
    if(!req.body.name || !req.body.x || !req.body.y) {
        return res.status(422).json({ message: 'Please provide necessary data' })
    }

    const { name, x, y } = req.body

    const character = await prisma.character.findUnique({
        where: { name }
    })

    if(!character) {
        return res.status(400).json({ message: 'Character not found' })
    }

    if(character.x !== x && !character.y !== y) {
        return res.status(400).json({ message: 'Wrong coordinates' })
    }

    res.json({ message: 'Success' })
}

module.exports = {
    check
}