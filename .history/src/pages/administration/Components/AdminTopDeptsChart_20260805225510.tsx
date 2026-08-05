import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { PieChart } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Theme } from '../../../themes'

interface AdminTopDeptsChartProps {
  theme: Theme
}

const AdminTopDeptsChart = ({ theme }: AdminTopDeptsChartProps) => {
  const { t } = useTranslation()

  const option: EChartsOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: 8, right: 16, top: 20, bottom: 24 },
    xAxis: {
      type: 'value',
      axisLabel: { color: '#ffffff99' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
    },
    yAxis: {
      type: 'category',
      data: [t('admin.departmentDetails.emergency', 'طوارئ'), t('admin.departmentDetails.internal', 'باطنة'), t('admin.departmentDetails.pediatrics', 'أطفال'), t('admin.departmentDetails.obgyn', 'نساء وولادة'), t('admin.departmentDetails.cardiology', 'قلب'), t('admin.departmentDetails.surgery', 'جراحة')],
      axisLabel: { color: '#ffffffcc' },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: 'bar',
        data: [520, 380, 290, 250, 180, 150],
        barWidth: 18,
        label: { show: true, position: 'right', color: '#ffffff' },
        itemStyle: {
          color: (params) => {
            const colors = ['#60a5fa', '#34d399', '#f59e0b', '#ef4444', '#a855f7', '#22d3ee']
            return colors[(params.dataIndex ?? 0) % colors.length]
          },
        },
      },
    ],
  }

  return (
    <div className="rounded-3xl border border-white/10 p-4 shadow-xl shadow-black/20" style={{ background: theme.section }}>
<div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">
          {t('admin.departmentDetails.title', 'الأقسام الأكثر زيارة - تفصيلي')}
        </h3>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#60a5fa]/15 text-[#60a5fa]">
          <PieChart size={18} />
        </div>
      </div>
      <p className="mt-1 text-sm text-white/70">
        {t('admin.departmentDetails.subtitle', 'توزيع الزيارات حسب القسم مع الألوان المميزة')}
      </p>
      <div className="mt-4 h-70">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  )
}

export default AdminTopDeptsChart
