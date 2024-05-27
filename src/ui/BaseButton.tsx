import { cva, VariantProps } from 'class-variance-authority';
import { ButtonHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/utils/helpers';

const buttonVariants = cva('text-base text-xl  cursor-pointer transition', {
  variants: {
    variant: {
      default: 'border-yellow-500 border rounded-2xl hover:bg-purple-950 text-purple-950 hover:text-white',
    },
    size: {
      default: 'px-4 py-3 max-w-fit',
    },

  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});


type BaseButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ className, size, variant, ...rest }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...rest}
      />
    );
  },
);

export default BaseButton;
