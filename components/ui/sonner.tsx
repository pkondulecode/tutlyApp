'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className="toaster group"
      richColors
      expand={true}
      toastOptions={{
        style: {
          borderRadius: '12px',
          fontWeight: '600',
          border: '1px solid',
        },
        classNames: {
          toast: 'group-[.toaster]:shadow-lg group-[.toaster]:border-border',
          default: 'group-[.toaster]:bg-white group-[.toaster]:text-gray-900 group-[.toaster]:border-gray-100',
          success: 'group-[.toaster]:bg-[#2bb673] group-[.toaster]:text-white group-[.toaster]:border-[#2bb673]',
          error: 'group-[.toaster]:bg-red-500 group-[.toaster]:text-white group-[.toaster]:border-red-500',
          warning: 'group-[.toaster]:bg-yellow-400 group-[.toaster]:text-black group-[.toaster]:border-yellow-400',
          info: 'group-[.toaster]:bg-white group-[.toaster]:text-[#725ef1] group-[.toaster]:border-[#725ef1]/20',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
