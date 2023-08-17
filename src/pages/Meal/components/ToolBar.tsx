import { ChangeEvent } from 'react';
import { Filter } from '../Meal';
import { SelectType } from './SelectType';
import { SelectSize } from './SelectSize';

type Props = {
  filter: Filter;
  handleSizeChange: (n: number) => void;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function ToolBar({ filter, handleInputChange, handleSizeChange }: Props) {
  return (
    <>
      {/* type */}
      <SelectType filter={filter} handleInputChange={handleInputChange} />
      {/* size */}
      <SelectSize filter={filter} handleSizeChange={handleSizeChange} />
    </>
  );
}
