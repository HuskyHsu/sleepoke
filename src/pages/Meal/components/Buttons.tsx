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
    <div className={clsx('flex w-full flex-wrap gap-4')}>
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
