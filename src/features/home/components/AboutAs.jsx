import React from 'react'
import { CloudinaryImage } from '../../common/components/CloudinaryImage'

export const AboutAs = () => {
  return (
    <div  className='min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 p-6 md:p-12'>
      
      <div className="w-full max-w-[600px] h-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4 tracking-wide flex flex-col justify-center items-center">
          ¿Quiénes somos?
        </h2>
        <div className="text-lg text-indigo-100 leading-relaxed">
          <p>Somos una familia de Mar del Plata a la que le encanta salir, descubrir nuevos lugares y compartir momentos juntos.</p>
          <p>Nos dimos cuenta de que esta ciudad tiene propuestas para disfrutar con los más peques, pero muchas veces no están tan visibles.</p>
          <p>Por eso, creamos este espacio: para ayudar a encontrar planes, actividades y lugares pensados para las familias.</p>
          <p>Este es nuestro hobby. Lo hacemos con mucho amor y en nuestro tiempo libre.</p>
        </div>
      </div>

      <div className="w-full md:w-1/2 max-w-[600px]">
        <CloudinaryImage
          publicId="pcp_famila_mnh0rq.webp"
          alt="Familia disfrutando de una salida" 
          className="w-full h-auto rounded-2xl shadow-lg" 
        />
      </div>
    </div>
  )
}
