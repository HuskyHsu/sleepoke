import clsx from 'clsx';
import { Link } from "react-router-dom";

import { Pokemon, SleepTypeBgClass } from '@/types';
import { Card } from './components';

import dataList from '@/data/pmList.json'

function List() {
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
              'rounded-xl text-center',
              'transition-all duration-300',
              'shadow-list-items hover:shadow-list-items--hover',
              'hover:translate-x-[-0.25rem] hover:translate-y-[-0.25rem]',
              SleepTypeBgClass[pm.sleep_type as keyof typeof SleepTypeBgClass],
            )}
            key={index}
          >
            <Card pm={pm} />
            <Link
              className={'stretchedLink'}
              to={`/pm/${pm.pid.slice(-3)}`}
            />
          </li>
        ))}
      </ul>
    </>
  );
}

export default List;
