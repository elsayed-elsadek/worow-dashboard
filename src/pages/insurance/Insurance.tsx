import { useState } from 'react'
import { themes } from '../../themes'
import Pagination from '../../components/Pagination'
import InsuranceHeader from './components/InsuranceHeader'
import InsurancePatient from './components/InsurancePatient'
import InsuranceSidebar from './components/InsuranceSidebar'
import patientData from './staticData/patientData.json'

type PatientRecord = {
  id: number
  name: string
  age: string
  city: string
  idNumber: string
  visitLabel: string
  appointmentDate: string
  isAlert?: boolean
}

type InsurancePatientData = {
  patients: PatientRecord[]
  alertPatient: PatientRecord
}

const Insurance = () => {
  const theme = themes.insurance

  const [selectedRegion, setSelectedRegion] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const { patients: allPatients, alertPatient } = patientData as InsurancePatientData

  const normalizedQuery = searchQuery.trim().toLowerCase()

  const filteredPatients = allPatients.filter((patient) => {
    const matchesRegion = !selectedRegion || patient.city === selectedRegion
    const matchesSearch =
      !normalizedQuery ||
      patient.name.toLowerCase().includes(normalizedQuery) ||
      patient.idNumber.toLowerCase().includes(normalizedQuery) ||
      patient.city.toLowerCase().includes(normalizedQuery)

    return matchesRegion && matchesSearch
  })

  const showAlertPatient =
    !selectedRegion &&
    !normalizedQuery

  const itemsPerPage = 10
  const totalPages = Math.max(1, Math.ceil(filteredPatients.length / itemsPerPage))
  const safePage = Math.min(currentPage, totalPages)

  const paginatedPatients = filteredPatients.slice(
    (safePage - 1) * itemsPerPage,
    safePage * itemsPerPage
  )

  const handleRegionChange = (region: string | null) => {
    setSelectedRegion(region)
    setCurrentPage(1)
  }

  const handleSearchChange = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  return (
    <div
      className="min-h-screen text-white"
      dir="rtl"
      style={{
        background: theme.mainColor,
        fontFamily: 'Cairo, Tajawal, "IBM Plex Sans Arabic", sans-serif',
      }}
    >
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-4 lg:flex-row lg:px-6 lg:py-6">
        <InsuranceSidebar />

        <div className="min-w-0 flex-1">
          <InsuranceHeader
            selectedRegion={selectedRegion}
            onRegionChange={handleRegionChange}
            searchQuery={searchQuery}
            onSearchChange={handleSearchChange}
            resultsCount={filteredPatients.length}
          />

          <section className="mt-6 space-y-4">
            {filteredPatients.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-3 rounded-[20px] border border-white/10 bg-white/[0.04] px-4 py-14 text-center">
                <SearchIcon />
                <p className="text-lg font-semibold text-white">لا توجد نتائج مطابقة</p>
                <p className="text-sm text-white/60">
                  {selectedRegion
                    ? `لا يوجد مرضى في منطقة ${selectedRegion}`
                    : 'لم يتم العثور على مرضى مطابقين لبحثك'}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRegion(null)
                    setSearchQuery('')
                    setCurrentPage(1)
                  }}
                  className="mt-2 rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-600"
                >
                  مسح الفلاتر
                </button>
              </div>
            ) : (
              <>
                {showAlertPatient && safePage === 1 && <InsurancePatient patient={alertPatient} />}
                {paginatedPatients.map((patient) => (
                  <InsurancePatient key={patient.id} patient={patient} />
                ))}
              </>
            )}
          </section>

          {filteredPatients.length > 0 && (
            <Pagination
              totalItems={filteredPatients.length}
              itemsPerPage={itemsPerPage}
              currentPage={safePage}
              onPageChange={setCurrentPage}
            />
          )}
        </div>
      </div>
    </div>
  )
}

const SearchIcon = () => (
  <div className="flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5">
    <svg
      className="h-7 w-7 text-white/40"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-4.35-4.35M17 10.5a6.5 6.5 0 11-13 0 6.5 6.5 0 0113 0z"
      />
    </svg>
  </div>
)

export default Insurance

