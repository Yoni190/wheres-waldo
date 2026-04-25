const { prisma } = require('../lib/prisma.js')

const check = async (req, res) => {
    if(!req.body.name || !req.body.x || !req.body.y || !req.body.level) {
        return res.status(422).json({ message: 'Please provide necessary data' })
    }

    const { name, x, y, level, roundId } = req.body

    const character = await prisma.character.findUnique({
        where: { name, level }
    })

    if(!character) {
        return res.status(400).json({ message: 'Character not found' })
    }

    if(character.xMax >= x && character.xMin <= x && character.yMax <= y && character.yMin >=y) {
        await prisma.foundCharacter.create({
            data: {
                characterId: character.id,
                roundId,
            }
        })

        const characters = await prisma.character.findMany({
            where: { level }
        })

        const foundCharacters = await prisma.foundCharacter.findMany({
            where: { roundId }
        })

        const isCompleted = characters.length === foundCharacters.length

        if(isCompleted) {
            await prisma.gameRound.update({
                where: { id: roundId },
                data: {
                    endTime: new Date(),
                    completed: true
                }
            })

            return res.json({ message: 'Game Completed' })
        }
        return res.json({ message: 'Correct' })
    }

    res.status(400).json({ message: 'Wrong Coordinates' })
}

module.exports = {
    check
}