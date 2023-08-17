import { ChangeEvent } from 'react';

import { Buttons } from '@/pages/List/components';
import { Icon, SubTitleSlide } from '@/components';
import { ingredients } from '@/data';

import { Filter } from '../Meal';

type Props = {
  filter: Filter;
  handleChickChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function SelectIngredient({ filter, handleChickChange }: Props) {
  return (
    <div className='space-y-4'>
      <SubTitleSlide title='食材' />
      <Buttons
        list={ingredients.map((ingredient) => ingredient.name)}
        Icon={Icon.Game.Ingredient}
        checkSet={filter.ingredients}
        handleChange={handleChickChange}
      />
    </div>
  );
}
