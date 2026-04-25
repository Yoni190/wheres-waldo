import React from 'react'

const Footer = () => {
  return (
    <footer className='flex justify-center p-7 border-t'>
        <p>© {new Date().getFullYear()} Where's Waldo. All rights reserved.</p>
    </footer>
  )
}

export default Footer