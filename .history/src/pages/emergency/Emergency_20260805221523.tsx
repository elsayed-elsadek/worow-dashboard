import { useState } from 'react'
import Navbar from '../../components/Navbar'
import { themes } from '../../themes'
import EmergencyDetails from './components/EmergencyDetails'
import EmergencyHeader from './components/EmergencyHeader'
import EmergencyMap, { initialEmergencyFilters, type EmergencyFilterKey, type EmergencyFilterState } from './components/EmergencyMap'
import EmergencyReports from './components/EmergencyReports'
import Header from './components/MapHeader'

const Emergency = () => {
  const [activeFilters, setActiveFilters] = useState<EmergencyFilterState>(initialEmergencyFilters)
  const theme = themes.emergency

  const toggleFilter = (key: EmergencyFilterKey) => {
    setActiveFilters(current => ({ ...current, [key]: !current[key] }))
  }

  return (
    <div className="min-h-screen text-white" dir="ltr"
      style={{ background: theme.mainColor }}
    >
      <div className="px-3 py-4 sm:px-6 lg:px-8">
        <Navbar />
        <EmergencyHeader/>
        <main className="mx-auto max-w-7xl">
          <div className="grid gap-6 xl:grid-cols-[340px_minmax(0,1fr)_330px]">

            <EmergencyDetails theme={theme} />

            <section className="flex flex-col gap-4 rounded-4xl"
            style={{ background: theme.secondary }}
            >

              <Header theme={theme} activeFilters={activeFilters} onToggleFilter={toggleFilter} />

              <EmergencyMap theme={theme} activeFilters={activeFilters} />

            </section>

            <EmergencyReports />
          </div>
        </main>
      </div>
    </div>
  )
}

export default Emergency
