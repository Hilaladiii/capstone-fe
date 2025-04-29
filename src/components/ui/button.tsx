import { tv, type VariantProps } from "tailwind-variants";

const buttonVariants = tv({
  base: "py-4 px-20 font-bold text-base rounded-full",
  variants: {
    variant: {
      primary: "bg-primary text-white",
      secondary: "bg-secondary text-white",
    },
    icon: {
      true: "rounded-full size-14",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps extends ButtonVariants {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button = ({
  children,
  className,
  variant,
  icon,
  onClick,
}: ButtonProps) => {
  return (
    <button
      className={buttonVariants({ className, variant, icon })}
      onClick={onClick}
    >
      <div>{children}</div>
    </button>
  );
};
