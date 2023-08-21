import clsx from 'clsx';
import { Icon, SubTitleSlide } from '@/components';
import { ingredients, meals } from '@/data';

import { Filter } from '../Meal';
import { SelectCount } from './Buttons';

type Props = {
  filter: Filter;
  handleCountChange: (name: string, count: number) => void;
};

type IngredientsCount = {
  count: number; // -1 is not enough
  list: number[];
};

const ingredientMap = Object.fromEntries(
  ingredients.map((ingredient) => [ingredient.name, ingredient.point]),
);

const getCountList = (filter: Filter): Record<string, IngredientsCount> => {
  return Object.fromEntries(
    ingredients
      .filter((ingredient) => filter.ingredients.has(ingredient.name))
      .map((ingredient) => {
        const countList = meals
          .filter(
            (meal) =>
              meal.type === filter.type &&
              meal.ingredients.reduce((sum, item) => sum + item.count, 0) <= filter.size &&
              meal.ingredients.every((item) => filter.ingredients.has(item.name)),
          )
          .flatMap((meal) => meal.ingredients)
          .filter((item) => item.name === ingredient.name)
          .map((item) => item.count);

        if (countList.length > 0) {
          const list = [-1, ...new Set(countList)].sort((a, b) => a - b);
          return [
            ingredient.name,
            {
              count: list[list.length - 1],
              list,
            },
          ];
        }
        return [
          ingredient.name,
          {
            count: -1,
            list: [],
          },
        ];
      }),
  );
};

export function SelectIngredientCount({ filter, handleCountChange }: Props) {
  if (filter.ingredients.size <= 0) {
    return <></>;
  }

  const countList = getCountList(filter);

  return (
    <div className='space-y-4'>
      <SubTitleSlide title='食材數量 (選至少滿足多少個)' />
      <div className='grid grid-cols-1 gap-y-2 md:grid-cols-2'>
        {Object.entries(countList)
          .sort((a, b) => b[1].list.length - a[1].list.length)
          .map(([key, val]) => {
            return (
              <div key={key} className='flex items-center gap-3'>
                <div className='flex w-16 flex-col items-center'>
                  <div className='h-12 w-12'>
                    <Icon.Game.Ingredient name={key} />
                  </div>
                  <span
                    className={clsx(
                      '-mt-3 whitespace-nowrap',
                      'rounded-full border-2 border-amber-300',
                      'bg-white px-1 text-center text-xs font-medium',
                    )}
                  >
                    {ingredientMap[key]}能量
                  </span>
                </div>
                {val.list.length === 0 && '未用到 / 尚缺其他食材 / 鍋子容量不夠'}
                {val.list.length > 0 &&
                  val.list.map((count, i) => (
                    <SelectCount
                      name={key}
                      key={count}
                      n={count}
                      min={val.list[1]}
                      selected={
                        filter.ingredientsCount[key] === undefined
                          ? i === val.list.length - 1
                          : filter.ingredientsCount[key] === count
                      }
                      handleCountChange={handleCountChange}
                    />
                  ))}
              </div>
            );
          })}
      </div>
    </div>
  );
}
