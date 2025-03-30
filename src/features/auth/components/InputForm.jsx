import React from 'react'

export const InputForm = ({title, name, type, style, value, onChange}) => {
    const defaultStyle = 'w-full border border-gray-400 hover:border-secondary focus:border-secondary p-2 rounded-xl focus:bg-secondary focus:outline-none'
  return (
    <div className='mt-2'>
        <span className='text-gray-400'>{title}</span>
        <input 
            className={`${defaultStyle} ${style ? style : ''}`}
            type={type}
            name={name} 
            value={value}
            onChange={onChange}
        />
    </div>
  )
}
