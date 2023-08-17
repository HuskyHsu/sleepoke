import { ChangeEvent } from 'react';
import { Filter } from '../Meal';
import { SelectType, SelectSize, SelectIngredient } from '.';

type Props = {
  filter: Filter;
  handleSizeChange: (n: number) => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  handleChickChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function ToolBar({ filter, handleInputChange, handleSizeChange, handleChickChange }: Props) {
  return (
    <>
      {/* type */}
      <SelectType filter={filter} handleInputChange={handleInputChange} />
      {/* size */}
      <SelectSize filter={filter} handleSizeChange={handleSizeChange} />
      {/* ingredients */}
      <SelectIngredient filter={filter} handleChickChange={handleChickChange} />
    </>
  );
}
