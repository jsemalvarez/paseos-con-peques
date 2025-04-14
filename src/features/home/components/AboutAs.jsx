import React from 'react'

export const AboutAs = () => {
  return (
    <div  className='min-h-screen flex flex-col md:flex-row items-center justify-center gap-8 p-6 md:p-12'>
      
      <div className="w-full max-w-[600px] h-full md:w-1/2">
        <h2 className="text-3xl md:text-4xl font-bold text-pink-600 mb-4 tracking-wide flex flex-col justify-center items-center">
          ¿Quiénes somos?
        </h2>
        <div className="text-lg text-pink-200 leading-relaxed">
          <p>Somos una familia de Mar del Plata a la que le encanta salir, descubrir nuevos lugares y compartir momentos juntos.</p>
          <p>Nos dimos cuenta de que esta ciudad tiene propuestas para disfrutar con los más peques, pero muchas veces no están tan visibles.</p>
          <p>Por eso, creamos este espacio: para ayudar a encontrar planes, actividades y lugares pensados para las familias.</p>
          <p>Este es nuestro hobby. Lo hacemos con mucho amor y en nuestro tiempo libre.</p>
        </div>
      </div>

      <div className="w-full md:w-1/2 max-w-[600px]">
        <img 
          src="https://scontent.fmdq7-1.fna.fbcdn.net/v/t51.75761-15/488579906_17886573183246857_8034194247477906525_n.jpg?stp=dst-jpg_tt6&_nc_cat=102&ccb=1-7&_nc_sid=127cfc&_nc_ohc=070lNfl48zYQ7kNvwENvx4o&_nc_oc=AdlqT5DdEcvIC-uoY6YZl7Jk7vHCoZELB1D9kYI8uTMdrVmbU93ZRoRzgMe8iK7sjKY&_nc_zt=23&_nc_ht=scontent.fmdq7-1.fna&_nc_gid=4wF17GMH6sxfRhlXRzCBVQ&oh=00_AfEYjWrvBuW-WGlGlCWU66cfukNcQVfE1DkQF5zIzcrObg&oe=67FE2C78" 
          alt="Familia disfrutando de una salida" 
          className="w-full h-auto rounded-2xl shadow-lg"
        />
      </div>
    </div>
  )
}
