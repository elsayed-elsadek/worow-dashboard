import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from '../../../i18n'
import logo from '../../../assets/logo.webp' // استيراد شعار
import avatar from '../../../assets/admin.webp' // استيراد صورة الأفاتار
import NotificationModal, { type NotificationItem } from '../../../components/NotificationModal'
import SharedPadding from '../../../components/SharedPadding'

function AdminNavbar() {
  const { t, i18n: i18nInstance } = useTranslation()
  const currentCode = (i18nInstance.language || i18n.language).startsWith('ar') ? 'ar' : 'en'

  const setLanguage = (code: string | undefined) => {
    void i18nInstance.changeLanguage(code)
  }

  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: 1,
      type: 'emergency',
      title: t('notifications.item1.title', 'بلاغ جديد'),
      message: t('notifications.item1.message', 'بلاغ غياب وعي في شارع الأمير سلطان'),
      time: t('notifications.item1.time', 'منذ 5 دقائق'),
      unread: true,
    },
    {
      id: 2,
      type: 'report',
      title: t('notifications.item2.title', 'تحديث حالة'),
      message: t('notifications.item2.message', 'تم تحديث حالة البلاغ رقم 1247'),
      time: t('notifications.item2.time', 'منذ 12 دقيقة'),
      unread: true,
    },
    {
      id: 3,
      type: 'call',
      title: t('notifications.item3.title', 'مكالمة جديدة'),
      message: t('notifications.item3.message', 'اتصال وارد من خالد العتيبي'),
      time: t('notifications.item3.time', 'منذ 18 دقيقة'),
      unread: false,
    },
  ])

  const unreadCount = notifications.filter((n) => n.unread).length

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  return (
    <SharedPadding as="header" variant="navbar" className="w-full text-white  dir-rtl">
      {/* Upper Navigation Row */}
      <div className="mx-auto flex flex-col-reverse items-center justify-between gap-4 pb-3 sm:flex-row py-6">
        
        {/* User profile & Controls Group */}
        <div className="flex w-full items-center justify-between gap-3 sm:w-auto sm:justify-start sm:gap-4">
          
          {/* Doctor Info */}
          <div className="flex items-center gap-2.5">
            <img
              src={avatar || 'https://via.placeholder.com/40'}
              alt="Doctor Avatar"
              className="h-9 w-9 rounded-full border border-white/20 object-cover sm:h-10 sm:w-10"
            />
           
          </div>

          <div className="flex items-center gap-3">
           

            {/* Language Selector */}
            <div className="flex items-center gap-1.5 text-xs font-medium  px-2 py-1 rounded-lg">
              <button
                type="button"
                onClick={() => setLanguage('ar')}
                className={`transition px-1 ${currentCode === 'ar' ? 'font-bold text-[#00bcd4]' : 'text-gray-400 hover:text-white'}`}
              >
                العربية
              </button>
              <span className="text-gray-500 text-[10px]">|</span>
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`transition px-1 ${currentCode === 'en' ? 'font-bold text-[#00bcd4]' : 'text-gray-400 hover:text-white'}`}
              >
                EN
              </button>
            </div>

             {/* Notifications Button */}
            <div className="relative flex items-center">
              <button
                type="button"
                onClick={() => setNotificationsOpen((prev) => !prev)}
                className="relative p-1.5 cursor-pointer rounded-lg hover:bg-white/5 transition"
                aria-label="Notifications"
              >
                <svg className="h-5 w-5 text-gray-200 transition hover:text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z" />
                </svg>
                {unreadCount > 0 && (
                  <span className="absolute top-0 right-0 flex h-4 w-4 items-center justify-center rounded-full bg-[#d32f2f] text-[10px] font-bold text-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              <NotificationModal
                open={notificationsOpen}
                onClose={() => setNotificationsOpen(false)}
                notifications={notifications}
                onMarkAllRead={markAllAsRead}
              />
            </div>
          </div>

        </div>

        {/* Brand Logo */}
        <div className="flex w-full items-center justify-center sm:w-auto sm:justify-end">
          <img
            src={logo}
            alt="Brand Logo"
            className="h-8 sm:h-10  w-auto object-contain scale-250 origin-center sm:origin-right"
          />
        </div>
      </div>

  

    </SharedPadding>
  )
}

export default AdminNavbar