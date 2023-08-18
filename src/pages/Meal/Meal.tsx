import { ChangeEvent, useState } from 'react';
import clsx from 'clsx';

import { meals } from '@/data';
import { TitleSlide } from '@/components';

import { Card, ToolBar } from './components';

export type Filter = {
  type: string;
  size: number;
  ingredients: Set<string>;
  ingredientsCount: Record<string, number>;
};

export type Meal = {
  name: string;
  type: string;
  ingredients: {
    name: string;
    count: number;
  }[];
};

function Meal() {
  const [filter, setFilter] = useState<Filter>({
    type: '咖哩',
    size: 15,
    ingredients: new Set<string>(),
    ingredientsCount: {},
  });

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

  const sortFn = (a: Meal, b: Meal) => {
    if (filter.ingredients.size > 0) {
      let aHas = a.ingredients.some((ingredient) => filter.ingredients.has(ingredient.name));

      let bHas = b.ingredients.some((ingredient) => filter.ingredients.has(ingredient.name));

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
  };

  return (
    <div className='flex flex-col gap-4 pt-4'>
      <ToolBar
        filter={filter}
        handleInputChange={handleInputChange}
        handleSizeChange={handleSizeChange}
        handleChickChange={handleChickChange}
        handleCountChange={handleCountChange}
      />
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
            .sort(sortFn)
            .map((meal) => (
              <Card key={meal.name} filter={filter} meal={meal} />
            ))}
        </ul>
      </div>
    </div>
  );
}

export default Meal;
