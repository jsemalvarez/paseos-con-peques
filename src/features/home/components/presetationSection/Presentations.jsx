import { useEffect, useState } from 'react'
import { ImageSlider } from './ImageSlider'
import { useIsMobile } from '../../../common/hooks/useIsMobile';
import { PresentationCards } from './PresentationCards';
import { MobileInstallPrompt } from './MobileInstallPrompt';


export const Presentations = () => {

  const [deferredPrompt, setDeferredPrompt] = useState(null)

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handler)
    return () => window.removeEventListener('beforeinstallprompt', handler)
  }, [])

  const handleInstallClick = () => {
    if (deferredPrompt) {
      deferredPrompt.prompt()
    }
  }

  const isMobile = useIsMobile();

  return (
    <div id="presentation" className='min-h-screen pt-[100px] pb-16 flex flex-col items-center'>

      <ImageSlider />


      <h2 className="mt-6 text-4xl md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-indigo-500 to-indigo-100 drop-shadow-lg">
        Bienvenidos a
      </h2>
      <h1 className="text-4xl uppercase md:text-6xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-indigo-500 to-indigo-100 drop-shadow-lg">
        Paseos con Peques
      </h1>

      <PresentationCards />

      <div className="py-4 text-4xl font-bold text-center tracking-widest max-w-3xl w-full text-sky-200">
        Acá te podemos ayudar!!!
      </div>

      {
        (deferredPrompt && isMobile) && (
          <MobileInstallPrompt
            handleInstallClick={handleInstallClick}
            deferredPrompt={deferredPrompt}
          />
        )
      }


    </div>
  )
}
