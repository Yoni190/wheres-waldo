import React, { useState } from 'react'
import GameImage from '../assets/game.webp'
import useMousePosition from '../utils/useMousePosition'


const Game = () => {
    const position = useMousePosition()
    const x = position.x
    const y = position.y
    const [clicked, setClicked] = useState(false)
    const [xPosition, setXPosition] = useState(0)
    const [yPosition, setYPosition] = useState(0)

    const setClickedPosition = () => {
        console.log(x, y)
        setXPosition(x)
        setYPosition(y)
        setClicked(true)
    }
  return (
    <div className='flex justify-center'>
        <img src={GameImage} alt="" onClick={setClickedPosition}/>
        <div className="border w-5 h-5 rounded-full" style={{ top: yPosition, left: xPosition, position: 'absolute', display: clicked ? 'block' : 'none'}}></div>
    </div>
  )
}

export default Game