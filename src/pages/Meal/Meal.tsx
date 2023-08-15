import clsx from 'clsx';

// import { Icon } from '@/components';
import { meals, ingredients } from '@/data';
import { Icon, SubTitleSlide } from '@/components';

function Meal() {
  const types = ['咖哩', '沙拉', '飲料、點心'];

  const ingredientMap = ingredients.reduce(
    (acc, curr) => {
      acc[curr.name] = curr.point;

      return acc;
    },
    {} as Record<string, number>,
  );

  return (
    <div className='mt-4 flex flex-col gap-y-8'>
      {types.map((type) => (
        <div key={type}>
          <SubTitleSlide title={type} />
          <ul className={clsx('gap-6', 'grid grid-cols-1', 'md:grid-cols-2', 'mt-4')}>
            {meals
              .filter((meals) => meals.type === type)
              .sort((a, b) => {
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
                      'relative flex',
                      'items-center gap-0 rounded-xl',
                      'outline outline-2 outline-offset-4 outline-amber-300',
                    )}
                  >
                    <div className='relative h-20 w-20 rounded-l-xl bg-amber-100'>
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
                                <div className={clsx('h-10 w-10 rounded-full bg-amber-100 p-1')}>
                                  <Icon.Game.Ingredient name={name} />
                                </div>
                                <span className='absolute -right-1 bottom-0 text-xs font-medium'>
                                  {count}
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
      ))}
    </div>
  );
}

export default Meal;
