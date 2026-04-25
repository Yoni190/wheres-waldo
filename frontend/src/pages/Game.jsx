import React, { useState } from 'react'
import GameImage from '../assets/game.webp'
import useMousePosition from '../utils/useMousePosition'
import Waldo from '../assets/waldo.png'
import Odlaw from '../assets/odlaw.png'
import Wizard from '../assets/wizard.png'


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
  return (
    <div className='flex justify-center'>
        <img src={GameImage} alt="" onClick={setClickedPosition} className='cursor-crosshair'/>
        <div className="border w-5 h-5 rounded-full" style={{ top: yPosition, left: xPosition, position: 'absolute', display: clicked ? 'block' : 'none'}}></div>

        {isOpen && (
                <div
                    className="origin-top-right absolute mt-2 w-56 
                    rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5
                    focus:outline-none"
                    style={{
                        left: xPosition,
                        top: yPosition + 15
                    }}
                    role="menu"
                >
                    <div className="py-1" role="none">
                        <div
                            className="block px-4 py-2 text-sm text-gray-700 
                            hover:bg-gray-100 flex items-center gap-3 cursor-pointer"
                            role="menuitem"
                        >
                            <img src={Waldo} alt="waldo" width={35} />
                            <p className='text-base'>Waldo</p>
                        </div>
                        <div
                            className="block px-4 py-2 text-sm text-gray-700 
                            hover:bg-gray-100 flex items-center gap-3 cursor-pointer"
                            role="menuitem"
                        >
                            <img src={Odlaw} alt="odlaw" width={35} />
                            <p className='text-base'>Odlaw</p>
                        </div>
                        <div
                            className="block px-4 py-2 text-sm text-gray-700 
                            hover:bg-gray-100 flex items-center gap-3 cursor-pointer"
                            role="menuitem"
                        >
                            <img src={Wizard} alt="wizard" width={35} />
                            <p className='text-base'>Wizard</p>
                        </div>
                    </div>
                </div>
            )}
    </div>
  )
}

export default Game