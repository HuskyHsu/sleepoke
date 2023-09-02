import { ChangeEvent } from 'react';
import clsx from 'clsx';

import { Icon, SubTitleSlide } from '@/components';

import { berries, ingredients, skills, specialties, areas } from '@/data';

import { Buttons } from './Buttons';
import { Filter, groupByKeys } from '../List';

type Props = {
  filter: Filter;
  handleChickChange: (key: groupByKeys) => (event: ChangeEvent<HTMLInputElement>) => void;
  handleFirstChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function SelectFilter({ filter, handleChickChange, handleFirstChange }: Props) {
  return (
    <div
      className={clsx(
        'origin-top space-y-4 overflow-hidden transition-all duration-300',
        filter.displayFilter ? 'mb-4 h-full scale-y-100 opacity-100' : 'h-0 scale-y-0 opacity-0',
      )}
    >
      <SubTitleSlide title='篩選：樹果' />
      <Buttons
        list={berries.map((berry) => berry.name)}
        Icon={Icon.Game.Berry}
        checkSet={filter.berries}
        handleChange={handleChickChange('berries')}
      />

      <SubTitleSlide title='篩選：食材' />
      <div className='pl-2'>
        <label className='relative inline-flex cursor-pointer items-center'>
          <input
            type='checkbox'
            value=''
            className='peer sr-only'
            checked={filter.onlyFirstIngredient}
            onChange={handleFirstChange}
          />
          <div
            className={clsx(
              'peer h-6 w-11 rounded-full bg-gray-200',
              'after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full',
              "after:border after:border-gray-300 after:bg-white after:transition-all after:content-['']",
              'peer-checked:bg-custom-green peer-checked:after:translate-x-full peer-checked:after:border-white',
            )}
          ></div>
          <span className='ml-3 text-sm'>只挑選第一食材</span>
        </label>
      </div>
      <Buttons
        list={ingredients.map((ingredient) => ingredient.name)}
        Icon={Icon.Game.Ingredient}
        checkSet={filter.ingredients}
        handleChange={handleChickChange('ingredients')}
      />

      <SubTitleSlide title='篩選：專長' />
      <Buttons
        list={specialties}
        checkSet={filter.specialties}
        handleChange={handleChickChange('specialties')}
      />

      <SubTitleSlide title='篩選：主技能' />
      <Buttons list={skills} checkSet={filter.skills} handleChange={handleChickChange('skills')} />

      <SubTitleSlide title='篩選：區域' />
      <Buttons
        list={areas}
        checkSet={filter.locations}
        handleChange={handleChickChange('locations')}
      />
    </div>
  );
}
