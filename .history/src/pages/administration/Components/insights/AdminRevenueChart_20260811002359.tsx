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
      itemGap: 12,
      textStyle: { color: '#ffffffcc', fontSize: 12 },
    },
    series: [
      {
        type: 'pie',
        // تصغير الأقطار الخارجية والداخلية للرسم البياني
        radius: ['30%', '55%'],
        center: ['50%', '38%'],
        data: [
          { value: 45, name: t('admin.revenue.surgeries', 'العمليات الجراحية') },
          { value: 30, name: t('admin.revenue.consultations', 'الاستشارات') },
          { value: 15, name: t('admin.revenue.labs', 'المختبر') },
          { value: 10, name: t('admin.revenue.imaging', 'الأشعة') },
        ],
        color: ['#3b82f6', '#00e676', '#f59e0b', '#a855f7'],
        label: {
          color: '#ffffff',
          fontSize: 11,
        },
        emphasis: { scale: true },
      },
    ],
  }

  return (
    <div
      className="flex h-full flex-col justify-between rounded-2xl border border-white/30 p-4 shadow-xl shadow-black/20"
      style={{ background: theme.section }}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">
          {t('admin.revenue.title', 'تفصيل الإيرادات')}
        </h3>
        <Wallet size={20} className="shrink-0 text-white" />
      </div>

      <div className="flex-1 w-full min-h-[200px]">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  )
}

export default AdminRevenueChart