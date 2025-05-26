import { useEffect, useState } from "react";

const images = [
    {
      src: "https://res.cloudinary.com/dwhdla1b4/image/upload/q_auto,f_auto/v1744894758/pcp-images/banner_la_audacia_fah5yv.png",
      title: "Circo La Audacia",
      subTitle: "Funciones todos los domingos",
    },
    {
      src: "https://res.cloudinary.com/dwhdla1b4/image/upload/q_auto,f_auto/v1744856282/pcp-images/banner_hazme_reir_rilvtd.jpg",
      title: "Circo HAZME REIR",
      subTitle: "Plaza del agua",
    },
    {
      src: "https://res.cloudinary.com/dwhdla1b4/image/upload/q_auto,f_auto/v1744894758/pcp-images/banner_las_dos_marias_dcyis4.jpg",
      title: "Granja Las Dos Marias",
      subTitle: "Granja educativa. Paseo rural",
    },
  ]

export const ImageSlider = () => {
  const [current, setCurrent] = useState(0)

  useEffect(() => {

    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length)
    }, 4000) // cambia cada 4 segundos

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="w-9/10 max-w-[1200px] aspect-[10/4] md:aspect-[9/3] overflow-hidden relative rounded-lg shadow-md">
      {images.map((img, index) => (
        <div
          key={index}
          className={`w-full h-full absolute top-0 left-0 transition-opacity duration-1000 ${ index === current ? "opacity-100 z-10" : "opacity-0 z-0" }`}
        >
        <img
          src={img.src}
          alt={`Banner ${index + 1}`}
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-6 left-6 bg-primary px-6 py-1 rounded-md shadow-lg">
          <h3 className="text-lg text-secondary font-semibold">{img.title}</h3>
          <p className="-mt-2 font-light">{img.subTitle}</p>
        </div>
      </div>
      ))}
    </div>
  )
}