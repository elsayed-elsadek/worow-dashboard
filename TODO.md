# Pagination Component - Task Progress

## Steps

- [x] Create `src/components/Pagination.tsx` - Reusable pagination component
  - [x] Props: totalItems, itemsPerPage, currentPage, onPageChange
  - [x] Compute totalPages from totalItems / itemsPerPage
  - [x] Render only actual page count
  - [x] RTL-friendly styling matching Insurance theme (emerald accent)
- [x] Update `src/pages/insurance/Insurance.tsx`
  - [x] Import and use Pagination component
  - [x] Add currentPage state with reset on filter change
  - [x] Slice filteredPatients to 10 items per page
  - [x] Replace hardcoded pagination JSX
  - [x] Remove unused ChevronLeft/ChevronRight imports
  - [x] Reset currentPage on filter clear
- [x] Update `src/pages/insurance/components/InsurancePatient.tsx`
  - [x] Use `themes.insurance.section` (#193222) as card background instead of bg-white/[0.04]
- [x] Create missing `src/components/SharedPadding.tsx` (was blocking build)
