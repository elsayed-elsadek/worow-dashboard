import { Hospital } from "lucide-react"
import { useTranslation } from 'react-i18next'

const EmergencyHeader = () => {
  const { t } = useTranslation()

  return (
    <div className="mb-5">
          {/* Emergency System Sub-Header */}
      <div className="mx-auto  bg-[#3C1B21]/80 px-3 py-3 sm:px-6 sm:py-4 shadow-inner border border-b-2 border-gray-500 border-b-[#AF1E31]">
        <div className="flex items-center justify-end gap-3">
          <div className="text-right">
            <h1 className=" font-bold leading-tight text-white text-[28px]">
              {t('emergency.systemTitle', 'نظام الطوارئ')}
            </h1>
            <p className="text-[17px] text-white font-bold p-0 m-0">
              {t('emergency.systemSubtitle', 'مركز إدارة البلاغات الطبية')}
            </p>
          </div>

          <div className="flex h-9 w-9 sm:h-10 sm:w-10 shrink-0 items-center justify-center rounded-lg bg-[#c62828] text-white shadow-md">
            <Hospital className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmergencyHeader
