import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
)

const Label = React.forwardRef(({ className,required, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(),
    required && 'after:ml-0.5 after:text-red-500 after:content-["*"]', className)} {...props} />
))
Label.displayName = LabelPrimitive.Root.displayName

export { Label }
