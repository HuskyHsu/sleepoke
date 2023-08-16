import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';

import { meals, ingredients } from '@/data';
import { Icon } from '@/components';
import { SleepTypeBgClass } from '@/types';
import { Buttons } from '../List/components';

export type Filter = {
  type: string;
  ingredients: Set<string>;
};

function Meal() {
  const [filter, setFilter] = useState<Filter>({
    type: '咖哩',
    ingredients: new Set<string>(),
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilter((prevSearch) => ({
      ...prevSearch,
      type: value,
    }));
  };

  const handleChickChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setFilter((prevSearch) => {
      if (checked) {
        prevSearch.ingredients.add(name);
      } else {
        prevSearch.ingredients.delete(name);
      }

      return {
        ...prevSearch,
        ingredients: prevSearch.ingredients,
      };
    });
  };

  const types = [
    {
      name: '咖哩',
      color: SleepTypeBgClass['淺淺入夢'],
    },
    { name: '沙拉', color: SleepTypeBgClass['安然入睡'] },
    { name: '飲料、點心', color: SleepTypeBgClass['深深入眠'] },
  ];

  const ingredientMap = ingredients.reduce(
    (acc, curr) => {
      acc[curr.name] = curr.point;

      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className='flex flex-col gap-6'>
      <ul className='grid w-full grid-cols-3 justify-around text-center'>
        {types.map((type, i) => (
          <div
            key={type.name}
            className={clsx(
              'flex items-center justify-center gap-x-2 border-y-2 border-slate-300 py-4',
              i === 0 && 'rounded-l-xl border-l-2',
              i === types.length - 1 && 'rounded-r-xl border-r-2',
              type.color,
            )}
          >
            <input
              id={type.name}
              type='radio'
              name='list-radio'
              value={type.name}
              checked={type.name === filter.type}
              className='h-4 w-4 border-gray-300 bg-gray-100'
              onChange={handleInputChange}
            />
            <label htmlFor={type.name} className=''>
              {type.name}
            </label>
          </div>
        ))}
      </ul>
      <div>
        <Buttons
          list={ingredients.map((ingredient) => ingredient.name)}
          Icon={Icon.Game.Ingredient}
          checkSet={filter.ingredients}
          handleChange={handleChickChange}
        />
      </div>
      <div className='flex flex-col gap-y-4'>
        <ul className={clsx('gap-4', 'grid grid-cols-1', 'md:grid-cols-2')}>
          {meals
            .filter((meals) => meals.type === filter.type)
            .sort((a, b) => {
              if (filter.ingredients.size > 0) {
                let aHas = a.ingredients.some((ingredient) =>
                  filter.ingredients.has(ingredient.name),
                );

                let bHas = b.ingredients.some((ingredient) =>
                  filter.ingredients.has(ingredient.name),
                );

                if (aHas !== bHas) {
                  return aHas ? -1 : 1;
                }

                aHas = a.ingredients.every((ingredient) => filter.ingredients.has(ingredient.name));
                bHas = b.ingredients.every((ingredient) => filter.ingredients.has(ingredient.name));

                if (aHas !== bHas) {
                  return aHas ? -1 : 1;
                }
              }

              const aCount = a.ingredients.reduce((acc, { count }) => acc + count, 0);
              const bCount = b.ingredients.reduce((acc, { count }) => acc + count, 0);

              if (aCount !== bCount) {
                return aCount - bCount;
              }

              return a.ingredients.length - b.ingredients.length;
            })
            .map((meal) => {
              return (
                <li
                  key={meal.name}
                  className={clsx(
                    'relative flex border-2 border-amber-300',
                    'items-center gap-0 rounded-xl',
                  )}
                >
                  <div className={clsx('relative h-20 w-20 rounded-l-xl', 'bg-amber-100')}>
                    <Icon.Game.Meal name={meal.name} />
                    <span className='absolute bottom-0 right-2 font-bold'>
                      {meal.ingredients.reduce((acc, { count }) => acc + count, 0)}
                    </span>
                  </div>
                  <div className='flex flex-col justify-between gap-y-2 px-2'>
                    <h4 className='font-bold'>{meal.name}</h4>
                    <div className='flex items-center gap-x-2'>
                      <ul className='flex w-full items-center gap-6'>
                        {meal.ingredients.length > 0 ? (
                          meal.ingredients.map(({ name, count }) => (
                            <li className='relative flex items-center' key={name}>
                              <div
                                className={clsx(
                                  'h-10 w-10 rounded-full p-1',
                                  filter.ingredients.has(name) ? 'bg-amber-400' : 'bg-amber-100',
                                )}
                              >
                                <Icon.Game.Ingredient name={name} />
                              </div>
                              <span className='absolute -bottom-1 -right-1 w-4 text-xs font-medium'>
                                ×{count}
                              </span>
                            </li>
                          ))
                        ) : (
                          <li className='relative flex items-center'>
                            <div className='h-10 w-10 rounded-full bg-amber-100 p-1'></div>
                            <span className='absolute -right-1 bottom-0 text-xs font-medium'>
                              &gt;0
                            </span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                  <span
                    className={clsx(
                      'absolute right-0 top-0 w-20 whitespace-nowrap',
                      'rounded-bl-xl rounded-tr-xl',
                      'bg-amber-100 px-2 py-1 text-center',
                    )}
                  >
                    {meal.ingredients.reduce(
                      (acc, { name, count }) => acc + ingredientMap[name] * count,
                      0,
                    )}
                  </span>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default Meal;
