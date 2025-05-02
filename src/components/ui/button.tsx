import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "py-4 px-20 font-bold text-base rounded-full",
  variants: {
    color: {
      primary:
        "bg-primary hover:bg-primaryHover/95 active:bg-primaryActive/40 disabled:bg-primaryDisabled ",
      secondary:
        "bg-secondary hover:bg-secondary/80 active:bg-secondary/30 disabled:bg-secondary/20 ",
    },
    type: {
      normal: "text-white",
      outline: "border bg-white",
    },
    icon: {
      true: "rounded-full p-0 size-14 text-white text-white",
    },
  },
  defaultVariants: {
    color: "primary",
    type: "normal",
  },
  compoundVariants: [
    {
      variant: "primary",
      type: "normal",
    },
    {
      variant: "primary",
      type: "outline",
      class:
        "border-primary hover:border-primaryHover/95 active:border-primaryActive/40 disabled:border-primaryDisabled",
    },
    {
      variant: "secondary",
      type: "normal",
    },
  ],
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps extends ButtonVariants {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export const Button = ({
  children,
  className,
  color,
  icon,
  type,
  onClick,
  disabled = false,
}: ButtonProps) => {
  return (
    <button
      className={buttonVariants({ color, icon, type, className })}
      onClick={onClick}
      disabled={disabled}
    >
      <div>{children}</div>
    </button>
  );
};
