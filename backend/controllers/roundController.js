const { prisma } = require('../lib/prisma.js')

const start = async (req, res) => {
    const { level } = req.body

    const result = await prisma.gameRound.create({
        data: {
            level
        }
    })

    return res.json({ round: result })
}

const setName = async (req, res) => {
    const { username, roundId } = req.body
    

    await prisma.gameRound.update({
        where: { id: roundId },
        data: {
            userName: username
        }
    })

    return res.json({ message: 'Name stored successfully' })
}

const index = async (req, res) => {
    const level = parseInt(req.params.level)

    const users = await prisma.gameRound.findMany({
        where: { level, completed: true },
        orderBy: { duration: 'asc' },
        select: { duration: true, userName: true},
        take: 10
    })

    return res.json({ users })
}

module.exports = {
    start,
    setName,
    index
}