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

module.exports = {
    start
}