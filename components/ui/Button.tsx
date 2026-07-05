"use client";

import { cn } from "@/lib/utils/cn";
import type { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
}

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-gradient-to-br from-brand-500 to-brand-600 text-white shadow-[0_0_20px_var(--color-brand-glow)] hover:-translate-y-0.5 hover:shadow-[0_10px_30px_rgba(245,158,11,0.5)]",
  secondary:
    "bg-zinc-900 text-zinc-100 border border-zinc-800 hover:bg-zinc-800",
  ghost: "bg-transparent text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900",
  danger: "bg-red-600/90 text-white hover:bg-red-500",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-3 py-1.5 rounded-lg",
  md: "text-sm px-4 py-2.5 rounded-xl",
  lg: "text-base px-6 py-3 rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 font-medium transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]",
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    />
  );
}
