import { ChangeEvent } from 'react';
import clsx from 'clsx';

type Props = {
  checked: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  text: string;
};

export function Toggle({ text, checked, handleChange }: Props) {
  return (
    <div className='pl-2'>
      <label className='relative inline-flex cursor-pointer items-center'>
        <input
          type='checkbox'
          value=''
          className='peer sr-only'
          checked={checked}
          onChange={handleChange}
        />
        <div
          className={clsx(
            'peer h-6 w-11 rounded-full bg-gray-200',
            'after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full',
            "after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']",
            'peer-checked:bg-custom-green peer-checked:after:translate-x-full peer-checked:after:border-white',
          )}
        ></div>
        <span className='ml-3 text-sm'>{text}</span>
      </label>
    </div>
  );
}
