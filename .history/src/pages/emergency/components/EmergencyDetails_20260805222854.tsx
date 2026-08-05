import { useTranslation } from 'react-i18next'
import type { Theme } from '../../../themes'

interface EmergencyDetailsProps {
  theme: Theme
}

const EmergencyDetails = ({ theme }: EmergencyDetailsProps) => {
  const { t } = useTranslation()

  const details = [
    { label: t('emergency.labels.location', 'الموقع:'), value: t('emergency.values.location', 'شارع الأمير سلطان، الروضة') },
    { label: t('emergency.labels.distance', 'المسافة:'), value: t('emergency.values.distance', '2.3 كم') },
    { label: t('emergency.labels.arrival', 'وقت الوصول:'), value: t('emergency.values.arrival', '8 دقائق') },
    { label: t('emergency.labels.return', 'وقت العودة:'), value: t('emergency.values.return', '16 دقيقة') },
    { label: t('emergency.labels.reportTime', 'وقت البلاغ:'), value: t('emergency.values.reportTime', '14:25 - منذ 5 دقائق') },
  ]

  const callerDetails = [
    { label: t('emergency.callerName', 'الاسم:'), value: t('emergency.callerNameValue', 'خالد العتيبي') },
    { label: t('emergency.callerPhone', 'الهاتف:'), value: t('emergency.callerPhoneValue', '+966 50 123 4567') },
    { label: t('emergency.callerRelationship', 'العلاقة:'), value: t('emergency.callerRelationshipValue', 'شاهد عيان') },
  ]

  return (
    <aside className="w-full space-y-4 border-1 border-gray-600 border-r-white  p-4 text-white  "
     style={{ background: theme.secondary }}
    >
      {/* Title */}
      <h2 className="text-xl font-bold text-white text-right px-1">
        {t('emergency.caseDetailsTitle', 'تفاصيل الحالة')}
      </h2>

      {/* Main Incident Card */}
      <div className="rounded-xl border border-[#f1b3bc]  p-4 shadow-sm"
     style={{ background: theme.section }}
      >
        {/* Card Header: Badge & Report ID */}
        <div className="flex items-center justify-between pb-2">
          
          <span className="text-sm font-semibold text-gray-200">
            {t('emergency.reportBadge', 'البلاغ # 1247')}
          </span>
          <span className="rounded-full bg-[#f1b3bc] px-3 py-1 text-xs font-bold text-[#800f1c]">
            {t('emergency.severityHigh', 'عالي الخطورة')}
          </span>
        </div>

        {/* Incident Title & Description */}
        <div className="mt-2 text-right">
          <h3 className="text-xl font-bold text-white">
            {t('emergency.caseTitle', 'غياب وعي')}
          </h3>
          <p className="mt-1 text-sm font-semibold text-gray-200 leading-relaxed">
            {t('emergency.patientDescription', 'المريض: رجل في الأربعينيات، فقدان مفاجئ للوعي')}
          </p>
        </div>

        {/* Incident Key-Value Details */}
        <div className="mt-4 space-y-2 text-sm font-semibold">
          {details.map((item) => (
            <div key={item.label} className="flex justify-between items-center text-gray-200">
              <span className="text-gray-200">{item.value}</span>
              <span className="text-white font-bold">{item.label}</span>

            </div>
          ))}
        </div>
      </div>

      {/* Caller Info Card */}
      <div className="rounded-xl border border-gray-500  p-4 shadow-sm"
     style={{ background: theme.section }}
      
      >
        <h4 className="text-base font-bold text-white text-right mb-3">
          {t('emergency.callerTitle', 'معلومات المتصل')}
        </h4>
        <div className="space-y-2 text-sm font-semibold">
          {callerDetails.map((item) => (
            <div key={item.label} className="flex justify-between items-center text-gray-200">
              <span className="text-gray-200">{item.value}</span>
              <span className="text-white font-bold">{item.label}</span>

            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="space-y-3 pt-1">
        {/* Approve Button */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#16A34A]/20 py-3 text-base font-bold text-white transition hover:bg-[#325236]"
        >
          <span>{t('emergency.actionApprove', 'موافقة على الحالة')}</span>
          <span className="text-lg">✓</span>
        </button>

        {/* Call Button */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#5c3a1d] py-3 text-base font-bold text-white transition hover:bg-[#6e4623]"
        >
          <span>{t('emergency.actionCall', 'الاتصال بالمبلغ')}</span>
          <span className="text-base">📞</span>

        </button>

        {/* Reject Button */}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#8c2a32] py-3 text-base font-bold text-white transition hover:bg-[#a1303a]"
        >
          <span>{t('emergency.actionReject', 'رفض البلاغ')}</span>
          <span className="text-base">✕</span>

        </button>
      </div>
    </aside>
  )
}

export default EmergencyDetails