import clsx from 'clsx';

import { Pokemon, Type, TypeBgClass } from '@/types';
import { Icon } from '@/components';
import { Filter } from '../List';

export function Card({ pm, filter, groupBy }: { pm: Pokemon; filter: Filter; groupBy: string }) {
  const displayLevel = filter.groupBy === 'level';
  let sleepType = null;
  if (filter.groupBy === 'level') {
    sleepType = pm.locations[
      Object.keys(pm.locations).find((location) =>
        filter.locations.has(location),
      ) as keyof typeof pm.locations
    ]?.find((sleepStyle) => `${sleepStyle.level}${sleepStyle.subLevel}` === groupBy);
  }

  return (
    <div className='flex w-full flex-col items-center gap-1 p-2'>
      <p className='font-bold'>No. {pm.pid.slice(-3)}</p>
      <div
        className={clsx(
          'relative h-16 w-16 overflow-hidden rounded-full',
          'outline outline-2 outline-white',
          TypeBgClass[Type[pm.type as keyof typeof Type] as keyof typeof TypeBgClass],
        )}
      >
        <Icon.Game.Pm pm={pm} />
      </div>
      <p className='text-base'>{pm.name}</p>
      <p className='flex items-center text-xs'>
        {pm.sleep_type} - {pm.specialty}
      </p>
      {displayLevel === false && (
        <>
          <p className='flex'>
            {new Array(pm.berry_quantity).fill(0).map((_, index) => (
              <span className='relative h-8 w-8' key={index}>
                <Icon.Game.Berry name={pm.berry} />
              </span>
            ))}
          </p>
          {pm.ingredients.length > 0 && (
            <p className='flex'>
              {pm.ingredients.map((ingredient) => (
                <span className='relative h-8 w-8' key={ingredient}>
                  <Icon.Game.Ingredient name={ingredient} />
                </span>
              ))}
            </p>
          )}
        </>
      )}

      {displayLevel === true && (
        <p className='flex items-center text-xs'>
          #{`${(sleepType?.style || 0) + 1} `}
          {pm.sleep[sleepType?.style as number] || '大肚上睡'}
        </p>
      )}
    </div>
  );
}
