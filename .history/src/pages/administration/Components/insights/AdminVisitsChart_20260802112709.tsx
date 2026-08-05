import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { useTranslation } from 'react-i18next'
import type { Theme } from '../../../../themes'

interface AdminVisitsChartProps {
  theme: Theme
}

const AdminVisitsChart = ({ theme }: AdminVisitsChartProps) => {
  const { t } = useTranslation()

  const option: EChartsOption = {
    tooltip: { trigger: 'axis' },
    grid: { left: 8, right: 8, top: 20, bottom: 24 },
    xAxis: {
      type: 'category',
      data: [t('admin.visits.jan', 'يناير'), t('admin.visits.feb', 'فبراير'), t('admin.visits.mar', 'مارس'), t('admin.visits.apr', 'أبريل'), t('admin.visits.may', 'مايو'), t('admin.visits.jun', 'يونيو')],
      axisLabel: { color: '#ffffffcc' },
      axisLine: { lineStyle: { color: 'rgba(255,255,255,0.15)' } },
    },
    yAxis: {
      type: 'value',
      axisLabel: { color: '#ffffff99' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
    },
    series: [
      {
        type: 'line',
        smooth: true,
        data: [180, 210, 260, 245, 320, 350],
        lineStyle: { color: '#a855f7', width: 3 },
        itemStyle: { color: '#a855f7' },
        areaStyle: { color: 'rgba(168,85,247,0.2)' },
      },
    ],
  }

  return (
    <div className="rounded-3xl border border-white/10 p-4 shadow-xl shadow-black/20" style={{ background: theme.section }}>
      <h3 className="text-lg font-semibold text-white">
        {t('admin.visits.title', 'تكرار الزيارات')}
      </h3>
      <p className="mt-1 text-sm text-white/70">
        {t('admin.visits.subtitle', 'عدد المرضى العائدين عبر الأشهر')}
      </p>
      <div className="mt-4 h-70">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  )
}

export default AdminVisitsChart
