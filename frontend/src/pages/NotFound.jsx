import React from 'react'
import { Link } from 'react-router'


const NotFound = () => {
  return (
    <div className='flex flex-col items-center gap-5 h-100 justify-center'>
        <h1 className="text-6xl">404</h1>

        <h1 className="text-4xl">Page Not Found</h1>
        <Link to={"/"} className='border p-2 rounded bg-red-500 text-white'>Go back to home page</Link>
    </div>
  )
}

export default NotFound