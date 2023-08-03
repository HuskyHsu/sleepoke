import clsx from 'clsx';

import { Pokemon, Type, TypeBgClass } from '@/types';
import { PmIcon, BerryIcon, IngredientIcon } from '@/components';

export function Card({ pm }: { pm: Pokemon }) {
    return (
      <div className="flex w-full flex-col items-center gap-1 p-2">
        <p className="font-bold">No. {pm.pid.slice(-3)}</p>
        <div className={clsx(
          'relative h-16 w-16 overflow-hidden rounded-full',
          'outline outline-2 outline-white',
          TypeBgClass[Type[pm.type as keyof typeof Type] as keyof typeof TypeBgClass],
        )}>
          <PmIcon pm={pm} />
        </div>
        <p className="text-base">{pm.name}</p>
        <p className="flex items-center text-xs">
          {pm.sleep_type} - {pm.specialty}
        </p>
        <p className="flex">
          <>{
            new Array(pm.berry_quantity)
              .fill(0)
              .map((_, index) => <span className="relative h-8 w-8" key={index}>
                  <BerryIcon name={pm.berry} />
                </span>)
          }</>
        </p>
        {
          pm.ingredients.length > 0 && <p className="flex">
            {
              pm.ingredients.map((ingredient) => <span className="relative h-8 w-8" key={ingredient}><IngredientIcon name={ingredient}/></span>)
            }
          </p>
        }
      </div>
    );
  }