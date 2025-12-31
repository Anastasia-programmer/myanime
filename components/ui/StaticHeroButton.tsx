import React, { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"

export interface StaticHeroButtonProps extends ComponentPropsWithoutRef<"button"> {
    borderRadius?: string
    background?: string
    className?: string
    children?: React.ReactNode
}

export const StaticHeroButton = React.forwardRef<
    HTMLButtonElement,
    StaticHeroButtonProps
>(
    (
        {
            borderRadius = "100px",
            background = "rgba(0, 0, 0, 1)",
            className,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <button
                style={{
                    borderRadius: borderRadius,
                    background: background,
                }}
                className={cn(
                    "relative z-0 flex cursor-pointer items-center justify-center overflow-hidden border border-white/10 px-10 py-5 whitespace-nowrap text-white font-bold transition-all hover:bg-white/[0.05] active:scale-95",
                    className
                )}
                ref={ref}
                {...props}
            >
                {/* Static Glass Highlight */}
                <div
                    className={cn(
                        "absolute inset-0 size-full pointer-events-none",
                        "rounded-[inherit] shadow-[inset_0_-8px_10px_#ffffff1f] bg-gradient-to-t from-white/5 to-transparent"
                    )}
                />

                {/* Content */}
                <span className="relative z-10 flex items-center">
                    {children}
                </span>
            </button>
        )
    }
)

StaticHeroButton.displayName = "StaticHeroButton"
