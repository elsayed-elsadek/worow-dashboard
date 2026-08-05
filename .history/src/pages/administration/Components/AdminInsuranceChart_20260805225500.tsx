import ReactECharts from 'echarts-for-react'
import type { EChartsOption } from 'echarts'
import { ShieldCheck } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Theme } from '../../../themes'

interface AdminInsuranceChartProps {
  theme: Theme
}

const AdminInsuranceChart = ({ theme }: AdminInsuranceChartProps) => {
  const { t } = useTranslation()

  const option: EChartsOption = {
    tooltip: { trigger: 'item' },
    legend: { top: 'bottom', textStyle: { color: '#ffffffcc' } },
    series: [
      {
        type: 'pie',
        radius: ['45%', '75%'],
        data: [
          { value: 68, name: t('admin.insurance.insured', 'التأمينات') },
          { value: 32, name: t('admin.insurance.selfPay', 'الدفع الذاتي') },
        ],
        color: ['#3b82f6', '#00e676'],
        label: { color: '#ffffff' },
      },
    ],
  }

  return (
    <div className="rounded-3xl border border-white/10 p-4 shadow-xl shadow-black/20" style={{ background: theme.section }}>
<div className="flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-white">
          {t('admin.insurance.title', 'نسبة التأمينات / الدفع الذاتي')}
        </h3>
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#3b82f6]/15 text-[#3b82f6]">
          <ShieldCheck size={18} />
        </div>
      </div>
      <div className=" h-90">
        <ReactECharts option={option} style={{ height: '100%', width: '100%' }} />
      </div>
    </div>
  )
}

export default AdminInsuranceChart
