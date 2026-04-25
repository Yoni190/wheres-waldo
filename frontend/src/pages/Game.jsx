import React, { useState } from 'react'
import GameImage from '../assets/game.webp'
import useMousePosition from '../utils/useMousePosition'
import Waldo from '../assets/waldo.png'
import Odlaw from '../assets/odlaw.png'
import Wizard from '../assets/wizard.png'
import DropDown from '../components/DropDown'


const Game = () => {
    const position = useMousePosition()
    const x = position.x
    const y = position.y
    const [clicked, setClicked] = useState(false)
    const [xPosition, setXPosition] = useState(0)
    const [yPosition, setYPosition] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    const setClickedPosition = () => {
        console.log(x, y)
        setXPosition(x)
        setYPosition(y)
        setClicked(true)
        setIsOpen(true)
    }

    const characters = [
        { name: 'Waldo', Img: Waldo },
        { name: 'Odlaw', Img: Odlaw },
        { name: 'Wizard', Img: Wizard }
    ]
  return (
    <div className='flex justify-center'>
        <img src={GameImage} alt="" onClick={setClickedPosition} className='cursor-crosshair'/>
        <div className="border w-5 h-5 rounded-full" style={{ top: yPosition, left: xPosition, position: 'absolute', display: clicked ? 'block' : 'none'}}></div>

        {isOpen && (
                <DropDown xPosition={xPosition} yPosition={yPosition} characters={characters}/>
            )}
    </div>
  )
}

export default Game