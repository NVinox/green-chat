import clsx from "clsx";
import type { ButtonHTMLAttributes } from "react";

import { IconLoader } from "@/shared/icons";

interface IProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  isLoading?: boolean;
}

export default function Button({
  variant = "primary",
  isLoading,
  children,
  ...props
}: IProps) {
  return (
    <button
      className={clsx(
        "font-medium leading-none text-lg rounded-lg py-[14px] px-[24px] max-h-[43px] transition-base cursor-pointer flex items-center justify-center disabled:opacity-50 disabled:pointer-events-none",
        {
          ["bg-cta-color text-text-main"]: variant === "primary",
          ["bg-secondary-color text-text-main"]: variant === "secondary",
        },
      )}
      {...props}
    >
      {isLoading ? <IconLoader /> : children}
    </button>
  );
}
