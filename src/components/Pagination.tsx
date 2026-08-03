import { ChevronLeft, ChevronRight } from 'lucide-react'

interface PaginationProps {
  totalItems: number
  itemsPerPage?: number
  currentPage: number
  onPageChange: (page: number) => void
}

const Pagination = ({
  totalItems,
  itemsPerPage = 10,
  currentPage,
  onPageChange,
}: PaginationProps) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage))

  if (totalPages <= 1) return null

  const goToPage = (page: number) => {
    if (page < 1 || page > totalPages) return
    onPageChange(page)
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="mt-8 flex items-center justify-center gap-2" >
      {/* Next Page (right in RTL) */}
         <button
        type="button"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="الصفحة السابقة"
      >
        <ChevronRight size={18} />
      </button>

    
      {pageNumbers.map((page) => (
        <button
          key={page}
          type="button"
          onClick={() => goToPage(page)}
          className={`flex h-10 w-10 items-center justify-center rounded-2xl border text-sm font-semibold transition ${
          
            page === currentPage
              ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
              : 'border-white/20 bg-white/10 text-white/80 hover:bg-white/20'
          }`}
       
       >
          {page}
        </button>
      ))}

      {/* Previous Page (left in RTL) */}
     <button
        type="button"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white transition hover:bg-white/20 disabled:cursor-not-allowed disabled:opacity-40"
        aria-label="الصفحة التالية"
      >
        <ChevronLeft size={18} />
      </button>

    </div>
  )
}

export default Pagination
