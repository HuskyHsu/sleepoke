import { ChangeEvent } from 'react';
import clsx from 'clsx';

import { CheckboxItem, CheckboxTextItem } from '@/components';

type Props = {
  checkSet: Set<string>;
  list: string[];
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  Icon?: ({ name, size = 'h-8 w-8' }: { name: string; size?: string }) => JSX.Element;
  prefixKey?: string;
};

export function Buttons({ list, checkSet, Icon, handleChange, prefixKey }: Props) {
  return (
    <div className={clsx('flex w-full flex-wrap justify-items-center gap-x-4 gap-y-3 pb-2 pl-2')}>
      {list.map((item) => (
        <CheckboxItem
          key={item}
          label={item}
          checked={checkSet.has(item)}
          onChange={handleChange}
          prefixKey={prefixKey}
        >
          {Icon && <Icon name={item} size={'h-10 w-10'} />}
        </CheckboxItem>
      ))}
    </div>
  );
}

type TextProps = {
  select: string | null;
  list: { key: string; name: string }[];
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function TextButtons({ list, select, handleChange }: TextProps) {
  return (
    <div className={clsx('flex w-full flex-wrap gap-4 pb-2 pl-2')}>
      {list.map((item) => (
        <CheckboxTextItem
          key={item.key}
          label={item}
          checked={(select === null && item.key === 'none') || select === item.key}
          onChange={handleChange}
        />
      ))}
    </div>
  );
}
