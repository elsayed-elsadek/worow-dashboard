import { useEffect, useRef, useState } from 'react'
import { Check, ChevronDown, MapPin, Plus, Search, Bot, X, Stethoscope } from 'lucide-react'
import { GOVERNORATES } from '../staticData/governorates'

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
    <div
      dir="rtl"
      className="relative z-[100] flex w-full flex-col gap-3 rounded-3xl border gradient-border bg-[#FFFFFF]/10 p-3.5 shadow-2xl backdrop-blur-md lg:flex-row lg:items-center lg:justify-between lg:px-6 lg:py-3"
    >
      {/* 1. عناصر الجهة اليمنى */}
      <div className="flex flex-wrap items-center gap-3 ins-header lg:gap-5">
        {/* القائمة المنسدلة لاختيار المنطقة */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-haspopup="listbox"
            onClick={() => setIsOpen((prev) => !prev)}
            className="flex items-center gap-3 px-2 py-1 text-right transition active:scale-95"
          >
            <div className="flex flex-col items-start">
              <span className="text-[15px] text-white">اختر منطقة</span>
              <span className="flex items-center gap-1.5 text-sm text-[#38C2DD]">
                <Stethoscope size={18} className="text-[#2dd4bf]" />
                {selectedRegion ?? 'اختر المنطقة'}
              </span>
            </div>
            <ChevronDown
              size={16}
              className={`text-white/80 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* قائمة خيارات المناطق */}
          {isOpen && (
            <div
              role="listbox"
              aria-label="اختر المنطقة"
              className="absolute right-0 top-full z-[200] mt-3 max-h-72 w-56 origin-top-right overflow-y-auto rounded-2xl border border-cyan-500/30 bg-[#062427] p-2 shadow-2xl backdrop-blur-xl [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-cyan-500/60 hover:[&::-webkit-scrollbar-thumb]:bg-cyan-400 [&::-webkit-scrollbar-track]:rounded-full [&::-webkit-scrollbar-track]:bg-black/20 [&::-webkit-scrollbar]:w-1.5"
            >
              <button
                type="button"
                role="option"
                aria-selected={!selectedRegion}
                onClick={() => handleSelect(null)}
                className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-right text-sm transition ${
                  !selectedRegion
                    ? 'bg-cyan-500/25 font-semibold text-cyan-300'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="flex items-center gap-2">
                  <MapPin size={14} className={!selectedRegion ? 'text-cyan-400' : 'text-white/40'} />
                  كل المناطق
                </span>
                {!selectedRegion && <Check size={16} className="text-cyan-400" />}
              </button>

              <div className="my-1.5 border-t border-white/10" />

              {GOVERNORATES.map((region) => {
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
                        ? 'bg-cyan-500/25 font-semibold text-cyan-300'
                        : 'text-white/80 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <MapPin size={14} className={isSelected ? 'text-cyan-400' : 'text-white/40'} />
                      {region}
                    </span>
                    {isSelected && <Check size={16} className="text-cyan-400" />}
                  </button>
                )
              })}
            </div>
          )}
        </div>

        {/* [شاشات كبيرة فقط] حقل البحث الأصلي في مكانه الأيمن */}
        <div className="hidden gradient-border lg:ml-5 lg:flex lg:items-center lg:rounded-full lg:bg-white/10 lg:py-1 lg:pl-3 lg:pr-1.5 lg:focus-within:border-cyan-400/50">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="بحث عن مريض"
            className="w-28 bg-transparent px-2.5 text-right text-sm text-white placeholder-white placeholder:font-bold outline-none md:w-28"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="rounded-full p-0.5 text-white/60 hover:text-white"
            >
              <X size={14} />
            </button>
          )}
          <div className="flex h-7 w-7 items-center justify-center rounded-full gradient-border bg-[#0E8787]/10 text-white/80">
            <Search size={14} />
          </div>
        </div>

        <button
          type="button"
          className="flex items-center justify-between gap-2 rounded-full gradient-border bg-white/10 px-4 py-1.5 font-bold text-white transition hover:bg-white/20 active:scale-95 lg:hidden"
        >
          <Plus size={20} />
          <span>تعاقد جديد</span>
        </button>

        {/* زر الموافقة بالذكاء الاصطناعي */}
        <button
          type="button"
          className="relative flex items-center justify-center rounded-full gradient-border bg-white/10 p-2 pl-5 text-sm font-bold text-[#38C2DD] transition hover:bg-white/20 active:scale-95 md:py-0"
        >
<div className="absolute -right-4 -top-3 hidden h-9 w-9 items-center justify-center rounded-full gradient-border bg-[#1C3B42] text-white shadow-lg md:flex">
            <Bot size={18} />
          </div>
          <span>الموافقة بالذكاء الاصطناعي</span>
        </button>

        {/* عداد النتائج النشطة */}
        {hasActiveFilter && (
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-400/30 bg-emerald-500/15 px-3 py-1.5 text-xs font-semibold text-emerald-200">
            النتائج: {resultsCount}
          </span>
        )}
      </div>

      {/* 2. عنصر الجهة اليسرى */}

      {/* [شاشات كبيرة فقط] زر تعاقد جديد الأصلي في أقصى اليسار */}
      <button
        type="button"
        className="hidden gradient-border lg:flex lg:w-32 lg:items-center lg:justify-between lg:gap-2 lg:rounded-full lg:bg-white/10 lg:px-4 lg:py-1 lg:font-bold lg:text-white lg:transition lg:hover:bg-white/20 lg:active:scale-95"
      >
        <Plus size={20} />
        <span>تعاقد جديد</span>
      </button>

      {/* [شاشات متوسطة وصغيرة فقط] حقل البحث يحل محل زر تعاقد جديد بالأسفل/اليسار */}
      <div className="flex w-full items-center justify-between rounded-full gradient-border bg-white/10 py-1.5 pl-3 pr-2 focus-within:border-cyan-400/50 lg:hidden">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="بحث عن مريض"
          className="w-full bg-transparent px-2 text-right text-sm text-white placeholder-white placeholder:font-bold outline-none"
        />
        {searchQuery && (
          <button
            type="button"
            onClick={() => onSearchChange('')}
            className="rounded-full p-0.5 text-white/60 hover:text-white"
          >
            <X size={14} />
          </button>
        )}
        <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full gradient-border bg-[#0E8787]/10 text-white/80">
          <Search size={14} />
        </div>
      </div>
    </div>
  )
}

export default InsuranceHeader