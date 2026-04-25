import React, { useEffect, useRef, useState } from 'react'
import GameImage from '../assets/game.webp'
import Waldo from '../assets/waldo.png'
import Odlaw from '../assets/odlaw.png'
import Wizard from '../assets/wizard.png'
import DropDown from '../components/DropDown'
import { toast } from 'react-toastify'
import Modal from '../components/Modal'
import { useNavigate } from 'react-router'




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
            level: 1
          })
        })

        const data = await res.json()
        setRoundId(data.round.id)
        console.log(data)
      }

      startRound()
    }, [])
    

    const setClickedPosition = (e) => {
        const rect = imageRef.current.getBoundingClientRect()

        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const xPercent = (x / rect.width) * 100
        const yPercent = (y / rect.height) * 100

        
        
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
            level: 1,
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

    const characters = [
        { name: 'Waldo', Img: Waldo },
        { name: 'Odlaw', Img: Odlaw },
        { name: 'Wizard', Img: Wizard }
    ]
  return (
    <div className="flex justify-center">
      <div className="relative inline-block">
        <img
          ref={imageRef}
          src={GameImage}
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
            characters={characters}
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
    </div>
  )
}

export default Game