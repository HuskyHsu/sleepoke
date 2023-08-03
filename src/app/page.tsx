// eslint-disable-next-line import/extensions
import dataList from '@/data/pmList.json';
import Link from 'next/link';
import clsx from 'clsx';

import { Pokemon } from '@/models';
import { PmIcon, BerryIcon } from '@/components';

function BaseInfo({ pm }: { pm: Pokemon }) {
  return (
    <>
      <p className="font-bold">No. {pm.pid.slice(-3)}</p>
      <PmIcon pm={pm} />
      <p className="text-base">{pm.name}</p>
      <p className="flex items-center text-xs">
        {pm.sleep_type} - {pm.specialty}
      </p>
      <p>
        <BerryIcon name={pm.berry} />:{pm.berry_quantity}
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

      <ul className={clsx('mx-auto flex flex-wrap justify-between gap-3', 'h-full')}>
        {dataList.map((pm: Pokemon) => (
          <Link href={`/pm/${pm.pid.slice(-3)}`}>
            <li
              className={clsx(
                'flex w-32 flex-col items-center text-center gap-1',
                'border border-solid border-red-300'
              )}
              key={pm.pid}
            >
              <BaseInfo pm={pm} />
            </li>
          </Link>
        ))}
      </ul>
    </>
  );
}
