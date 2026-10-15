import clsx from "clsx";

interface IProps {
  className?: string;
}

export function IconLoader({ className }: IProps) {
  return (
    <svg
      className={clsx(className, "animate-spin")}
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g stroke="currentColor">
        <path
          d="M12 3C13.5644 3 15.1018 3.40778 16.4605 4.18312C17.8193 4.95847 18.9525 6.07459 19.7483 7.42143C20.5442 8.76826 20.9752 10.2993 20.999 11.8635C21.0227 13.4277 20.6383 14.9711 19.8836 16.3415C19.129 17.7118 18.0302 18.8618 16.6956 19.678C15.3609 20.4942 13.8366 20.9484 12.2729 20.9959C10.7093 21.0433 9.16021 20.6823 7.77857 19.9486C6.39694 19.2148 5.23042 18.1335 4.39409 16.8115"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="transparent"
        />
      </g>
    </svg>
  );
}
