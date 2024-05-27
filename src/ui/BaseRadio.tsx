import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/utils/helpers';

type BaseRadioProps = InputHTMLAttributes<HTMLInputElement>


const BaseRadio = forwardRef<HTMLInputElement, BaseRadioProps>(({ type, value, checked, ...rest }, ref) => {
  console.log(checked);
  return (<label className="flex justify-between">
    <span>{value}</span>
    <span className={cn(checked ? 'w-6 h-6 rounded-full bg-orange-400' : 'w-6 h-6 rounded-full bg-purple-300')}></span>
    <input className="visually-hidden" type="radio" ref={ref} {...rest} checked={checked} />
  </label>);
});

export default BaseRadio;