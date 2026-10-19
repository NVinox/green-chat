import { type InputHTMLAttributes, useId, forwardRef } from "react";
import clsx from "clsx";

interface IProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const Input = forwardRef<HTMLInputElement, IProps>(
  ({ label, error, ...props }, ref) => {
    const inputId = useId();
    const isError = Boolean(error);

    return (
      <div className="flex flex-col gap-y-[3px] relative w-full">
        <input
          id={inputId}
          ref={ref}
          placeholder=""
          className={clsx(
            "peer text-text-main transition-base w-full border border-cta-color text-normal rounded-md px-[10px] py-[5px] focus:outline-none focus:ring-2 focus:ring-cta-color disabled:pointer-events-none disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none",
            {
              ["border-error-border"]: isError,
            },
          )}
          {...props}
        />

        <label
          htmlFor={inputId}
          className={clsx(
            "absolute top-[17px] left-[10px] bg-card-bg transition-base text-normal text-cta-color -translate-y-1/2 pointer-events-none peer-focus:top-0 peer-not-placeholder-shown:top-0 peer-disabled:opacity-50",
            {
              ["text-error-text"]: isError,
            },
          )}
        >
          {props.required ? (
            <span>
              {label} <span className="text-error-text">*</span>
            </span>
          ) : (
            label
          )}
        </label>

        {isError && <p className="text-tiny text-error-text">{error}</p>}
      </div>
    );
  },
);

export default Input;
