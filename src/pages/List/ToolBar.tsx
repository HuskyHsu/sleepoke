import { ChangeEvent } from 'react';

import { Filter } from './List';
import { SelectFilter, SelectGroup } from './components';

type Props = {
  filter: Filter;
  handleChickChange: (
    key: 'berries' | 'ingredients' | 'skills' | 'specialties',
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  handleGroupByChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function ToolBar({ filter, handleChickChange, handleGroupByChange }: Props) {
  const hasFilter = [filter.berries, filter.ingredients, filter.skills, filter.specialties].some(
    (set) => set.size > 0,
  );

  const filterList = [
    { set: filter.berries, name: '樹果' },
    { set: filter.ingredients, name: '食材' },
    { set: filter.specialties, name: '專長' },
    { set: filter.skills, name: '主技能' },
  ];

  return (
    <>
      <SelectFilter filter={filter} handleChickChange={handleChickChange} />
      <SelectGroup filter={filter} handleGroupByChange={handleGroupByChange} />

      {hasFilter && (
        <div className='mb-2 flex flex-wrap gap-2'>
          {!filter.displayFilter &&
            filterList
              .filter(({ set }) => set.size > 0)
              .map(({ set }) => [...set])
              .flat()
              .map((name) => (
                <span key={name} className='rounded-xl bg-amber-100 px-2 py-1 '>
                  {name}
                </span>
              ))}
        </div>
      )}
    </>
  );
}
