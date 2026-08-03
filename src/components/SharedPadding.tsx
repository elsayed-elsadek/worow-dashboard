import { createElement, type ElementType, type ReactNode } from 'react'

interface SharedPaddingProps {
  as?: ElementType
  variant?: 'navbar' | 'modalHeader' | 'modalBody' | 'default'
  className?: string
  children?: ReactNode
}

const variantStyles: Record<string, string> = {
  navbar: 'px-4 py-3 sm:px-6 sm:py-4',
  modalHeader: 'px-4 py-3',
  modalBody: 'px-4 py-3',
  default: 'p-4',
}

const SharedPadding = ({
  as: Tag = 'div',
  variant = 'default',
  className = '',
  children,
}: SharedPaddingProps) => {
  const combinedClassName = `${variantStyles[variant]} ${className}`.trim()

  return createElement(Tag, { className: combinedClassName }, children)
}

export default SharedPadding
