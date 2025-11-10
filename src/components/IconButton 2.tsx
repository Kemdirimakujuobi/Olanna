import clsx from 'clsx';
import type { ButtonHTMLAttributes, PropsWithChildren } from 'react';

type IconButtonVariant = 'primary' | 'secondary' | 'disabled';

type IconButtonProps = PropsWithChildren<
  {
    variant?: IconButtonVariant;
  } & ButtonHTMLAttributes<HTMLButtonElement>
>;

const baseClasses =
  'flex h-8 w-8 items-center justify-center gap-2 px-3 py-[3px] transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2';

const variantClasses: Record<IconButtonVariant, string> = {
  primary: 'rounded-[10px] bg-[#2563eb] text-white focus-visible:outline-[#2563eb]/60',
  secondary:
    'rounded-[6px] border border-border bg-background-primary text-text-secondary hover:bg-alpha-soft focus-visible:outline-accent-blue/40',
  disabled: 'rounded-[10px] bg-[rgba(26,26,26,0.06)] text-text-secondary cursor-not-allowed focus-visible:outline-transparent',
};

const IconButton = ({ variant = 'secondary', children, disabled, className, ...props }: IconButtonProps) => {
  const resolvedVariant = disabled ? 'disabled' : variant;

  return (
    <button
      type="button"
      className={clsx(baseClasses, variantClasses[resolvedVariant], className)}
      disabled={disabled || resolvedVariant === 'disabled'}
      {...props}
    >
      {children}
    </button>
  );
};

export default IconButton;

