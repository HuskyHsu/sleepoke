import { ChangeEvent } from 'react';

import { Filter } from './List';
import { SelectFilter, SelectGroup } from './components';

type Props = {
  filter: Filter;
  handleChickChange: (
    key: 'berries' | 'ingredients' | 'skills',
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
  handleGroupByChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function ToolBar({ filter, handleChickChange, handleGroupByChange }: Props) {
  return (
    <>
      <SelectFilter filter={filter} handleChickChange={handleChickChange} />
      <SelectGroup filter={filter} handleGroupByChange={handleGroupByChange} />
    </>
  );
}
