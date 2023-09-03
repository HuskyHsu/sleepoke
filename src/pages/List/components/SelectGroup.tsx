import { ChangeEvent } from 'react';
import clsx from 'clsx';

import { SubTitleSlide } from '@/components';
import { Filter } from '../List';
import { TextButtons } from './Buttons';

type Props = {
  filter: Filter;
  handleGroupByChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function SelectGroup({ filter, handleGroupByChange }: Props) {
  const groupBySelect = [
    { key: 'none', name: '無' },
    { key: 'sleep_type', name: '睡眠分類' },
    { key: 'berry', name: '樹果' },
    { key: 'ingredients', name: '食材' + (filter.onlyFirstIngredient ? '(第一食材)' : '') },
    { key: 'specialty', name: '專長' },
    { key: 'skill', name: '主技能' },
    { key: 'type', name: '屬性' },
    { key: 'level', name: '卡比獸等級' },
  ];

  return (
    <div
      className={clsx(
        'origin-top space-y-4 overflow-hidden transition-all duration-300',
        filter.displayGroupBy ? 'mb-2 h-full scale-y-100 opacity-100' : 'h-0 scale-y-0 opacity-0',
      )}
    >
      <SubTitleSlide title='分組方式' />
      <TextButtons
        list={groupBySelect}
        select={filter.groupBy}
        handleChange={handleGroupByChange}
      />
    </div>
  );
}
