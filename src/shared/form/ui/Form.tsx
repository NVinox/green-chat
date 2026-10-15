import type { FormHTMLAttributes, ReactNode } from "react";

interface IProps extends FormHTMLAttributes<HTMLFormElement> {
  children?: ReactNode;
}

export default function Form({ children, ...props }: IProps) {
  return <form {...props}>{children}</form>;
}
