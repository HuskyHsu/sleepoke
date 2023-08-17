import { ChangeEvent } from 'react';

import { SubTitleSlide } from '@/components';
import { TextButtons } from './Buttons';
import { Filter } from '../Meal';

type Props = {
  filter: Filter;
  handleInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function SelectType({ filter, handleInputChange }: Props) {
  const types = [{ name: '咖哩' }, { name: '沙拉' }, { name: '飲料、點心' }];

  return (
    <div className={'h-full space-y-4'}>
      <SubTitleSlide title='料理種類' />
      <TextButtons list={types} select={filter.type} handleChange={handleInputChange} />
    </div>
  );
}
