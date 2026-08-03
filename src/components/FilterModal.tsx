import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import type { EmergencyFilterKey, EmergencyFilterState } from '../pages/emergency/components/EmergencyMap'

interface FilterModalProps {
  open: boolean
  onClose: () => void
  activeFilters: EmergencyFilterState
  onToggleFilter: (key: EmergencyFilterKey) => void
}

const FilterModal = ({ open, onClose, activeFilters, onToggleFilter }: FilterModalProps) => {
  const { t } = useTranslation()
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  const options: Array<{ key: EmergencyFilterKey; label: string; dotClassName: string }> = [
    { key: 'high', label: t('emergency.mapLegendHigh'), dotClassName: 'bg-[#d32f2f]' },
    { key: 'medium', label: t('emergency.mapLegendMedium'), dotClassName: 'bg-[#fbc02d]' },
    { key: 'low', label: t('emergency.mapLegendLow'), dotClassName: 'bg-[#388e3c]' },
    { key: 'hospital', label: t('emergency.mapLegendHospital'), dotClassName: 'text-[#1e88e5]' },
  ]

  return (
    <>
      <div className="fixed inset-0 z-40 bg-transparent" onClick={onClose} aria-hidden="true" />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        onClick={(event) => event.stopPropagation()}
        className="absolute left-0 top-full z-50 mt-2 w-[260px] rounded-2xl border border-white/10 bg-[#1f0f13]/95 p-3 text-white shadow-2xl shadow-black/30 backdrop-blur"
      >
        <div className="mb-2 flex items-center justify-between">
          <p className="text-sm font-semibold">{t('emergency.filters')}</p>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full px-2 py-1 text-xs text-white/60 transition hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        <div className="space-y-2">
          {options.map((option) => {
            const isActive = activeFilters[option.key]

            return (
              <button
                key={option.key}
                type="button"
                onClick={() => onToggleFilter(option.key)}
                className={`flex w-full items-center justify-between rounded-xl border px-3 py-2 text-sm transition ${isActive ? 'border-white/30 bg-white/15 text-white' : 'border-white/10 bg-transparent text-[#e0d3d4] hover:bg-white/10'}`}
              >
                <span className="flex items-center gap-2">
                  {option.key === 'hospital' ? (
                    <span className={`text-sm ${isActive ? 'text-[#7ec0ff]' : 'text-[#1e88e5]'}`}>✚</span>
                  ) : (
                    <span className={`h-2.5 w-2.5 rounded-full ${option.dotClassName}`} />
                  )}
                  <span>{option.label}</span>
                </span>
                <span className={`text-xs ${isActive ? 'text-[#7ec0ff]' : 'text-white/40'}`}>
                  {isActive ? 'ON' : 'OFF'}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default FilterModal
