import React from 'react'
import { Link } from 'react-router'


const Home = () => {
  return (
    <main className='flex items-center justify-center h-100'>
        <Link className='border rounded p-2 bg-blue-500 text-white '>Play Now</Link>
    </main>
  )
}

export default Home