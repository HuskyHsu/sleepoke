import { ChangeEvent } from 'react';
import clsx from 'clsx';

import { Icon, SubTitleSlide } from '@/components';
import berries from '@/data/berries.json';
import ingredients from '@/data/ingredients.json';
import skills from '@/data/skills.json';

import { Buttons } from './Buttons';
import { Filter } from '../List';

type Props = {
  filter: Filter;
  handleChickChange: (
    key: 'berries' | 'ingredients' | 'skills',
  ) => (event: ChangeEvent<HTMLInputElement>) => void;
};

export function SelectFilter({ filter, handleChickChange }: Props) {
  return (
    <div
      className={clsx(
        'origin-top space-y-4 overflow-hidden transition-all duration-300',
        filter.displayFilter ? 'mb-4 h-full scale-y-100 opacity-100' : 'h-0 scale-y-0 opacity-0',
      )}
    >
      <SubTitleSlide title='篩選：樹果' />
      <Buttons
        list={berries}
        Icon={Icon.Game.Berry}
        checkSet={filter.berries}
        handleChange={handleChickChange('berries')}
      />
      <SubTitleSlide title='篩選：食材' />
      <Buttons
        list={ingredients}
        Icon={Icon.Game.Ingredient}
        checkSet={filter.ingredients}
        handleChange={handleChickChange('ingredients')}
      />
      <SubTitleSlide title='篩選：主技能' />
      <Buttons list={skills} checkSet={filter.skills} handleChange={handleChickChange('skills')} />
    </div>
  );
}
