import { Medal, Star, UserRound } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Theme } from '../../../../themes'

interface AdminTopDoctorsListProps {
  theme: Theme
}

const AdminTopDoctorsList = ({ theme }: AdminTopDoctorsListProps) => {
  const { t } = useTranslation()

  const doctors = [
    { name: t('admin.topDoctors.doctor1'), specialty: t('admin.topDoctors.doctor1Specialty'), rating: 4.9 },
    { name: t('admin.topDoctors.doctor2'), specialty: t('admin.topDoctors.doctor2Specialty'), rating: 4.8 },
    { name: t('admin.topDoctors.doctor3'), specialty: t('admin.topDoctors.doctor3Specialty'), rating: 4.7 },
  ]

  return (
    <div className="rounded-3xl border border-white/10 p-4 shadow-xl shadow-black/20" style={{ background: theme.section }}>
<div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">
          {t('admin.topDoctors.title', 'الأطباء الأعلى تقييماً')}
        </h3>
<Medal size={20} className="shrink-0 text-white" />
      </div>
      <p className="mt-1 text-sm text-white/70">
        {t('admin.topDoctors.subtitle', 'أفضل الأطباء بناءً على تقييمات المرضى')}
      </p>

      <div className="mt-4 space-y-3">
        {doctors.map((doctor, index) => (
          <div key={doctor.name} className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/10 px-3 py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#f59e0b]/15 text-[#f59e0b]">
                {index === 0 ? <UserRound size={18} /> : <UserRound size={18} />}
              </div>
              <div>
                <p className="text-sm font-semibold text-white">{doctor.name}</p>
                <p className="text-xs text-white/65">{doctor.specialty}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white/10 px-2.5 py-1.5 text-sm font-semibold text-[#f59e0b]">
              <Star size={14} fill="currentColor" />
              <span>{doctor.rating.toFixed(1)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminTopDoctorsList
