import { SubTitleSlide } from '@/components';
import { PlusMinus } from './Buttons';
import { Filter } from '../Meal';

type Props = {
  filter: Filter;
  handleSizeChange: (n: number) => void;
};

export function SelectSize({ filter, handleSizeChange }: Props) {
  return (
    <div className='space-y-4'>
      <SubTitleSlide title='鍋子容量' />
      <div className='flex items-center gap-3 pl-2 text-center font-bold'>
        <PlusMinus n={-3} handleSizeChange={handleSizeChange} />
        <PlusMinus n={-1} handleSizeChange={handleSizeChange} />
        <p className='flex h-12 w-12 flex-col justify-center rounded-full bg-amber-300 shadow-list-items'>
          <span>{filter.size}</span>
        </p>
        <PlusMinus n={1} handleSizeChange={handleSizeChange} />
        <PlusMinus n={3} handleSizeChange={handleSizeChange} />
      </div>
    </div>
  );
}
