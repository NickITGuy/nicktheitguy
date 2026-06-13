import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold tracking-wide transition',
  {
    variants: {
      variant: {
        default: 'border-transparent bg-[var(--ink-strong)] text-white',
        secondary:
          'border-transparent bg-[rgba(43,196,177,0.15)] text-[var(--ink-strong)]',
        outline: 'border-[rgba(3,55,68,0.24)] text-[var(--ink-strong)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
)

function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  )
}

export { Badge }
