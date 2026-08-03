import { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Bell, CircleCheckBig, ClipboardList, Phone, Siren, X } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import SharedPadding from './SharedPadding'

export interface NotificationItem {
  id: number
  type: 'emergency' | 'report' | 'call' | 'success'
  title: string
  message: string
  time: string
  unread: boolean
}

interface NotificationModalProps {
  open: boolean
  onClose: () => void
  notifications: NotificationItem[]
  onMarkAllRead: () => void
  onNotificationClick?: (id: number) => void
}

const typeStyles: Record<NotificationItem['type'], { bg: string; text: string; icon: LucideIcon }> = {
  emergency: { bg: 'bg-[#5c1d24]/50', text: 'text-[#f87171]', icon: Siren },
  report: { bg: 'bg-[#1e293b]/70', text: 'text-[#60a5fa]', icon: ClipboardList },
  call: { bg: 'bg-[#451a03]/50', text: 'text-[#fbbf24]', icon: Phone },
  success: { bg: 'bg-[#064e3b]/50', text: 'text-[#34d399]', icon: CircleCheckBig },
}

const NotificationModal = ({
  open,
  onClose,
  notifications,
  onMarkAllRead,
  onNotificationClick,
}: NotificationModalProps) => {
  const { t } = useTranslation()
  const modalRef = useRef<HTMLDivElement>(null)

  // إغلاق المودال عند ضغط زر Escape
  useEffect(() => {
    if (!open) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <>
      {/* 1. Invisible Click-Catcher Backdrop (No Dimming / بدون تعتيم للسطوع) */}
      <div 
        className="fixed inset-0 z-40 bg-transparent cursor-default" 
        onClick={onClose} 
        aria-hidden="true"
      />

      {/* 2. Dropdown Container Positioned Right Below the Trigger Button */}
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()} // منع إغلاق القائمة عند النقر داخلها
        className="fixed start-3 end-3 top-28 z-50 w-auto max-w-none origin-top transition-all animate-in fade-in zoom-in-95 duration-150 sm:absolute sm:start-auto sm:end-auto sm:top-full sm:mt-2.5 sm:w-[22rem] sm:max-w-sm sm:origin-top-right"
      >
        <div className="relative max-h-[75vh] sm:max-h-[85vh] flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 backdrop-blur-md shadow-3xl">
          
          {/* Arrow Indicator pointing up to the Bell Icon */}
          {/* Modal Header */}
          <SharedPadding variant="modalHeader" className="flex items-center justify-between border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white tracking-wide">
                {t('notifications.title', 'الإشعارات')}
              </h3>
              {unreadCount > 0 && (
                <span className="rounded-full bg-[#9f1239]/60 px-2 py-0.5 text-[10px] font-bold text-[#fecdd3]">
                  {unreadCount} {t('notifications.new', 'جديد')}
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              {unreadCount > 0 && (
                <button
                  type="button"
                  onClick={onMarkAllRead}
                  className="rounded-lg px-2 py-1 text-xs font-medium text-white/60 hover:bg-white/10 hover:text-white transition-colors"
                >
                  {t('notifications.markAllRead', 'تحديد الكل كقراءة')}
                </button>
              )}
              <button
                type="button"
                onClick={onClose}
                className="flex h-7 w-7 items-center justify-center rounded-lg text-white/40 hover:bg-white/10 hover:text-white transition-colors"
                aria-label={t('notifications.close', 'إغلاق')}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </SharedPadding>

          {/* Modal Content / Notifications List */}
          <SharedPadding variant="modalBody" className="overflow-y-auto space-y-1 custom-scrollbar max-h-[360px]">
            {notifications.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <Bell className="mb-2 h-7 w-7 opacity-30" />
                <p className="text-xs font-medium text-white/40">
                  {t('notifications.empty', 'لا توجد إشعارات حالياً')}
                </p>
              </div>
            ) : (
              notifications.map((item) => {
                const style = typeStyles[item.type]
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onNotificationClick?.(item.id)}
                    className={`group flex w-full items-start gap-3 rounded-xl p-2.5 text-start transition-all ${
                      item.unread
                        ? 'bg-white/[0.06] hover:bg-white/[0.1]'
                        : 'hover:bg-white/[0.03] opacity-70 hover:opacity-100'
                    }`}
                  >
                    {/* Notification Type Icon */}
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg shadow-sm ${style.bg} ${style.text}`}
                    >
                      <style.icon className="h-4 w-4" />
                    </span>

                    {/* Notification Content */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-2">
                        <p
                          className={`truncate text-xs font-bold ${
                            item.unread ? 'text-white' : 'text-white/80'
                          }`}
                        >
                          {item.title}
                        </p>
                        <span className="shrink-0 text-[10px] font-medium text-white/40">
                          {item.time}
                        </span>
                      </div>
                      <p className="mt-1 line-clamp-2 text-[11px] leading-snug text-white/60 group-hover:text-white/80">
                        {item.message}
                      </p>
                    </div>

                    {/* Unread Indicator Dot */}
                    {item.unread && (
                      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-[#e11d48] shadow-sm shadow-[#e11d48]/50" />
                    )}
                  </button>
                )
              })
            )}
          </SharedPadding>
        </div>
      </div>
    </>
  )
}

export default NotificationModal