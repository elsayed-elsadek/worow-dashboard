import { ChevronDown, Info, ShieldCheck } from 'lucide-react'
import avatarImage from '../../../assets/patient.webp'

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
      className={`rounded-[20px] border border-gray-500  shadow-lg shadow-black/20 backdrop-blur-sm transition-all duration-200 hover:border-white/20 ${
isAlert ? 'bg-[#F51014]/10 p-4' : 'backdrop-blur-sm bg-[#DDB638]/10 p-2'
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
              <h3 className="text-lg font-medium text-white">{patient.name}</h3>
              <p className="text-sm font-medium text-white">{patient.age} - {patient.city}</p>
              <p className="text-xs text-white">{patient.idNumber}</p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:mr-4 border-t border-white/10 pt-3 sm:border-t-0 sm:pt-0  sm:border-white/10 sm:pr-4">
            <button className="flex place-items-end gap-1.5 rounded-full gradient-border bg-[#6B7280]/10 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/20 active:scale-95 w-28">
<Info size={15} className="text-white shrink-0" />
              <span className="leading-none ">تفاصيل الحالة</span>
            </button>

            <button className="flex  place-items-end gap-1.5 rounded-full gradient-border bg-[#22C55E]/20 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/20 active:scale-95">
              <ShieldCheck size={15} className="text-white shrink-0" />
              <span className="leading-none">تفاصيل التأمين</span>
            </button>

            <button className="flex  place-items-end gap-1.5 rounded-full gradient-border bg-[#3B82F6]/20 px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-white/20 active:scale-95">
              <span className="leading-none">طباعة فواتير</span>
              <ChevronDown size={15} className="text-white/60 shrink-0" />
            </button>
{isAlert && (
                       <button className="flex items-center justify-center gap-2 rounded-full bg-[#FFA442]/40 px-4.5 py-1 text-sm font-semibold text-white shadow-sm shadow-[#d97706]/30 transition w-25 active:scale-95">
  حجز موعد
</button>
            )}
       

          </div>

        </div>

        {/* القسم الأيسر: تاريخ الزيارة / زر حجز الموعد والتنبيه */}
        <div className="flex items-center justify-between gap-3 border-t border-white/10 pt-3 lg:border-t-0 lg:pt-0 lg:justify-end">
          {isAlert ? (
            <div className="flex items-center gap-3 w-full lg:w-auto justify-between lg:justify-end">
              <div className="flex items-center gap-4 p-2 ">
                <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[#121918]">
  <div className="absolute inset-0 rounded-full border-t-2 border-[#FFA442]" />

  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0D1212]">
    <svg width="22" height="22" viewBox="0 0 90 90" fill="none">
      <path
        d="M45 11L7.5 78C6.2 80.5 8 83.5 11 83.5H79C82 83.5 83.8 80.5 82.5 78L45 11Z"
        fill="#F04444"
      />
      <rect x="41" y="29" width="8" height="32" rx="4" fill="#111111" />
      <circle cx="45" cy="70" r="5" fill="#111111" />
    </svg>
  </div>
</div>
                <span>مجمع الشفاء</span>
              </div>
           
            </div>
          ) : (
            <div className="flex items-center gap-5 w-full lg:w-auto justify-between lg:justify-end mx-2">
              <div className="text-center grid gap-1">
                
                <p className="text-[17px] text-white">زيارة قادمة</p>
                <p className=" text-[17px] text-white">{patient.appointmentDate}</p>
                    <button className="flex items-center gradient-border justify-center gap-2 rounded-full bg-[#FFA442]/40 px-4 py-1 text-sm font-semibold text-white shadow-sm shadow-[#d97706]/30 transition w-25 active:scale-95">
  حجز موعد
</button>
              </div>
         
            </div>
          )}
        </div>

      </div>
    </article>
  )
}

export default InsurancePatient