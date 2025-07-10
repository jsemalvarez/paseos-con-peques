import { Presentations } from '../components/presetationSection/Presentations'
import { MapSection } from '../components/mapSection/MapSection'
import { CalendarSection } from '../components/CalendarSection'
import { SearchPlaces } from '../components/SearchPlaces'
import { PublicLayout } from '../../common/layouts/PublicLayout'
import { AboutAs } from '../components/AboutAs'
import { PlaceDetail } from '../../places/components/PlaceDetail'
import { FloatingWhatsAppButton } from '../../common/components/FloatingWhatsAppButton'
import { FloatingBotButton } from '../../common/components/FloatingBotButton'

// TODO: cambiar Home por HomePage
export const Home = () => {
  return (
    <PublicLayout>
        <Presentations />
        <MapSection />
        <CalendarSection />
        <SearchPlaces />
        <AboutAs />
        <PlaceDetail /> 
        {/* <FloatingBotButton /> */}
        <FloatingWhatsAppButton />
    </PublicLayout>
  )
}
