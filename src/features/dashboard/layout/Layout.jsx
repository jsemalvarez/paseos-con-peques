import React from 'react'

export const Layout = ({ children }) => {
  return (
    <div className='min-h-screen w-full bg-primary text-indigo-100'>
        {children}
    </div>
  )
}
