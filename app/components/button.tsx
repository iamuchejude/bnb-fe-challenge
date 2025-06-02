import { cn } from "~/utils";

type ButtonProps = {
  label: string;
  type?: "button" | "submit";
  className?: string;
  variant: "primary" | "secondary";
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export function Button({
  label,
  onClick,
  className,
  variant = "primary",
  disabled = false,
  type = "button",
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        " text-white py-2 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        variant === "primary"
          ? "bg-blue-600 hover:bg-blue-700"
          : "bg-gray-600 hover:bg-grey-700",
        className
      )}
    >
      {label}
    </button>
  );
}
