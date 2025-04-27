import { CalendarIcon, ClockIcon, FacebookIcon, InstagramIcon, LocationIcon, VideoIcon, WebIcon, XMarkIcon } from "../../places/components/Icons"
import { usePlaces } from "../hooks/usePlaces"


export const PlaceDetail = () => {
    
    const { placeDetail , handleClosePlaceDetail, isPlaceDetailOpen } = usePlaces()

    const servicesToString = [
        placeDetail.hasGames && "Juegos",
        placeDetail.hasShow && "Show",
        placeDetail.hasFood && "Gastronomía",
        placeDetail.hasSupervision && "Profes a cargo"
      ].filter(Boolean).join(" / ");

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
    return ( 
        <aside 
            className={`${ isPlaceDetailOpen? 'flex' : 'hidden'} top-0 w-[360px] h-full flex-col fixed right-0 border-l-4 border-secondary bg-gray-100 text-primary z-50 transition-all z-1600`}
        >
            <div className="flex justify-between items-center px-6 py-1 mb-2">
                <h2 className="font-medium text-xl"></h2>
                <span
                    className='cursor-pointer text-gray-600 text-lg font-bold' 
                    onClick={ () => handleClosePlaceDetail() }
                ><XMarkIcon style='transition-all duration-300 hover:text-red-600' /></span>
            </div>

            <figure className="w-full mb-2">
                <img
                    src={placeDetail.photoUrl}
                    alt={placeDetail.name}
                    className="mx-auto object-cover w-[200px] h-[200px] rounded-full"
                />
            </figure>



            {/* Contenido scrollable */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-100 text-gray-700">
                <h2 className="text-purple-800 text-2xl font-extrabold">{placeDetail.name}</h2>
                <p className='font-bold text-gray-700 -mt-1'>{placeDetail.schedules}</p>
                <div className='-mt-1 text-gray-600 text-sm'>
                    <p>{servicesToString}</p>
                </div>
                {
                    placeDetail.phone && (
                        <>
                            <p className='mt-2 font-semibold text-gray-700'>
                                <span className='text-gray-500'>Telefono: </span>
                                {placeDetail.phone}
                            </p>
                            {
                                isMobile && (
                                    <a
                                        className='block p-1 flex justify-center bg-indigo-800 text-white rounded-full' 
                                        href={`tel:+54223${placeDetail.phone}`}
                                    >Llamar</a>
                                )
                            }
                        </>
                    )
                }
                {
                    placeDetail.whatsapp &&  (
                        <>
                            <p className='mt-2 font-semibold text-gray-700'>
                                <span className='text-gray-500'>Whatsapp: </span>
                                {placeDetail.whatsapp}
                            </p>
                            <a
                                target="_blank"
                                className='block p-1 flex justify-center bg-green-700 text-white rounded-full transition-all duration-300 hover:bg-green-600' 
                                href={`https://wa.me/${placeDetail.whatsapp}`                                
                            }>ir a Whatsapp</a>
                        </>
                    )
                }
                {
                    placeDetail.address && (
                        <>
                            <p className='mt-2 font-semibold text-gray-700'>
                                <span className='text-gray-500'>Direccion: </span>
                                {placeDetail.address}
                            </p>
                            <a
                                target="_blank"
                                className='block p-1 flex justify-center bg-blue-600 text-white rounded-full transition-all duration-300 hover:bg-blue-500' 
                                href={`https://www.google.com/maps?q=${placeDetail.position.lat},${placeDetail.position.lng}`
                            }>ver en mapa</a>
                        </>
                    )
                }

                <div className='mt-2 flex justify-center items-center gap-6'>
                    {
                        placeDetail.web && (
                            <a href={placeDetail.web} target='_blank'>
                                <WebIcon />
                            </a>
                        )                    
                    }
                    {
                        placeDetail.instagram && (
                            <a href={placeDetail.instagram} target='_blank'>
                                <InstagramIcon />
                            </a>
                        )                    
                    }
                    {
                        placeDetail.facebook && (
                            <a href={placeDetail.facebook} target='_blank'>
                                <FacebookIcon />
                            </a>
                        )                    
                    }
                    {
                        placeDetail.videoLink && (
                            <a href={placeDetail.videoLink} target='_blank'>
                                <VideoIcon />
                            </a>
                        )                    
                    }
                </div>

                <p className="text-sm text-gray-600 whitespace-pre-line mt-2">{placeDetail.description}</p>
            </div>


        </aside>
    )
}
