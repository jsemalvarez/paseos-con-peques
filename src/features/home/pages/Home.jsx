import React from 'react'
import { Presentations } from '../components/Presentations'
import { MapSection } from '../components/MapSection'
import { CalendarSection } from '../components/CalendarSection'
import { SearchPlaces } from '../components/SearchPlaces'
import { PublicLayout } from '../../common/layouts/PublicLayout'
import { AboutAs } from '../components/AboutAs'
import { PlaceDetail } from '../../places/components/PlaceDetail'

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
    </PublicLayout>
  )
}
