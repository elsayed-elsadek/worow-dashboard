import { AlertTriangle, CalendarDays, ChevronDown, FileText, Info, ShieldCheck } from 'lucide-react'
import avatarImage from '../../../assets/images.webp'

type PatientCardProps = {
  patient: {
    id: number
    name: string
    age: string
    city: string
    idNumber: string
    visitLabel?: string
    appointmentDate?: string
    isAlert?: boolean
  }
}

const InsurancePatient = ({ patient }: PatientCardProps) => {
  const isAlert = patient.isAlert

  return (
    <article
      className={`rounded-[20px] border border-gray-500 p-4 shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-200 hover:border-white/20 ${
isAlert ? 'bg-[#F51014]/10' : 'backdrop-blur-sm bg-[#DDB638]/10'
      }`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        
        {/* القسم الأيمن: بيانات المريض + الأزرار الثلاثة بجانبه مباشرة */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          
          {/* صورة وبيانات المريض */}
          <div className="flex items-center gap-3 text-right shrink-0">
            <img 
              src={avatarImage} 
              alt={patient.name} 
              className="h-13 w-13 rounded-full object-cover border border-white/20" 
            />
            <div>
              <h3 className="text-lg font-semibold text-white">{patient.name}</h3>
              <p className="text-sm font-medium text-white/80">{patient.age} - {patient.city}</p>
              <p className="text-xs text-white/50">{patient.idNumber}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:mr-4 border-t border-white/10 pt-3 sm:border-t-0 sm:pt-0 sm:border-r sm:border-white/10 sm:pr-4">
            <button className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#6B7280]/10 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/20 active:scale-95">
<Info size={15} className="text-white shrink-0" />
              <span className="leading-none">تفاصيل الحالة</span>
            </button>

            <button className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#22C55E]/20 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/20 active:scale-95">
              <ShieldCheck size={15} className="text-white shrink-0" />
              <span className="leading-none">تفاصيل التأمين</span>
            </button>

            <button className="flex items-center gap-1.5 rounded-full border border-white/15 bg-[#3B82F6]/20 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/20 active:scale-95">
              <FileText size={15} className="shrink-0" />
              <span className="leading-none">طباعة فواتير</span>
              <ChevronDown size={15} className="text-white/60 shrink-0" />
            </button>
          </div>

        </div>

        {/* القسم الأيسر: تاريخ الزيارة / زر حجز الموعد والتنبيه */}
        <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3 lg:border-t-0 lg:pt-0 lg:justify-end">
          {isAlert ? (
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              <div className="flex items-center gap-1.5 text-sm font-medium text-[#ef4444] bg-red-500/10 px-3.5 py-2 rounded-full border border-red-500/20">
                <AlertTriangle size={17} />
                <span>مجمع الشفاء</span>
              </div>
              <button className="flex items-center gap-2 rounded-full bg-[#FFA442]/40 px-4 py-2 text-sm font-bold text-white shadow-sm shadow-[#d97706]/30 transition hover:bg-[#b45309] active:scale-95">
                <CalendarDays size={16} />
                حجز موعد
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 w-full lg:w-auto justify-between lg:justify-end">
              <div className="text-right">
                <p className="text-sm text-white/90 font-bold">زيارة قادمة</p>
                <p className="text-sm font-bold text-white">{patient.appointmentDate}</p>
              </div>
              <button className="flex items-center gap-2 rounded-full bg-[#FFA442] px-4.5 py-2 text-sm font-bold text-white shadow-sm shadow-[#d97706]/30 transition hover:bg-[#b45309] active:scale-95">
                <CalendarDays size={16} />
                حجز موعد
              </button>
            </div>
          )}
        </div>

      </div>
    </article>
  )
}

export default InsurancePatient