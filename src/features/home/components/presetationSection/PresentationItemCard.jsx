import React from 'react'

export const PresentationItemCard = ({href, icon, text}) => {
  return (
    <a
      href={href}
      className="flex md:flex-col items-center justify-between bg-pink-200 text-pink-900 rounded-2xl shadow-md p-4 md:p-6 w-full sm:w-[300px]"
    >
      <div className="md:mb-4">{icon}</div>
      <p className="text-center text-base font-medium grow">{text}</p>
    </a>
  )
}
