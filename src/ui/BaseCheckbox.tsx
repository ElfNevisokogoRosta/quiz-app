import { forwardRef, InputHTMLAttributes } from 'react';
import { IoCheckmarkSharp } from 'react-icons/io5';
import { cn } from '@/utils/helpers';

type BaseCheckboxProps = InputHTMLAttributes<HTMLInputElement>

const BaseCheckbox = forwardRef<HTMLInputElement, BaseCheckboxProps>(({ checked, type, ...rest }, ref) => {
  return (
    <label
      className={cn(!checked ? 'transition block w-4 h-4 text-purple-950 bg-red-400 mt-8 cursor-pointer' : 'cursor-pointer transition block w-4 h-4 text-purple-950 bg-green-400 mt-8')}>
      {checked && <IoCheckmarkSharp className="w-4 h-4" />}
      <input className="hidden w-0 h-0 border-none" type="checkbox" {...rest} ref={ref} />
    </label>
  );
});

export default BaseCheckbox;