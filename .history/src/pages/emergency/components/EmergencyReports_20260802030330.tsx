import { BarChart3, FilePlus, List, Settings } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AlarmClock ,MapPin } from 'lucide-react'
const EmergencyReports = () => {
  const { t, i18n } = useTranslation()
  const isArabic = i18n.language.startsWith('ar')

  const minuteLabel = isArabic ? 'دقيقة' : 'min'
  const minutesLabel = isArabic ? 'دقائق' : 'mins'

  const incidents = [
    {
      severity: 'high',
      severityLabel: t('emergency.feed.card1.severity', 'عالي'),
      badgeBg: 'bg-[#fde8e8] text-[#9f1239]',
      borderStyle: ' border-r-4 border-b border-l border-white/10 border-t-[#e11d48] border-r-[#e11d48]',
      elapsed: t('emergency.feed.card1.elapsed', 'منذ 5 دقائق'),
      title: t('emergency.feed.card1.title', 'غياب وعي'),
      location: t('emergency.feed.card1.location', 'شارع الأمير سلطان، الروضة'),
      distance: '2.3 كم',
      duration: `8 ${minutesLabel}`,
    },
    {
      severity: 'high',
      severityLabel: t('emergency.feed.card2.severity', 'عالي'),
      badgeBg: 'bg-[#fde8e8] text-[#9f1239]',
      borderStyle: ' border-r-4 border-b border-l border-white/10 border-t-[#e11d48] border-r-[#e11d48]',
      elapsed: t('emergency.feed.card2.elapsed', 'منذ 12 دقيقة'),
      title: t('emergency.feed.card2.title', 'حادث مرور'),
      location: t('emergency.feed.card2.location', 'طريق الملك عبدالعزيز'),
      distance: '4.3 كم',
      duration: `12 ${minuteLabel}`,
    },
    {
      severity: 'medium',
      severityLabel: t('emergency.feed.card3.severity', 'متوسط'),
      badgeBg: 'bg-[#fef9c3] text-[#854d0e]',
      borderStyle: ' border-r-4 border-b border-l border-white/10 border-t-[#eab308] border-r-[#eab308]',
      elapsed: t('emergency.feed.card3.elapsed', 'منذ 18 دقيقة'),
      title: t('emergency.feed.card3.title', 'ارتفاع حرارة'),
      location: t('emergency.feed.card3.location', 'حي الزهراء، شارع التحلية'),
      distance: '1.8 كم',
      duration: `15 ${minuteLabel}`,
    },
    {
      severity: 'low',
      severityLabel: t('emergency.feed.card4.severity', 'منخفض'),
      badgeBg: 'bg-[#dcfce7] text-[#15803d]',
      borderStyle: ' border-r-4 border-b border-l border-white/10 border-t-[#22c55e] border-r-[#22c55e]',
      elapsed: t('emergency.feed.card4.elapsed', 'منذ 25 دقيقة'),
      title: t('emergency.feed.card4.title', 'تشنج'),
      location: t('emergency.feed.card4.location', 'البلد، شارع قابل'),
      distance: '3.3 كم',
      duration: `18 ${minuteLabel}`,
    },
  ]

  const navItems = [
    { label: t('emergency.navActive', 'البلاغات النشطة'), icon: List },
    { label: t('emergency.navStats', 'إحصائيات'), icon: BarChart3 },
    { label: t('emergency.navSettings', 'الإعدادات'), icon: Settings },
    { label: t('emergency.navReports', 'التقارير'), icon: FilePlus },
  ]

  return (
    <aside className="w-full space-y-4  border border-gray-500 border-l-white bg-[#231016]/95 p-3 text-white font-sans dir-rtl">
      {/* 1. Header & Severity Summary */}
      <div className="rounded-2xl border border-white/10 bg-[#331820]/60 p-3.5">
        <div className="flex items-center justify-between">
               <span className="rounded-full bg-[#fde8e8] px-3 py-0.5 text-xs font-bold text-[#9f1239]">
            {t('emergency.activeReportsCount', 'بلاغات 4')}
          </span>
          <h3 className="text-lg font-bold text-white">
            {t('emergency.activeReportsTitle', 'البلاغات النشطة')}
          </h3>
       
        </div>

        <div className="mt-3 flex items-center justify-end gap-3 text-xs font-semibold text-gray-200">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#e11d48]"></span>
            عالي (2)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#eab308]"></span>
            متوسط (1)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#22c55e]"></span>
            منخفض (1)
          </span>
        </div>
      </div>

      {/* 2. Incidents List */}
      <div className="space-y-3">
        {incidents.map((item, index) => (
          <div
            key={index}
            className={`rounded-2xl bg-[#4d363c] p-3.5 shadow-md transition hover:bg-[#583e45] ${item.borderStyle}`}
          >
            {/* Top Row: Elapsed Time (Left) & Severity Badge (Right) */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-gray-200">{item.elapsed}</span>
              <span className={`rounded-md px-3 py-0.5 text-xs font-bold ${item.badgeBg}`}>
                {item.severityLabel}
              </span>
            </div>

            {/* Title & Location */}
            <div className="mt-2.5 text-right">
              <h4 className="text-base font-bold text-white leading-snug">{item.title}</h4>
              <p className="mt-1 text-xs font-medium text-gray-200">{item.location}</p>
            </div>

            {/* Bottom Metrics Row */}
            <div className="mt-3 flex items-center justify-between text-xs font-semibold text-gray-200 pt-1">
              <span className="flex items-center gap-1">
                <span>{item.duration}</span>
                  <AlarmClock  className="w-4 h-4 text-white" />

              </span>
              <span className="flex items-center gap-1">
                <span>📍</span>
                <span>{item.distance}</span>
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Navigation Links */}
      <div className="space-y-2 pt-2">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-[#6b2128] py-2.5 text-sm font-bold text-white shadow-md transition hover:bg-[#7f2730]"
        >
          <span>{t('emergency.navMap', 'خريطة البلاغات')}</span>
          <MapPin  className="w-4 h-4 text-white" />

        </button>

        <div className="space-y-1.5 pt-1 text-sm font-semibold text-gray-200">
          {navItems.map(({ label, icon: Icon }) => (
            <button key={label} type="button" className="flex w-full items-center justify-between rounded-lg px-3 py-2 transition hover:bg-white/5">
              <span className="text-base">
                <Icon className="h-4 w-4" />
              </span>
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      <hr className="border-white/10 my-2" />

      {/* 4. Filter Emergency Type Tags */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-gray-300 text-right">
          {t('emergency.tagTitle', 'أنواع الطوارئ')}
        </h4>
        <div className="space-y-2">
          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#68232b] py-2 text-xs font-bold text-white transition hover:bg-[#7a2a33]"
          >
            <span>{t('emergency.tagSelected', 'تشنج / غياب وعي')}</span>
          </button>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#59381d] py-2 text-xs font-bold text-white transition hover:bg-[#6b4323]"
          >
            <span>{t('emergency.tagChest', 'ألم صدر')}</span>
          </button>

          <button
            type="button"
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#2d4832] py-2 text-xs font-bold text-white transition hover:bg-[#36573c]"
          >
            <span>{t('emergency.tagFever', 'ارتفاع حرارة')}</span>
          </button>
        </div>
      </div>
    </aside>
  )
}

export default EmergencyReports