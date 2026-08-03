import { Hospital } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { Theme } from '../../../themes'

interface AdminHeaderProps {
  theme: Theme
}

const AdminHeader = ({ theme }: AdminHeaderProps) => {
  const { t } = useTranslation()

  return (
    <div
      className="flex h-full items-center justify-between rounded-[24px] border border-white/10 px-6 py-5 shadow-2xl shadow-black/20"
      style={{ background: theme.section }}
    >
      <div className="flex w-full items-center justify-start gap-4">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#00E676]">
          <Hospital size={22} strokeWidth={2.2} />
        </div>

        <div className="">
          <p className="text-sm font-bold text-white/70" >
            {t('admin.header.subtitle', 'مستشفى الملك فيصل')}
          </p>

          <h2 className="mt-1 text-2xl font-bold text-white leading-none">
            {t('admin.header.title', 'لوحة التحكم الإدارية')}
          </h2>
        </div>

        
      </div>
    </div>
  )
}

export default AdminHeader