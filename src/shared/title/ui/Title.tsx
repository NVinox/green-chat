import type { ReactNode } from "react";

interface IProps {
  children: ReactNode;
  variant?: "h1" | "h2" | "h3";
  className?: string;
}

export default function Title({ children, className, variant = "h1" }: IProps) {
  const Tag = variant;

  return <Tag className={className}>{children}</Tag>;
}
