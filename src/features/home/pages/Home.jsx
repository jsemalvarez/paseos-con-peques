import React from 'react'
import { Navbar } from '../../common/components/Navbar'
import { Presentations } from '../components/Presentations'
import { MapSection } from '../components/MapSection'
import { CalendarSection } from '../components/CalendarSection'
import { SearchPlaces } from '../components/SearchPlaces'
import { Contact } from '../components/Contact'
import { Layout } from '../layout/Layout'

// TODO: cambiar Home por HomePage
export const Home = () => {
  return (
    <Layout>
        <Navbar />
        <Presentations />
        <MapSection />
        <CalendarSection />
        <SearchPlaces />
        <Contact />
    </Layout>
  )
}
