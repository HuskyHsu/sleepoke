import { ChangeEvent } from 'react';
import clsx from 'clsx';

import { CheckboxTextItem } from '@/components';

type Props = {
  select: string | null;
  list: { name: string }[];
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function TextButtons({ list, select, handleChange }: Props) {
  return (
    <div className={clsx('flex w-full flex-wrap gap-4 pl-2')}>
      {list.map((item) => (
        <CheckboxTextItem
          key={item.name}
          label={{ key: item.name, name: item.name }}
          checked={select === item.name}
          onChange={handleChange}
        />
      ))}
    </div>
  );
}

type PlusMinusProps = {
  n: number;
  handleSizeChange: (n: number) => void;
};

export function PlusMinus({ n, handleSizeChange }: PlusMinusProps) {
  const displayNum = n > 3 ? 'x2' : n > 0 ? `+${n}` : n;
  return (
    <button
      type='button'
      className='h-8 w-8 rounded-full bg-amber-100 shadow-list-items'
      onClick={() => handleSizeChange(n)}
    >
      {displayNum}
    </button>
  );
}

type SelectCountProps = {
  name: string;
  n: number;
  min: number;
  selected: boolean;
  handleCountChange: (name: string, count: number) => void;
};

export function SelectCount({ name, n, min, selected, handleCountChange }: SelectCountProps) {
  return (
    <button
      type='button'
      className={clsx(
        'h-8 w-8 rounded-full',
        'shadow-list-items',
        selected ? 'bg-amber-300' : 'bg-amber-100',
      )}
      onClick={() => handleCountChange(name, n)}
    >
      {n > 0 ? `${n}` : `<${min}`}
    </button>
  );
}
