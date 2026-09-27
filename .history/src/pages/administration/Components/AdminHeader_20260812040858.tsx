import { Hospital } from 'lucide-react'
import { useTranslation } from 'react-i18next'

const AdminHeader = () => {
  const { t } = useTranslation()

  return (
    <div
      className="flex h-full items-center justify-between rounded-3xl border border-white/30 px-2 py-5 shadow-2xl shadow-black/20"
    >
      <div className="flex w-full items-center justify-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/20 text-white gradient-border">
          <Hospital size={22} strokeWidth={2.2} />
        </div>

        <div className="mt-1 text-md font-bold text-white leading-none">
          <h2 className=" font-bold text-white" >
            {t('admin.header.subtitle', 'مستشفى الملك فيصل')}
          </h2>

          <p className="mt-2 text-[16px] font-bold text-white  ">
            {t('admin.header.title', 'لوحة التحكم الإدارية')}
          </p>
        </div>

        
      </div>
    </div>
  )
}

export default AdminHeader