import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-transparent transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[rgba(3,55,68,0.35)] disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-[var(--ink-strong)] text-white hover:bg-[var(--ink-soft)]',
        outline:
          'border border-[rgba(3,55,68,0.24)] bg-white text-[var(--ink-strong)] hover:bg-[rgba(43,196,177,0.08)]',
        ghost: 'hover:bg-[rgba(43,196,177,0.12)] text-[var(--ink-strong)]',
        secondary: 'bg-[rgba(43,196,177,0.14)] text-[var(--ink-strong)] hover:bg-[rgba(43,196,177,0.2)]',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-lg px-3',
        lg: 'h-11 rounded-xl px-7 text-sm',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button }
