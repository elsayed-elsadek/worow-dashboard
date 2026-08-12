import { ChartLine, Star, TrendingUp, UserCheck2, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { themes } from '../../themes'
import AdminDeptsBarChart from './Components/AdminDeptsBarChart'
import AdminHeader from './Components/AdminHeader'
import AdminInsuranceChart from './Components/AdminInsuranceChart'
import AdminTopDeptsChart from './Components/AdminTopDeptsChart'
import AdminTopDoctorsChart from './Components/AdminTopDoctorsChart'
import AdminRevenueChart from './Components/insights/AdminRevenueChart'
import AdminTopDoctorsList from './Components/insights/AdminTopDoctorsList'
import AdminVisitsChart from './Components/insights/AdminVisitsChart'
import AdminNavbar from './Components/AdminNavbar'

const Admin = () => {
  const { t, i18n } = useTranslation()
  const theme = themes.administration
  const isRtl = i18n.language?.startsWith('ar')

  const metrics = [
    {
      title: t('admin.metrics.totalPatients'),
      value: '2,847',
      change: t('admin.metrics.changeFromLastMonth', { percent: '12%' }),
      icon: Users,
      iconClass: 'bg-[#ffffff] text-[#3b82f6]',
    },
    {
      title: t('admin.metrics.activeDoctors'),
      value: '124',
      change: t('admin.metrics.changeFromLastMonth', { percent: '3%' }),
      icon: UserCheck2,
      iconClass: 'bg-[#DCFCE7] text-[#16A34A]',
    },
    {
      title: t('admin.metrics.avgRating'),
      value: '4.7',
      change: '★★★★★',
      icon: Star,
      iconClass: 'bg-[#FEF9C3] text-[#CA8A04]',
    },
    {
      title: t('admin.metrics.revenue'),
      value: t('admin.metrics.revenueValue'),
      change: t('admin.metrics.changeFromLastMonth', { percent: '8%' }),
      icon: ChartLine  ,
      iconClass: 'bg-[#F3E8FF] text-[#9333EA]',
    },
  ]

  return (
    <div
      className="min-h-screen text-white "
      style={{
        background: theme.mainColor,
        backgroundAttachment: 'fixed',
         backgroundSize: 'cover',
      backgroundPosition: 'center'
      }}
    >
      <AdminNavbar />

<main
  className="mx-auto max-w-8xl px-2 py-3 sm:px-6 sm:py-6 lg:px-8 "
  dir={isRtl ? 'rtl' : 'ltr'}
>        <div className="flex flex-col gap-6 lg:flex-row">
          {/* AdminHeader كـ Sidebar في جهة اليمين */}
          <aside className="w-full shrink-0 lg:w-56 xl:w-65">
            <div className="sticky top-6">
              <AdminHeader />
            </div>
          </aside>
          {/* باقي المحتوى */}
          <div className="min-w-0 flex-1  rounded-3xl border border-white/30 p-6 shadow-2xl shadow-black/20">
          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
  {metrics.map(({ title, value, change, icon: Icon, iconClass }) => (
    <div
      key={title}
      className="rounded-3xl border border-white/30 p-4 shadow-xl shadow-black/20"
      style={{ background: theme.section }}
    >
      <div className="flex items-start justify-between gap-1">
        <div>
          <p className="font-bold text-white">{title}</p>
          <p className="text-xl font-bold text-white">{value}</p>
        </div>

        {/* إضافة self-center لتنزل الأيقونة للأسفل قليلاً وتكون في المنتصف رأسياً */}
        <div className={`flex h-11 w-11 self-center items-center justify-center rounded-xl ${iconClass}`}>
          <Icon size={20} />
        </div>
      </div>

      <div className="flex items-center gap-2 text-sm text-[#16A34A] font-medium ">
        {change !== '★★★★★' && <TrendingUp size={16} />}
        <span className={change === '★★★★★' ? 'text-[#FACC15]' : ''}>{change}</span>
      </div>
    </div>
  ))}
</section>

            <section className="mt-6 grid gap-4 ">
              <div className="grid gap-4 lg:grid-cols-2">
                <AdminDeptsBarChart theme={theme} />
                <AdminTopDoctorsChart theme={theme} />
              </div>
            </section>

            <section className="mt-6 grid gap-4 xl:grid-cols-3 items-stretch">
              <AdminTopDoctorsList theme={theme} />
              <AdminVisitsChart theme={theme} />
              <AdminRevenueChart theme={theme} />
            </section>

        <section className="mt-6 grid gap-4">
  <AdminInsuranceChart theme={theme} />
</section>

<section className="mt-6 grid gap-4">
  <AdminTopDeptsChart theme={theme} />
</section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Admin