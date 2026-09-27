import { Medal, Star } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import doc1 from '../../../../assets/topDoctors/doc1.webp'
import doc2 from '../../../../assets/topDoctors/doc2.webp'
import doc3 from '../../../../assets/topDoctors/doc3.webp'
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
    <div className="h-full rounded-2xl border border-white/30 p-4 shadow-xl shadow-black/20" style={{ background: theme.section }}>
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">
          {t('admin.topDoctors.title', 'الأطباء الأعلى تقييماً')}
        </h3>
<Medal size={20} className="shrink-0 text-white" />
      </div>
      {/* <p className="mt-1 text-sm text-white/70">
        {t('admin.topDoctors.subtitle', 'أفضل الأطباء بناءً على تقييمات المرضى')}
      </p> */}

      <div className="mt-4">
        {doctors.map((doctor, index) => (
          <div key={doctor.name} className="flex items-center justify-between  py-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-[#f59e0b]/15 text-[#f59e0b]">
                <img
                  src={index === 0 ? doc1 : index === 1 ? doc2 : doc3}
                  alt={doctor.name}
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-white">{doctor.name}</p>
                <p className="font-bold text-sm text-white">{doctor.specialty}</p>
              </div>
            </div>

<div className="grid gap-2 items-center justify-items-end">

            <div className="flex items-center gap-0.5">
  {[1, 2, 3, 4, 5].map((star) => (
    <Star
      key={star}
      size={15}
      strokeWidth={1.5}
      fill="#FACC15"
      className="text-[#FACC15]"
    />
  ))}
</div>
  <p className="ml-1 text-sm font-semibold text-white">{doctor.rating}</p>

</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AdminTopDoctorsList
