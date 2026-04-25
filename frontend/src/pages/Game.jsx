import React, { useEffect, useRef, useState } from 'react'
import Level1 from '../assets/game.webp'
import Level2 from '../assets/level-2.webp'
import Level3 from '../assets/level-3.webp'
import Waldo from '../assets/waldo.png'
import Odlaw from '../assets/odlaw.png'
import Wizard from '../assets/wizard.png'
import Wenda from '../assets/wenda.png'
import DropDown from '../components/DropDown'
import { toast } from 'react-toastify'
import Modal from '../components/Modal'
import { useNavigate, useSearchParams } from 'react-router'




const Game = () => {
    const [clicked, setClicked] = useState(false)
    const [xPosition, setXPosition] = useState(0)
    const [yPosition, setYPosition] = useState(0)
    const [isOpen, setIsOpen] = useState(false)
    const imageRef = useRef(null)
    const hasStarted = useRef(false)
    const [roundId, setRoundId] = useState(0)
    const [duration, setDuration] = useState(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const navigate = useNavigate()
    const [users, setUsers] = useState([])

    const [searchParams] = useSearchParams()
    const level = parseInt(searchParams.get('level')) || 1

    const levelImages = {
      1: Level1,
      2: Level2,
      3: Level3
    }

    useEffect(() => {
      if (hasStarted.current) return
      hasStarted.current = true
      const startRound = async () => {
        const res = await fetch('http://localhost:3000/rounds/start', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            level
          })
        })

        const data = await res.json()
        setRoundId(data.round.id)
        console.log(data)
      }

       const getUsers = async () => {
          const res = await fetch(`http://localhost:3000/rounds/${level}`)

          const data = await res.json()
          setUsers(data.users)
        }

      getUsers()
      startRound()
    }, [])
    
    

    const setClickedPosition = (e) => {
        const rect = imageRef.current.getBoundingClientRect()

        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const xPercent = (x / rect.width) * 100
        const yPercent = (y / rect.height) * 100

        console.log(xPercent, yPercent)
        
        
        setXPosition(xPercent)
        setYPosition(yPercent)
        setClicked(!clicked)
        setIsOpen(!isOpen)
    }

    const checkCharacter = async (character) => {
      setIsOpen(false)
      setClicked(false)

      try {
        const res = await fetch('http://localhost:3000/characters/check', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: character.toLowerCase(),
            x: xPosition,
            y: yPosition,
            level,
            roundId
          })
        })

        const data = await res.json()

        if(res.ok) {
          toast.success(data.message, {
            theme: 'colored',
            autoClose: 1300
          })
          const duration = data?.duration
          if (duration !== undefined && duration !== null) {
            setDuration(duration)
            setIsModalOpen(true)
          }
        } else {
          toast.error(data.message, {
            theme: 'colored',
            autoClose: 1300
          })
        }
      } catch (error) {
        console.error(error)
      }
    }

    const setName = async (username) => {
      try {
        const res = await fetch('http://localhost:3000/rounds/set-name', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            roundId,
            username
          })
        })

        const data = await res.json()
        console.log(data)
        navigate('/')
        toast.success(data.message)
      } catch (error) {
        console.error(error)
      }
    }

    const characters = {
      1: [
        { name: 'Waldo', Img: Waldo },
        { name: 'Odlaw', Img: Odlaw },
        { name: 'Wizard', Img: Wizard }
      ],
      2: [
        { name: 'Waldo', Img: Waldo }
      ],
      3: [
        { name: 'Waldo', Img: Waldo },
        { name: 'Odlaw', Img: Odlaw },
        { name: 'Wizard', Img: Wizard },
        { name: 'Wenda', Img: Wenda }
      ]
    }
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative inline-block">
        <img
          ref={imageRef}
          src={levelImages[level]}
          alt=""
          onClick={setClickedPosition}
          className="cursor-crosshair"
        />

        <div
          className="border w-5 h-5 rounded-full absolute -translate-x-1/2 -translate-y-1/2"
          style={{
            top: `${yPosition}%`,
            left: `${xPosition}%`,
            display: clicked ? 'block' : 'none'
          }}
        ></div>

        {isOpen && (
          <DropDown
            xPosition={xPosition}
            yPosition={yPosition}
            characters={characters[level]}
            checkCharacter={checkCharacter}
          />
        )}
        <Modal
          isModalOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Game Over"
          duration={duration}
          setName={setName}
        ></Modal>
      </div>
      <div className="w-full max-w-md bg-white rounded-xl shadow p-4">
        <h2 className="text-lg font-bold mb-3 text-center">
          Leaderboard
        </h2>

        <table className="w-full text-sm">
          <thead>
            <tr className="text-gray-500 border-b">
              <th className="text-left py-2">#</th>
              <th className="text-left py-2">Name</th>
              <th className="text-right py-2">Time (s)</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user, index) => (
              <tr
                key={index}
                className="border-b last:border-none hover:bg-gray-50"
              >
                <td className="py-2 font-semibold">{index + 1}</td>
                <td className="py-2">{user.userName}</td>
                <td className="py-2 text-right text-green-600 font-medium">
                  {user.duration}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Game