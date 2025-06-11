import { CallButton } from "../../common/components/buttons/CallButton";
import { ViewOnMapButton } from "../../common/components/buttons/ViewOnMapButton";
import { WhatsappButton } from "../../common/components/buttons/WhatsappButton";
import { useIsMobile } from "../../common/hooks/useIsMobile";
import { FacebookIcon, InstagramIcon, VideoIcon, WebIcon, XMarkIcon } from "../../common/components/Icons"
import { usePlaces } from "../hooks/usePlaces"
import { CloudinaryImage } from "../../common/components/CloudinaryImage";

const DAFEAUL_PLACE_PHOTO_URL = 'https://res.cloudinary.com/dwhdla1b4/image/upload/v1744900287/pcp-images/home_logo.png';

export const PlaceDetail = () => {
    
    const { placeDetail , handleClosePlaceDetail, isPlaceDetailOpen } = usePlaces()

    const servicesToString = [
        placeDetail.hasGames && "Juegos",
        placeDetail.hasShow && "Show",
        placeDetail.hasFood && "Gastronomía",
        placeDetail.hasSupervision && "Profes a cargo"
      ].filter(Boolean).join(" / ");

    const isMobile = useIsMobile();
  
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
                <CloudinaryImage
                    publicId={ placeDetail?.photoUrl }
                    alt={ placeDetail?.name } 
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
                                    <CallButton phone={placeDetail.phone} />
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
                            <WhatsappButton whatsapp={ placeDetail.whatsapp } />
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
                            <ViewOnMapButton position={ placeDetail.position } />
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
