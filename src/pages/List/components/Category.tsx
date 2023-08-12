import { ChangeEvent } from 'react';

import { Icon } from '@/components';

type Props = {
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function Category({ checked, onChange }: Props) {
  return (
    <>
      <input
        type='checkbox'
        name={'category'}
        id={'category'}
        className='hidden'
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={'category'} className='flex cursor-pointer flex-col items-center'>
        <Icon.Category className='h-6 w-6' />
      </label>
    </>
  );
}
