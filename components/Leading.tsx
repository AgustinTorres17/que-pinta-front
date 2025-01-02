import React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";

const leadingVariants = cva("text-fondo-950 dark:text-fondo-100", {
  variants: {
    variant: {
      h1: "text-[1.5rem] sm:text-[1.875rem] sm:leading-9 font-bold",
      h2: "text-[1.35rem] sm:text-[1.7rem] sm:leading-7 font-semibold",
      h3: "text-[1.063rem] sm:text-[1.25rem] sm:leading-6 font-semibold",
      h4: "text-[0.875rem] sm:text-[0.875rem] sm:leading-5 font-semibold",
    },
  },
  defaultVariants: {
    variant: "h4",
  },
});

export interface LeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof leadingVariants> {
  asChild?: boolean;
}

const Leading = React.forwardRef<HTMLHeadingElement, LeadingProps>(
  ({ className, variant = "h4", asChild = false, ...props }, ref) => {
    const Comp: React.ElementType = asChild ? Slot : variant as React.ElementType; 
    return (
      <Comp
        className={cn(leadingVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Leading.displayName = "Leading";

export { Leading, leadingVariants };
