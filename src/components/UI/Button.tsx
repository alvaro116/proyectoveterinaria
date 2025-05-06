import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Transition } from '@headlessui/react';

const buttonVariants = cva(
  "relative inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-white transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg",
  {
    variants: {
      variant: {
        primary: "bg-gradient-to-r from-primary-500 to-primary-600 text-white hover:from-primary-600 hover:to-primary-700 focus:ring-primary-500",
        secondary: "bg-gradient-to-r from-secondary-500 to-secondary-600 text-white hover:from-secondary-600 hover:to-secondary-700 focus:ring-secondary-500",
        accent: "bg-gradient-to-r from-accent-500 to-accent-600 text-white hover:from-accent-600 hover:to-accent-700 focus:ring-accent-500",
        outline: "border-2 border-primary-600 bg-transparent text-primary-600 hover:bg-primary-50 focus:ring-primary-500 hover:shadow-primary-100",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-6",
        lg: "h-12 px-8 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  className,
  variant,
  size,
  isLoading = false,
  children,
  ...props
}) => {
  return (
    <button
      className={buttonVariants({ variant, size, className })}
      disabled={isLoading || props.disabled}
      {...props}
    >
      <Transition
        show={true}
        enter="transition-opacity duration-300"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-300"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <span className="absolute inset-0 overflow-hidden rounded-md">
          <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 animate-shimmer" />
        </span>
      </Transition>

      {isLoading ? (
        <div className="flex items-center space-x-2">
          <svg
            className="animate-spin h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          <span>Cargando...</span>
        </div>
      ) : (
        <span className="relative z-10">{children}</span>
      )}
    </button>
  );
};

export default Button;