import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { Building2 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Theme } from '../../../themes'

interface AdminDeptsBarChartProps {
  theme: Theme
}

const AdminDeptsBarChart = ({ theme }: AdminDeptsBarChartProps) => {
  const { t } = useTranslation()

  const option: EChartsOption = {
    tooltip: { trigger: 'axis' },
    grid: { left: 10, right: 10, top: 20, bottom: 24 },
    xAxis: {
      type: 'category',
      data: [t('admin.departments.heart', 'القلب والأوعية'), t('admin.departments.pediatrics', 'الأطفال'), t('admin.departments.orthopedics', 'العظام'), t('admin.departments.ent', 'الأنف والأذن'), t('admin.departments.dermatology', 'الجلدية')],
      axisLabel: { color: '#ffffffcc', fontSize: 11 },
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } },
      axisTick: { show: false },
    },
    yAxis: {
      type: 'value',
      min: 0,
      max: 500,
      axisLabel: { color: '#ffffff99' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
    },
    series: [
      {
        type: 'bar',
        data: [430, 360, 280, 215, 190],
        color: '#3b82f6',
        barWidth: 24,
      },
    ],
  }

  return (
    <div className="rounded-[24px] border border-white/10 p-4 shadow-xl shadow-black/20" style={{ background: theme.section }}>
<div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">
          {t('admin.charts.departments.title', 'الأقسام الأكثر زيارة')}
        </h3>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3b82f6]/15 text-[#3b82f6]">
          <Building2 size={18} />
        </div>
      </div>
      <p className="mt-1 text-sm text-white/70">
        {t('admin.charts.departments.subtitle', 'مقارنة أحجام الزيارات بين الأقسام الرئيسية')}
      </p>
      <div className="mt-4 h-[280px]">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  )
}

export default AdminDeptsBarChart
