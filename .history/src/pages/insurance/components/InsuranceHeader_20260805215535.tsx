import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, MapPin, Plus, Search, Bot, X } from 'lucide-react'

const governorates = [
  'الرياض',
  'جدة',
  'مكة المكرمة',
  'المدينة المنورة',
  'الدمام',
  'الخبر',
  'الظهران',
  'الأحساء',
  'الجبيل',
  'الطائف',
  'تبوك',
  'بريدة',
  'عنيزة',
  'أبها',
  'خميس مشيط',
  'جازان',
  'نجران',
  'الباحة',
  'حائل',
  'عرعر',
  'سكاكا',
  'القطيف',
  'حفر الباطن',
  'الخرج',
  'ينبع',
  'الليث',
  'المجمعة',
  'الزلفي',
  'الدوادمي',
  'بيشة',
]

type InsuranceHeaderProps = {
  selectedRegion: string | null
  onRegionChange: (region: string | null) => void
  searchQuery: string
  onSearchChange: (query: string) => void
  resultsCount: number
}

const InsuranceHeader = ({
  selectedRegion,
  onRegionChange,
  searchQuery,
  onSearchChange,
  resultsCount,
}: InsuranceHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!isOpen) return

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen])

  const handleSelect = (region: string | null) => {
    onRegionChange(region)
    setIsOpen(false)
  }

  const hasActiveFilter = Boolean(selectedRegion || searchQuery)

  return (
    <div className="relative z-[100] flex flex-col gap-4 rounded-[24px] border border-white/10 bg-white/5 p-4 shadow-xl shadow-black/20 backdrop-blur-sm md:flex-row md:items-center md:justify-between">
      <button className="flex items-center justify-center gap-2 rounded-full border border-white/30 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10 active:scale-95">
        <Plus size={18} />
        تعاقد جديد
      </button>

      <div className="flex flex-col gap-3 md:flex-row md:items-center">

<button className="relative flex items-center justify-center rounded-full border border-white/20 bg-white/10 py-2 pl-5 pr-10 text-sm font-medium text-[#38C2DD] transition hover:bg-white/20 active:scale-95">
  <div className="absolute -right-2 -top-1.5 flex h-9 w-9 items-center justify-center rounded-full border border-white/30 bg-[#07292C] text-white shadow-lg">
    <Bot size={20} />
  </div>

  <span>الموافقة بالذكاء الاصطناعي</span>
</button>
        <label className="flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2 text-sm text-white/80 focus-within:border-emerald-500/50">
          <Search size={16} className="shrink-0 text-white/60" />
          <input
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            aria-label="بحث عن مريض"
            className="w-full min-w-[180px] bg-transparent text-right outline-none placeholder:text-white/50"
            placeholder="بحث عن مريض"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              aria-label="مسح البحث"
              className="shrink-0 rounded-full p-0.5 text-white/60 transition hover:bg-white/10 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
        </label>

        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className={`flex items-center justify-center gap-2 rounded-full border px-4 py-2 text-sm font-medium text-white transition ${
              selectedRegion
                ? 'border-emerald-400/50 bg-emerald-500/20 hover:bg-emerald-500/30'
                : 'border-white/20 bg-white/10 hover:bg-white/20'
            }`}
            aria-haspopup="listbox"
            aria-expanded={isOpen}
          >
            <MapPin size={16} className={selectedRegion ? 'text--400' : 'text-white/70'} />
            {selectedRegion ?? 'اختر المنطقة'}
            <ChevronDown
              size={16}
              className={`text-white/70 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {isOpen && (
            <div
              role="listbox"
              aria-label="اختر المنطقة"
              className="absolute left-0 top-full z-[200] mt-2 max-h-72 w-60 origin-top overflow-y-auto rounded-2xl border border-emerald-500/30 bg-[#062427] p-2 shadow-2xl shadow-black/50 backdrop-blur-xl [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-emerald-500/60 hover:[&::-webkit-scrollbar-thumb]:bg-emerald-400 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-black/20 [&::-webkit-scrollbar]:w-1.5"
            >
              <button
                type="button"
                role="option"
                aria-selected={!selectedRegion}
                onClick={() => handleSelect(null)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-right text-sm transition ${
                  !selectedRegion
                    ? 'bg-emerald-500/25 font-semibold text-emerald-300'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <MapPin size={14} className={!selectedRegion ? 'text-emerald-400' : 'text-white/40'} />
                  كل المناطق
                </span>
                {!selectedRegion && <Check size={16} className="text-emerald-400" />}
              </button>

              <div className="my-1.5 border-t border-white/10" />

              {governorates.map((region) => {
                const isSelected = selectedRegion === region

                return (
                  <button
                    key={region}
                    type="button"
                    role="option"
                    aria-selected={isSelected}
                    onClick={() => handleSelect(region)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-right text-sm transition ${
                      isSelected
                        ? 'bg-emerald-500/25 font-semibold text-emerald-300'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <MapPin size={14} className={isSelected ? 'text-emerald-400' : 'text-white/40'} />
                      {region}
                    </span>
                    {isSelected && <Check size={16} className="text-emerald-400" />}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {hasActiveFilter && (
          <span className="flex items-center justify-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-2 text-xs font-semibold text-emerald-200">
            النتائج: {resultsCount}
          </span>
        )}
      </div>
    </div>
  )
}

export default InsuranceHeader