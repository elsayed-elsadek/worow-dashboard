import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { Wallet } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Theme } from '../../../../themes'

interface AdminRevenueChartProps {
  theme: Theme
}

const AdminRevenueChart = ({ theme }: AdminRevenueChartProps) => {
  const { t } = useTranslation()

  const option: EChartsOption = {
    tooltip: { trigger: 'item' },
    legend: {
      top: 'bottom',
      textStyle: { color: '#ffffffcc' },
    },
    series: [
      {
        type: 'pie',
        radius: ['45%', '75%'],
        data: [
          { value: 45, name: t('admin.revenue.surgeries', 'العمليات الجراحية') },
          { value: 30, name: t('admin.revenue.consultations', 'الاستشارات') },
          { value: 15, name: t('admin.revenue.labs', 'المختبر') },
          { value: 10, name: t('admin.revenue.imaging', 'الأشعة') },
        ],
        color: ['#3b82f6', '#00e676', '#f59e0b', '#a855f7'],
        label: { color: '#ffffff' },
        emphasis: { scale: true },
      },
    ],
  }

  return (
    <div className="rounded-3xl border border-white/10 p-4 shadow-xl shadow-black/20" style={{ background: theme.section }}>
<div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">
          {t('admin.revenue.title', 'تفصيل الإيرادات')}
        </h3>
<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#a855f7]/15 text-white">
          <Wallet size={18} />
        </div>
      </div>
      <p className="mt-1 text-sm text-white/70">
        {t('admin.revenue.subtitle', 'توزيع الإيرادات حسب مصدر الخدمة')}
      </p>
      <div className=" h-96 w-full">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  )
}

export default AdminRevenueChart
