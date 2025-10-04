import { useEffect, useState } from "react";
import { CloudinaryImage } from "../../../common/components/CloudinaryImage";

const images = [
    {
      src: "banner_techno_kids_avartt.webp",
      title: "Techno Kids",
      subTitle: "Primera fiesta electrónica para niños y familias",
    },
    {
      src: "banner_la_audacia_iagg08.webp", 
      title: "Circo La Audacia",
      subTitle: "",
    },
    // {
    //   src: "banner_hazme_reir_lrdzhz.webp",
    //   title: "Circo HAZME REIR",
    //   subTitle: "Plaza del agua",
    // },
    {
      src: "banner_las_dos_marias_tvrbmm.webp",
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
    <div className="w-9/10 max-w-[1200px] aspect-[7/4] sm:aspect-[8/4] md:aspect-[9/3] overflow-hidden relative rounded-lg shadow-md">
      {images.map((img, index) => (
        <div
          key={index}
          className={`w-full h-full absolute top-0 left-0 transition-opacity duration-1000 ${ index === current ? "opacity-100 z-10" : "opacity-0 z-0" }`}
        >
        <CloudinaryImage
            publicId={img.src}
            alt={`Banner ${index + 1}`} 
            className="w-full h-full object-cover"
        />
        <div className="absolute bottom-3 sm:bottom-6 left-3 sm:left-6 bg-primary px-6 py-1 rounded-md shadow-lg">
          <h3 className="text-lg text-secondary font-semibold">{img.title}</h3>
          <p className="hidden sm:block -mt-2 font-light">{img.subTitle}</p>
        </div>
      </div>
      ))}
    </div>
  )
}