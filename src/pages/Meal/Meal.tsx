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
            <div key={meal.name} className='grid grid-cols-12 gap-2'>
              <span className='col-span-3'>{meal.name}</span>
              <span className='col-span-2'>{meal.type}</span>
              <span className='col-span-6'>
                {meal.ingredients.length > 0
                  ? meal.ingredients.map(({ name, count }) => `${name}x${count}`).join(' ')
                  : '不滿足其它食譜的任意食材'}
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
