import { ChangeEvent } from 'react';
import clsx from 'clsx';

import { Icon } from '@/components';
import { Filter } from './List';
import { SelectFilter, SelectGroup } from './components';

type Props = {
  filter: Filter;
  handleChickChange: (
    key: 'berries' | 'ingredients' | 'skills' | 'specialties' | 'locations',
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  handleGroupByChange: (event: ChangeEvent<HTMLInputElement>) => void;
  removeFilter: (key: 'berries' | 'ingredients' | 'skills' | 'specialties', name: string) => void;
};

export function ToolBar({ filter, handleChickChange, handleGroupByChange, removeFilter }: Props) {
  const hasFilter = [filter.berries, filter.ingredients, filter.skills, filter.specialties].some(
    (set) => set.size > 0,
  );

  const filterList = [
    { set: filter.berries, name: '樹果', key: 'berries' },
    { set: filter.ingredients, name: '食材', key: 'ingredients' },
    { set: filter.specialties, name: '專長', key: 'specialties' },
    { set: filter.skills, name: '主技能', key: 'skills' },
  ];

  return (
    <>
      <SelectFilter filter={filter} handleChickChange={handleChickChange} />
      <SelectGroup filter={filter} handleGroupByChange={handleGroupByChange} />

      <div
        className={clsx(
          'mb-2 flex flex-wrap gap-2',
          'transition-all duration-300',
          hasFilter && filter.displayGroupBy === false
            ? 'mb-4 h-full scale-y-100 opacity-100'
            : 'h-0 scale-y-0 opacity-0',
        )}
      >
        {!filter.displayFilter && (
          <>
            <span className='py-1 pl-2'>篩選項目：</span>
            {filterList
              .filter(({ set }) => set.size > 0)
              .map(({ name, set, key }) => [...set].map((itemKey) => [name, itemKey, key]))
              .flat()
              .map((row) => {
                const [name, itemKey, filterKey] = row;
                const key = `${name}-${itemKey}`;
                return (
                  <span
                    key={key}
                    className={clsx(
                      'flex items-center gap-x-2',
                      'rounded-xl bg-amber-100 px-2 py-1 shadow-list-items',
                    )}
                  >
                    {itemKey}
                    <Icon.Close
                      className='h-3 w-3'
                      onClick={() => {
                        removeFilter(
                          filterKey as 'berries' | 'ingredients' | 'skills' | 'specialties',
                          itemKey,
                        );
                      }}
                    />
                  </span>
                );
              })}
          </>
        )}
      </div>
    </>
  );
}
