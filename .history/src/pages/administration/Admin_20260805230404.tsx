import { ArrowUpRight, DollarSign, Star, UserCheck2, Users } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import Navbar from '../../components/Navbar'
import { themes } from '../../themes'
import AdminDeptsBarChart from './Components/AdminDeptsBarChart'
import AdminHeader from './Components/AdminHeader'
import AdminInsuranceChart from './Components/AdminInsuranceChart'
import AdminTopDeptsChart from './Components/AdminTopDeptsChart'
import AdminTopDoctorsChart from './Components/AdminTopDoctorsChart'
import AdminRevenueChart from './Components/insights/AdminRevenueChart'
import AdminTopDoctorsList from './Components/insights/AdminTopDoctorsList'
import AdminVisitsChart from './Components/insights/AdminVisitsChart'

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
      iconClass: 'bg-[#3b82f6]/20 text-[#3b82f6]',
    },
    {
      title: t('admin.metrics.activeDoctors'),
      value: '124',
      change: t('admin.metrics.changeFromLastMonth', { percent: '3%' }),
      icon: UserCheck2,
      iconClass: 'bg-[#16A34A]/20 text-[#16A34A]',
    },
    {
      title: t('admin.metrics.avgRating'),
      value: '4.7',
      change: '★★★★★',
      icon: Star,
      iconClass: 'bg-[#FACC15]/20 text-[#FACC15]',
    },
    {
      title: t('admin.metrics.revenue'),
      value: t('admin.metrics.revenueValue'),
      change: t('admin.metrics.changeFromLastMonth', { percent: '8%' }),
      icon: DollarSign,
      iconClass: 'bg-[#a855f7]/20 text-[#a855f7]',
    },
  ]

  return (
    <div
      className="min-h-screen text-white "
      style={{
        background: theme.mainColor,
      }}
    >
      <Navbar />

      <main className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8 " dir={isRtl ? 'rtl' : 'ltr'}>
          <section className="mb-5">
            <div className="">
              <AdminHeader theme={theme} />
            </div>
          </section>
        <div className="flex flex-col gap-6 lg:flex-row">
        

          <div className="min-w-0 flex-1">
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {metrics.map(({ title, value, change, icon: Icon, iconClass }) => (
                <div
                  key={title}
                  className="rounded-3xl border border-white/10 p-4 shadow-xl shadow-black/20"
                  style={{ background: theme.section }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm text-white/70">{title}</p>
                      <p className="mt-2 text-2xl font-bold text-white">{value}</p>
                    </div>

                    <div className={`flex h-11 w-11 items-center justify-center rounded-2xl ${iconClass}`}>
                      <Icon size={20} />
                    </div>
                  </div>

<div className="mt-4 flex items-center gap-2 text-sm text-[#16A34A]">
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

            <section className="mt-6 grid gap-4 xl:grid-cols-3">
              <AdminTopDoctorsList theme={theme} />
              <AdminVisitsChart theme={theme} />
              <AdminRevenueChart theme={theme} />
            </section>

            <section className="mt-6 grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
              <AdminInsuranceChart theme={theme} />
              <AdminTopDeptsChart theme={theme} />
            </section>
          </div>
        </div>
      </main>
    </div>
  )
}

export default Admin
