import clsx from 'clsx';
import { Link } from "react-router-dom";

import { Pokemon, SleepTypeBgClass } from '@/types';
import { Card, SearchBar } from './components';

import dataList from '@/data/pmList.json'

function List() {
  return (
    <div className='flex flex-col'>
      <div className="flex items-center justify-between py-3">
        <h2>Pokemon List</h2>
        <div className="flex items-center gap-3">
          <SearchBar/>
        </div>
      </div>

      <hr />

      <div>
      filter
      </div>

      <div>
      group
      </div>

      <ul
        className={clsx(
          'grid grid-cols-list-mobile justify-between justify-items-center gap-y-4',
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
              'relative w-32',
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
    </div>
  );
}

export default List;
