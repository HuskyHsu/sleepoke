import clsx from 'clsx';
import { Icon } from '@/components';
import { Filter, Meal } from '../Meal';
import { CardBody } from './CardBody';

type Props = {
  filter: Filter;
  meal: Meal;
};

export function Card({ meal, filter }: Props) {
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
        'relative flex border-[1px]',
        'items-center gap-0 overflow-hidden rounded-[12px]',
        match ? 'border-custom-green' : 'border-amber-300',
        'shadow-list-items',
      )}
    >
      <div
        className={clsx(
          'relative flex h-full w-24 flex-col justify-center',
          'transition-all duration-300',
          match ? 'bg-custom-green/60' : 'bg-amber-100',
        )}
      >
        <Icon.Game.Meal name={meal.name} />
        <span className='absolute bottom-0 right-2 font-bold'>
          {meal.ingredients.reduce((acc, { count }) => acc + count, 0)}
        </span>
      </div>
      <CardBody filter={filter} meal={meal} />
    </li>
  );
}
