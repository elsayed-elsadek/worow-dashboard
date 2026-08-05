import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Filter, RefreshCw } from 'lucide-react'
import type { Theme } from '../../../themes'
import FilterModal from '../../../components/FilterModal'
import type { EmergencyFilterKey, EmergencyFilterState } from './EmergencyMap'

interface HeaderProps {
  theme: Theme
  activeFilters: EmergencyFilterState
  onToggleFilter: (key: EmergencyFilterKey) => void
}

const Header = ({ theme, activeFilters, onToggleFilter }: HeaderProps) => {
  const { t } = useTranslation()
  const [filterOpen, setFilterOpen] = useState(false)
  const theme = themes.emergency

  return (
    <div className="relative rounded-[24px] border border-white/10 px-4 py-4 shadow-lg shadow-black/20"
    atyle={{ background: theme.sec }}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <button
              type="button"
              onClick={() => setFilterOpen((prev) => !prev)}
              className="flex cursor-pointer items-center gap-2 rounded-full border border-white/10 px-3 py-2 text-sm font-medium text-white transition hover:bg-white/10"
            >
              <Filter size={16} />
              {t('emergency.filters')}
            </button>
            <FilterModal
              open={filterOpen}
              onClose={() => setFilterOpen(false)}
              activeFilters={activeFilters}
              onToggleFilter={onToggleFilter}
            />
          </div>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="flex items-center cursor-pointer gap-2 rounded-full px-3 py-2 text-sm font-medium text-white transition hover:opacity-90"
            style={{ background: theme.mainColor }}
          >
            <RefreshCw size={16} />
            {t('emergency.refresh')}
          </button>
        </div>

        <div className="text-right">
          <h2 className="text-lg font-semibold text-white">{t('emergency.mapHeaderTitle')}</h2>
        </div>
      </div>
    </div>
  )
}

export default Header
