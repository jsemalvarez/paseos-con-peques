import { useEffect, useState } from "react";

const images = [
    {
      src: "https://scontent.fmdq7-1.fna.fbcdn.net/v/t39.30808-6/485381060_1020304490145616_6401803020984154846_n.png?_nc_cat=104&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=GX9R0hYScLYQ7kNvwFup8b1&_nc_oc=Adkpp1L6QDEr0bxnXTv1ioCivkG3N_jSSoGxkR_yke7LZ9lfiPUlJoN89C46r0S9gSc&_nc_zt=23&_nc_ht=scontent.fmdq7-1.fna&_nc_gid=_PtImm6X2B1TkEz8qv-QEw&oh=00_AfGCLrh1VptO-OZlwZRnxFTOFtQv3-qb8p--fmS73V_t4w&oe=67FDE290",
      title: "Circo La Audacia",
      subTitle: "Funciones todos los domingos",
    },
    {
      src: "https://scontent.fmdq7-1.fna.fbcdn.net/v/t39.30808-6/489927137_122150227682485886_3014562694252326727_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=f727a1&_nc_ohc=hx-sehpxO3EQ7kNvwFxg0lK&_nc_oc=AdkZ1RHlcrcHPk06-Uspxu-4_OEbrCchKNfXFLCEpeM0xNECPOTv-WPynD05RtEQWRI&_nc_zt=23&_nc_ht=scontent.fmdq7-1.fna&_nc_gid=1Pj1NNrf0w45_eLPvzM4Wg&oh=00_AfFwdBqQ288mwFmIUqAY0mXh1fCnznEB8c90035xhK02XA&oe=6804C466",
      title: "Circo HAZME REIR",
      subTitle: "Plaza del agua",
    },
    {
      src: "https://scontent.fmdq7-1.fna.fbcdn.net/v/t1.6435-9/34035703_1871010846289007_180890519130341376_n.jpg?_nc_cat=103&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=HwyY53jUVOoQ7kNvwHLneCg&_nc_oc=AdmllisMPUKrvSfbUDuqp403s-TB5zwu0tCwHMin5C9Kz0qdIpWcABrNadSozn72FvQ&_nc_zt=23&_nc_ht=scontent.fmdq7-1.fna&_nc_gid=pt3agZsfdtSPEwqNooTZQA&oh=00_AfF29Xmg3oZG4INncOIa52x12AGwhf8RMui1AW9DoaF5eQ&oe=681F6A2B",
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
    <div className="w-9/10 max-w-[1200px] h-64 overflow-hidden relative rounded-lg shadow-md">
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