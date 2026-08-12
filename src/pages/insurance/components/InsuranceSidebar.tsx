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
    <aside className="w-full lg:w-65">
      <div className="rounded-3xl  p-4 ">
        <div className="mb-5 flex items-center justify-center">
          <img src={logo} alt="Logo" className="h-16 w-auto scale-200" />
        </div>

        <div className="mb-5 flex items-center gap-3 rounded-2xl gradient-border bg-20 p-3 shadow-lg shadow-black/20">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-border bg-white/10">
            <Building2 size={18} />
          </div>
          <p className="text-bold leading-6 text-white">
            شركة السعودية للتأمين  <br/> لوحة التحكم الإدارية
          </p>
        </div>

        <nav className="space-y-2">
          {navItems.map(({ label, icon: Icon, active }) => (
            <button
              key={label}
              className={`flex w-full items-center justify-start gap-5 rounded-3xl px-3 py-3 text-right text-sm font-medium transition ${active ? 'bg-[#FFFFFF]/10 hover:bg-white/20 text-white gradient-border ' : 'bg-transparent text-white hover:bg-white/10'}`}
            >
              <Icon size={18} className={active ? 'text-[#38DDDD] .gradient-border ' : ''} />
              <p className='font-bold text-[18px]'>{label}</p>

            </button>
          ))}
        </nav>
      </div>
    </aside>
  )
}

export default InsuranceSidebar
