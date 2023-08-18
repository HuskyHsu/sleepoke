import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';

import { meals, ingredients } from '@/data';
import { Icon, SubTitleSlide, TitleSlide } from '@/components';

import { SelectCount, ToolBar } from './components';

type IngredientsCount = {
  count: number; // -1 is not enough
  list: number[];
};

export type Filter = {
  type: string;
  size: number;
  ingredients: Set<string>;
  ingredientsCount: Record<string, number>;
};

function Meal() {
  // const ingredientMap = ingredients.reduce(
  //   (acc, curr) => {
  //     acc[curr.name] = curr.point;

  //     return acc;
  //   },
  //   {} as Record<string, number>,
  // );

  const [filter, setFilter] = useState<Filter>({
    type: '咖哩',
    size: 15,
    ingredients: new Set<string>(),
    ingredientsCount: {},
  });

  const getCountList = (): Record<string, IngredientsCount> => {
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

  const countList = getCountList();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;
    setFilter((prevSearch) => ({
      ...prevSearch,
      type: name,
    }));
  };

  const handleSizeChange = (n: number) => {
    setFilter((prevSearch) => ({
      ...prevSearch,
      size: Math.max(15, prevSearch.size + n),
    }));
  };

  const handleChickChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setFilter((prevSearch) => {
      if (checked) {
        prevSearch.ingredients.add(name);
      } else {
        prevSearch.ingredients.delete(name);
        delete prevSearch.ingredientsCount[name];
      }

      return {
        ...prevSearch,
        ingredients: prevSearch.ingredients,
        ingredientsCount: prevSearch.ingredientsCount,
      };
    });
  };

  const handleCountChange = (name: string, count: number) => {
    setFilter((prevSearch) => ({
      ...prevSearch,
      ingredientsCount: Object.assign(prevSearch.ingredientsCount, { [name]: count }),
    }));
  };

  return (
    <div className='flex flex-col gap-4 pt-4'>
      <ToolBar
        filter={filter}
        handleInputChange={handleInputChange}
        handleSizeChange={handleSizeChange}
        handleChickChange={handleChickChange}
      />
      {/* ingredient count */}
      {filter.ingredients.size > 0 && (
        <div className='space-y-4'>
          <SubTitleSlide title='食材數量 (選至少滿足多少個)' />
          <div className='grid grid-cols-1 md:grid-cols-2'>
            {Object.entries(countList)
              .sort((a, b) => b[1].list.length - a[1].list.length)
              .map(([key, val]) => {
                return (
                  <div key={key} className='flex items-center gap-3'>
                    <span className='h-12 w-12'>
                      <Icon.Game.Ingredient name={key} />
                    </span>
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
      )}
      {/* list */}
      <div className='flex flex-col gap-y-4'>
        <TitleSlide title='清單' />
        <ul className={clsx('gap-4', 'grid grid-cols-1', 'md:grid-cols-2')}>
          {meals
            .filter((meal) => {
              if (meal.ingredients.length === 0 && filter.ingredients.size > 0) {
                return false;
              }
              return meal.type === filter.type;
            })
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

                aHas = a.ingredients.every((ingredient) =>
                  filter.ingredientsCount[ingredient.name] === undefined
                    ? true
                    : filter.ingredientsCount[ingredient.name] >= ingredient.count,
                );
                bHas = b.ingredients.every((ingredient) =>
                  filter.ingredientsCount[ingredient.name] === undefined
                    ? true
                    : filter.ingredientsCount[ingredient.name] >= ingredient.count,
                );

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
              const match =
                meal.ingredients.every((ingredient) => filter.ingredients.has(ingredient.name)) &&
                meal.ingredients.reduce((acc, curr) => acc + curr.count, 0) <= filter.size &&
                meal.ingredients.every((ingredient) =>
                  filter.ingredientsCount[ingredient.name] === undefined
                    ? true
                    : filter.ingredientsCount[ingredient.name] >= ingredient.count,
                );

              return (
                <li
                  key={meal.name}
                  className={clsx(
                    'relative flex border-2',
                    'items-center gap-0 overflow-hidden rounded-[12px]',
                    match ? 'border-custom-green' : 'border-amber-300',
                  )}
                >
                  <div
                    className={clsx(
                      'relative h-20 w-20',
                      match ? 'bg-custom-green/60' : 'bg-amber-100',
                    )}
                  >
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
                                  filter.ingredients.has(name) &&
                                    (filter.ingredientsCount[name] === undefined
                                      ? true
                                      : filter.ingredientsCount[name] >= count)
                                    ? 'bg-amber-300'
                                    : 'bg-amber-100',
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
                  {/* <span
                    className={clsx(
                      'absolute right-0 top-0 w-20 whitespace-nowrap',
                      'rounded-bl-[10px] rounded-tr-[10px]',
                      'bg-amber-100 px-2 py-1 text-center',
                    )}
                  >
                    {meal.ingredients.reduce(
                      (acc, { name, count }) => acc + ingredientMap[name] * count,
                      0,
                    )}
                  </span> */}
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default Meal;
