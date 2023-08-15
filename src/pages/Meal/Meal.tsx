import { Icon } from '@/components';
import { meals } from '@/data';

function Meal() {
  return (
    <>
      {meals
        .sort((a, b) => {
          if (a.type !== b.type) {
            return a.type.localeCompare(b.type);
          }

          const aCount = a.ingredients.reduce((acc, { count }) => acc + count, 0);
          const bCount = b.ingredients.reduce((acc, { count }) => acc + count, 0);

          return aCount - bCount;
        })
        .map((meal) => {
          return (
            <div key={meal.name} className='grid grid-cols-12 items-center gap-2'>
              <div className='col-span-2'>
                <Icon.Game.Meal name={meal.name} />
              </div>
              <span className='col-span-3'>{meal.name}</span>
              <span className='col-span-5'>
                {meal.ingredients.length > 0 ? (
                  <ul className='flex w-full gap-2'>
                    {meal.ingredients.map(({ name, count }) => (
                      <li className='flex items-center' key={name}>
                        <div className='w-12'>
                          <Icon.Game.Ingredient name={name} />
                        </div>
                        <span className='text-xs'>x{count}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  '任意食材'
                )}
              </span>
              <span className='col-span-1'>
                {meal.ingredients.reduce((acc, { count }) => acc + count, 0)}
              </span>
            </div>
          );
        })}
    </>
  );
}

export default Meal;
