import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { Stethoscope } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Theme } from '../../../themes'

interface AdminTopDoctorsChartProps {
  theme: Theme
}

const AdminTopDoctorsChart = ({ theme }: AdminTopDoctorsChartProps) => {
  const { t } = useTranslation()

  const option: EChartsOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    grid: { left: 10, right: 10, top: 20, bottom: 20 },
    xAxis: {
      type: 'value',
      min: 0,
      max: 100,
      axisLabel: { color: '#ffffff99' },
      splitLine: { lineStyle: { color: 'rgba(255,255,255,0.08)' } },
    },
    yAxis: {
      type: 'category',
      data: [t('admin.doctors.doctor1', 'د. أحمد محمد'), t('admin.doctors.doctor2', 'د. فاطمة علي'), t('admin.doctors.doctor3', 'د. سارة القحطاني'), t('admin.doctors.doctor4', 'د. ياسر النمر')],
      axisLabel: { color: '#ffffffcc' },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        type: 'bar',
        data: [92, 84, 76, 68],
        color: '#00e676',
        barWidth: 20,
      },
    ],
  }

  return (
    <div className="rounded-[24px] border border-white/10 p-4 shadow-xl shadow-black/20" style={{ background: theme.section }}>
<div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">
          {t('admin.charts.doctors.title', 'الأطباء الأكثر زيارة')}
        </h3>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#00e676]/15 text-[#00e676]">
          <Stethoscope size={18} />
        </div>
      </div>
      <p className="mt-1 text-sm text-white/70">
        {t('admin.charts.doctors.subtitle', 'أعلى الأطباء من حيث عدد الزيارات الشهرية')}
      </p>
      <div className="mt-4 h-[280px]">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  )
}

export default AdminTopDoctorsChart
