import React from 'react'

const DropDown = ({ xPosition, yPosition, characters }) => {
  return (
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
            {characters.map((character, index) => (
                <div
                    className="block px-4 py-2 text-sm text-gray-700 
                    hover:bg-gray-100 flex items-center gap-3 cursor-pointer"
                    role="menuitem"
                    key={index}
                >
                    <img src={character.Img} alt={character.name} width={35} />
                    <p className='text-base'>{character.name}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default DropDown