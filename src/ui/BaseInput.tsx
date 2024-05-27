import { cva, VariantProps } from 'class-variance-authority';
import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/utils/helpers';


const inputVariants = cva('border rounded-xl bg-purple bg-purple-100', {
  variants: {
    variant: {
      default: 'text-purple-950 text-base',
    },
    size: {
      default: 'px-4 py-3 w-full',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'default',
  },
});

type BaseInputProps = InputHTMLAttributes<HTMLInputElement> &
  VariantProps<typeof inputVariants> & {
  error?: any;
  label?: string;

};

const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ className, label, error, variant, size, ...rest }, ref) => {
    return (
      <label className="flex flex-col gap-2 w-full">

        {label && (
          <span className="text-base text-purple-950 font-bold text-left">{label}</span>
        )}
        <input
          ref={ref}
          className={cn(inputVariants({ variant, size, className }))}
          {...rest}
        />
        {error && (
          <span className="text-left text-red-600 text-sm">
            {error.message}
          </span>
        )}
      </label>
    );
  },
);

export default BaseInput;