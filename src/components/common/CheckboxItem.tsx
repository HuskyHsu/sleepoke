import { ChangeEvent } from 'react';
import clsx from 'clsx';

type Props = {
    label: string,
    children: JSX.Element,
    checked: boolean,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function CheckboxItem({ label, children, checked, onChange }: Props) {
  return (
    <div className='mb-6 h-12 w-12'>
      <input type="checkbox" name={label} id={label} className='hidden' checked={checked} onChange={onChange}/>
      <label htmlFor={label} className='flex cursor-pointer flex-col items-center'>
        <div className={clsx('rounded-full p-1', checked ? 'bg-amber-400': 'bg-amber-100')}>
          {children}
        </div>
        <span className='text-xs'>{label}</span>
      </label>
    </div>
  );
}