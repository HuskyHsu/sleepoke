import { ChangeEvent } from 'react';
import { Filter } from '../Meal';
import { SelectType } from './SelectType';
import { SelectSize } from './SelectSize';
import { SelectIngredient } from './SelectIngredient';
import { SelectIngredientCount } from './SelectIngredientCount';

type Props = {
  filter: Filter;
  handleSizeChange: (n: number) => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChickChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleCountChange: (name: string, count: number) => void;
};

export function ToolBar({
  filter,
  handleInputChange,
  handleSizeChange,
  handleChickChange,
  handleCountChange,
}: Props) {
  return (
    <>
      {/* type */}
      <SelectType filter={filter} handleInputChange={handleInputChange} />
      {/* size */}
      <SelectSize filter={filter} handleSizeChange={handleSizeChange} />
      {/* ingredients */}
      <SelectIngredient filter={filter} handleChickChange={handleChickChange} />
      {/* ingredient count */}
      <SelectIngredientCount filter={filter} handleCountChange={handleCountChange} />
    </>
  );
}
