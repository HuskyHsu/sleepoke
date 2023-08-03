// eslint-disable-next-line import/extensions
import dataList from '@/data/pmList.json';
import Link from 'next/link';
import clsx from 'clsx';

import { Pokemon, Type, TypeBgClass } from '@/types';
import { PmIcon, BerryIcon, IngredientIcon } from '@/components';

enum SleepTypeBg {
  '淺淺入夢' = 'bg-amber-400/60',
  '安然入睡' ='bg-sky-400/60',
  '深深入眠' ='bg-blue-500/60',
}

function BaseInfo({ pm }: { pm: Pokemon }) {
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

export default function Home() {
  return (
    <>
      <div className="flex justify-between py-3">
        <h2>Pokemon List</h2>
        <div className="flex gap-3">
          <p>search</p>
          <p>filter</p>
          <p>group</p>
        </div>
      </div>

      <hr />

      <ul
        className={clsx(
          'mt-4 grid grid-cols-list-mobile justify-between gap-y-4',
          'md:mx-0 md:grid-cols-list md:gap-x-4',
          'h-full',
        )}
      >
        {dataList.map((
          pm: Pokemon,
          index: number,
        ) => (
          <li
            className={clsx(
              'relative',
              'text-center',
              'rounded-xl shadow-xl',
              SleepTypeBg[pm.sleep_type as keyof typeof SleepTypeBg],
            )}
            key={index}
          >
            <BaseInfo pm={pm} />
            <Link
              className={'stretchedLink'}
              href={{
                pathname: '/pm',
                query: {
                  id: pm.pid,
                },
              }}
            />
          </li>
        ))}
      </ul>
    </>
  );
}
