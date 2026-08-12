import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { useTranslation } from 'react-i18next'
import type { Theme } from '../../../themes'

interface AdminTopDeptsChartProps {
  theme: Theme
}

const AdminTopDeptsChart = ({ theme }: AdminTopDeptsChartProps) => {
  const { t } = useTranslation()

  const option: EChartsOption = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: {
      bottom: 0,
      left: 'center',
      textStyle: { color: '#ffffff' },
      data: [{ name: t('admin.departmentDetails.patients', 'المرضى'), icon: 'circle' }],
    },
    grid: { left: '12%', right: '8%', top: '8%', bottom: '18%' },
    xAxis: {
      type: 'value',
      name: t('admin.departmentDetails.patientCount', 'عدد المرضى'),
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: { color: '#ffffffcc', fontSize: 12 },
      axisLabel: { color: '#ffffff99' },
      splitLine: {
        show: true,
        lineStyle: { color: 'rgba(255, 255, 255, 0.15)' },
      },
    },
    yAxis: {
      type: 'category',
      inverse: true, // لترتيب الأقسام من الأعلى للأسفل (طوارئ أولاً)
      data: [
        t('admin.departmentDetails.emergency', 'طوارئ'),
        t('admin.departmentDetails.internal', 'باطنة'),
        t('admin.departmentDetails.pediatrics', 'أطفال'),
        t('admin.departmentDetails.obgyn', 'نساء وولادة'),
        t('admin.departmentDetails.cardiology', 'قلب'),
        t('admin.departmentDetails.surgery', 'جراحة'),
      ],
      axisLabel: { color: '#ffffffcc' },
      axisLine: { show: false },
      axisTick: { show: false },
    },
    series: [
      {
        name: t('admin.departmentDetails.patients', 'المرضى'),
        type: 'bar',
        data: [520, 380, 290, 250, 180, 150],
        barWidth: 16,
        label: {
          show: true,
          position: 'insideRight',
          color: '#ffffff',
          fontWeight: 'bold',
          offset: [-5, 0],
        },
        itemStyle: {
          color: (params) => {
            const colors = [
              '#3b82f6', // طوارئ - أزرق
              '#10b981', // باطنة - أخضر
              '#f59e0b', // أطفال - برتقالي
              '#ef4444', // نساء وولادة - أحمر
              '#8b5cf6', // قلب - بنفسجي
              '#06b6d4', // جراحة - سماوي
            ]
            return colors[(params.dataIndex ?? 0) % colors.length]
          },
          borderRadius: [0, 2, 2, 0],
        },
      },
    ],
  }

  return (
    <div
      className="rounded-2xl border border-white/30 p-4 shadow-xl shadow-black/20 "
      style={{ background: theme.section }}
    >
      {/* Header Centered */}
      <div className="mb-6 text-center">
        <h3 className="text-xl font-bold text-white">
          {t('admin.departmentDetails.title', 'الأقسام الأكثر زيارة')}
        </h3>
      </div>

      {/* Inner Chart Container Box */}
      <div className=" border md:w-2/3 w-full border-white/10 bg-white/5 p-4 backdrop-blur-sm m-auto">
        <div className="h-80 w-full">
          <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
        </div>
      </div>
    </div>
  )
}

export default AdminTopDeptsChart