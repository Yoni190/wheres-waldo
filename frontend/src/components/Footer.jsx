import React from 'react'

const Footer = () => {
  return (
    <footer className='flex justify-center fixed bottom-0 left-0 w-full p-7 border-t'>
        <p>© {new Date().getFullYear()} Where's Waldo. All rights reserved.</p>
    </footer>
  )
}

export default Footer