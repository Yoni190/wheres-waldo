import React from 'react'
import Waldo from '../assets/waldo.png'
import { Link } from 'react-router'

const Header = () => {
  return (
    <header className='p-5'>
        <Link to={'/'} className='flex items-center justify-center gap-5'>
            <img src={Waldo} alt="waldo" width={100}/>
            <h1 className='text-4xl font-semibold'><span className='text-red-500'>Where's</span> <span className='text-blue-500'>Waldo?</span></h1>
        </Link>
    </header>
  )
}

export default Header