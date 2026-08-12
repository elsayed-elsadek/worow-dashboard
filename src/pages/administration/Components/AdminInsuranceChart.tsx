import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { Scale } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Theme } from '../../../themes'

interface AdminInsuranceChartProps {
  theme: Theme
}

const AdminInsuranceChart = ({ theme }: AdminInsuranceChartProps) => {
  const { t } = useTranslation()

  // خيارات الرسم البياني لقسم تفصيل الإيرادات
  const revenueOption: EChartsOption = {
    tooltip: { trigger: 'item', formatter: '{b}: {c}%' },
    series: [
      {
        type: 'pie',
        radius: '65%',
        center: ['50%', '50%'],
        data: [
          { value: 45.0, name: t('admin.revenue.surgeries', 'العمليات'), itemStyle: { color: '#70b2f6' } },
          { value: 30.0, name: t('admin.revenue.consultations', 'الاستشارات'), itemStyle: { color: '#434349' } },
          { value: 15.0, name: t('admin.revenue.labs', 'المختبر'), itemStyle: { color: '#88f47b' } },
          { value: 10.0, name: t('admin.revenue.imaging', 'الأشعة'), itemStyle: { color: '#f8a055' } },
        ],
        label: {
          color: '#ffffff',
          formatter: '{b}: {c} %',
          fontSize: 14, // تكبير الخط قليلاً
          fontWeight: 'bold', // جعل الخط عريض وواضح
        },
        labelLine: {
          lineStyle: {
            color: '#ffffff',
            width: 2, // زيادة عُرض/سُمْك الخط الخارجي
          },
        },
      },
    ],
  }

  return (
    <div
      className="rounded-2xl border border-white/30 p-4 shadow-xl shadow-black/20"
      style={{ background: theme.section }}
      dir="ltr"
    >
      {/* Header */}
      <div className="mb-6 flex items-center justify-between">
        <Scale size={20} className="shrink-0 text-white" />
        <h3 className="text-lg font-semibold text-white">
          {t('admin.insurance.title', 'نسبة التأمينات / الدفع الذاتي')}
        </h3>
      </div>

      {/* Main Grid Structure */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left Side: Insurance vs Self-Pay Cards */}
        <div className="flex flex-col justify-center gap-4">
          <div className="flex items-center justify-between rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <span className="text-lg font-bold text-[#3b82f6]">68%</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">
                {t('admin.insurance.insured', 'التأمينات')}
              </span>
              <span className="h-3 w-3 rounded-full bg-[#3b82f6]" />
            </div>
          </div>

          <div className="flex items-center justify-between rounded-xl border border-white/20 bg-white/10 p-4 backdrop-blur-sm">
            <span className="text-lg font-bold text-[#00e676]">32%</span>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-white">
                {t('admin.insurance.selfPay', 'الدفع الذاتي')}
              </span>
              <span className="h-3 w-3 rounded-full bg-[#00e676]" />
            </div>
          </div>
        </div>

        {/* Right Side: Revenue Breakdown Section */}
        <div className="rounded-2xl border border-white/20 bg-white/10 p-4 text-center backdrop-blur-sm">
          <h4 className="mb-2 text-base font-bold text-white">
            {t('admin.revenue.title', 'تفصيل الإيرادات')}
          </h4>
          <div className="h-64 w-full">
            <ReactECharts
              option={revenueOption}
              style={{ height: '100%', width: '100%' }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdminInsuranceChart