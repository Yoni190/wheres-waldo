import React from 'react'
import { Link } from 'react-router'
import Level1 from '../assets/game.webp'
import Level2 from '../assets/level-2.webp'

const Home = () => {
  const levels = [
    { name: 'Level 1', img: Level1, rotate: '-rotate-2', offset: 'mt-0' },
    { name: 'Level 2', img: Level2, rotate: 'rotate-3', offset: 'mt-16' }
  ]

  return (
    <main className="min-h-screen flex items-center justify-center overflow-hidden relative">
      
      {/* Background blobs */}
      <div className="absolute w-[300px] h-[300px] bg-pink-300/30 rounded-full blur-3xl top-10 left-10"></div>
      <div className="absolute w-[250px] h-[250px] bg-yellow-300/30 rounded-full blur-3xl bottom-10 right-10"></div>

      <div className="relative flex gap-12 items-start">
        
        {/* Title (off-centered intentionally) */}
        <div className="absolute -top-20 left-0">
          <h1 className="text-4xl font-black tracking-tight text-[#2d2a32]">
            Find Them.
          </h1>
          <p className="text-sm text-gray-600 ml-1 rotate-[-2deg]">
            (if you can 👀)
          </p>
        </div>

        {/* Levels */}
        {levels.map((level, index) => (
          <Link
            to={`/game?level=${index + 1}`}
            key={index}
            className={`group relative ${level.offset}`}
          >
            {/* Card */}
            <div
              className={`
                ${level.rotate}
                bg-white p-3 rounded-[20px] shadow-[6px_6px_0px_rgba(0,0,0,0.15)]
                transition-all duration-300
                group-hover:rotate-0 group-hover:scale-105 group-hover:shadow-[10px_10px_0px_rgba(0,0,0,0.2)]
              `}
            >
              <img
                src={level.img}
                alt={level.name}
                className="w-[220px] h-[160px] object-cover rounded-[14px]"
              />

              <p className="mt-2 text-center font-bold text-[#333] tracking-wide">
                {level.name}
              </p>
            </div>

            {/* Scribble effect */}
            <div className="absolute -bottom-3 left-3 w-16 h-2 bg-black/20 rounded-full blur-sm"></div>
          </Link>
        ))}

        {/* Random floating element */}
        <div className="absolute -bottom-10 left-1/2 rotate-12 text-xs text-gray-500">
          Garfield
        </div>
      </div>
    </main>
  )
}

export default Home