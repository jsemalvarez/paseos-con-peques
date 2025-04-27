import React from 'react'
import { ImageSlider } from './ImageSlider'
import { CalendarIcon, LocationIcon, SearchIcon, WebIcon } from '../../places/components/Icons';

const presentationCards = [
  {
    text: "¿Tenés ganas de salir con los niños y no sabés a dónde ir?",
    icon: <LocationIcon style="w-10 h-10 text-pink-900" />,
  },
  {
    text: "¿Buscás planes para pasear con tus sobrinos?",
    icon: <CalendarIcon style="w-10 h-10 text-pink-900" />,
  },
  {
    text: "¿Querés encontrar ese lugar que todos están mencionando?",
    icon: <SearchIcon style="w-10 h-10 text-pink-900" />,
  },
];

export const Presentations = () => {
  return (
    <div id="presentation" className='min-h-screen pt-[100px] pb-16 flex flex-col items-center'>

      <ImageSlider />


      <h2 className="mt-6 text-4xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-indigo-500 to-indigo-100 drop-shadow-lg">
        Bienvenidos a
      </h2>
      <h1 className="text-4xl uppercase md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-indigo-500 to-indigo-100 drop-shadow-lg">
        Paseos con Peques
      </h1>

      <div className="flex flex-col items-center gap-6 px-4 py-8">
      {/* Tarjetas horizontales */}
      <div className="flex flex-wrap justify-center gap-6 w-full max-w-5xl">
        {presentationCards.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center bg-pink-200 text-pink-900 rounded-2xl shadow-md p-6 w-full sm:w-[300px]"
          >
            <div className="mb-4">{item.icon}</div>
            <p className="text-center text-base font-medium">{item.text}</p>
          </div>
        ))}
      </div>

      {/* Frase destacada */}
      <div className="mt-6 py-4 text-4xl font-bold text-center tracking-widest max-w-3xl w-full text-pink-200">
        Acá te podemos ayudar!!!
      </div>
    </div>


    </div>
  )
}
