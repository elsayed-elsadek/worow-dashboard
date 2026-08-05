import { Building2, FileText, Handshake, Home, MessageSquare } from 'lucide-react'
import logo from '../../../assets/logo.webp'

const navItems = [
  { label: 'الرئيسية', icon: Home, active: true },
  { label: 'حجز المواعيد', icon: FileText },
  { label: 'إدارة الفواتير', icon: FileText },
  { label: 'مراسلات', icon: MessageSquare },
  { label: 'تعاقدات', icon: Handshake },
]

const InsuranceSidebar = () => {
  return (
    <aside className="w-full lg:w-[260px]">
      <div className="rounded-[24px]  p-4 ">
        <div className="mb-5 flex items-center justify-center">
          <img src={logo} alt="Logo" className="h-16 w-auto scale-200" />
        </div>

        <div className="mb-5 flex items-center gap-3 rounded-[16px] border border-white/10 bg-black/20 p-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
            <Building2 size={18} />
          </div>
          <p className="text-sm leading-6 text-white/80">
            شركة السعودية للتأمين  <br/> لوحة التحكم الإدارية
          </p>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`flex w-full items-center justify-start gap-5 rounded-[14px] px-3 py-3 text-right text-sm font-medium transition ${active ? 'bg-[#FFFFFF]/10 hover:bg-white/20 text-white' : 'bg-transparent text-white/80 hover:bg-white/10'}`}
            >
              <Icon size={18} className={active ? 'text-white' : ''} />
              <span>{label}</span>

            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default InsuranceSidebar
