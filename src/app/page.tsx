// eslint-disable-next-line import/extensions
import dataList from '@/data/pmList.json';
import Link from 'next/link';
import clsx from 'clsx';

import { Pokemon } from '@/types';
import { PmIcon, BerryIcon } from '@/components';

function BaseInfo({ pm }: { pm: Pokemon }) {
  return (
    <>
      <p className="font-bold">No. {pm.pid.slice(-3)}</p>
      <div className={clsx(
        'relative h-16 w-16 overflow-hidden rounded-full',
        'border-2 border-solid border-red-300',
      )}>
        <PmIcon pm={pm} />
      </div>
      <p className="text-base">{pm.name}</p>
      <p className="flex items-center text-xs">
        {pm.sleep_type} - {pm.specialty}
      </p>
      <p className="flex">
        <div className="relative h-8 w-8">
          <BerryIcon name={pm.berry} />
        </div>
        <div className="leading-8">:{pm.berry_quantity}</div>
      </p>
    </>
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
        </div>
      </div>

      <hr />

      <ul
        className={clsx(
          '-mx-4 grid grid-cols-list-mobile justify-around gap-3 md:mx-auto md:grid-cols-list',
          'h-full',
        )}
      >
        {dataList.map((pm: Pokemon) => (
          <Link href={`/pm/${pm.pid.slice(-3)}`} key={pm.pid}>
            <li
              className={clsx(
                'flex w-32 flex-col items-center gap-1 text-center',
                'border border-solid border-red-300',
              )}
            >
              <BaseInfo pm={pm} />
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}
