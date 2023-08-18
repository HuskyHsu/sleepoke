import clsx from 'clsx';
import { Filter, Meal } from '../Meal';
import { Icon } from '@/components';

type Props = {
  filter: Filter;
  meal: Meal;
};

export function CardBody({ meal, filter }: Props) {
  return (
    <div className='flex flex-col justify-between gap-y-1 p-2 pb-4'>
      <h4 className='font-bold'>{meal.name}</h4>
      <div className='flex items-center gap-x-2'>
        <ul className='flex w-full items-center gap-6'>
          {meal.ingredients.length > 0 ? (
            meal.ingredients.map(({ name, count }) => (
              <li className='relative flex items-center' key={name}>
                <div
                  className={clsx(
                    'h-10 w-10 rounded-full p-1',
                    'transition-all duration-300',
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
                <span
                  className={clsx(
                    'absolute -bottom-1 -right-4 rounded-full',
                    'border-2 border-amber-300 bg-white px-1 text-xs font-medium',
                  )}
                >
                  ×{count}
                </span>
              </li>
            ))
          ) : (
            <li className='relative flex items-center'>
              <div className='h-10 w-10 rounded-full bg-amber-100 p-1'></div>
              <span className='absolute -right-1 bottom-0 text-xs font-medium'>&gt;0</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
