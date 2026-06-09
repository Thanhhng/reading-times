import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2 rounded-[var(--radius-md)] border border-transparent bg-clip-padding font-sans font-semibold whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-[18px]",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[var(--shadow-sm)] hover:bg-accent-hover",
        outline: "border-border bg-surface text-ink hover:bg-surface-2",
        secondary:
          "bg-surface-2 text-ink hover:bg-[color-mix(in_oklch,var(--surface-2),var(--text)_6%)]",
        ghost: "text-ink hover:bg-surface-2",
        destructive:
          "bg-destructive text-white shadow-[var(--shadow-sm)] hover:bg-destructive/90",
        link: "text-accent-2 underline-offset-4 hover:text-accent hover:underline",
      },
      size: {
        sm: "h-8 px-3 text-[length:var(--text-sm)] [&_svg:not([class*='size-'])]:size-4",
        default: "h-10 px-[var(--space-4)] text-[length:var(--text-base)]",
        lg: "h-12 px-[22px] text-[length:var(--text-md)]",
        icon: "size-9",
        "icon-sm": "size-8 rounded-[var(--radius-sm)] [&_svg:not([class*='size-'])]:size-4",
        "icon-lg": "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  loading = false,
  disabled,
  children,
  ...props
}: ButtonPrimitive.Props &
  VariantProps<typeof buttonVariants> & { loading?: boolean }) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      disabled={disabled || loading}
      {...props}
    >
      {loading && <Loader2 className="animate-spin" />}
      {children}
    </ButtonPrimitive>
  )
}

export { Button, buttonVariants }
