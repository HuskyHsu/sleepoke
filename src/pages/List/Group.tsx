import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { Pokemon, SleepTypeBgClass } from '@/types';
import { Filter } from './List';
import { Card } from './components';

type Props = {
  pmList: Pokemon[];
  filter: Filter;
  groupBy: string;
};

const levelScore: Record<string, number> = {
  普通: 0,
  超級: 10,
  高級: 100,
  大師: 1000,
};

export function Group({ pmList, filter, groupBy }: Props) {
  const filterGroup = (pm: Pokemon, groupBy: string) => {
    if (filter.groupBy === null) {
      return true;
    } else if (filter.groupBy === 'level') {
      if (filter.locations.size === 0) {
        return true;
      }

      const baseScore = levelScore[groupBy.slice(0, 2)] + Number(groupBy.slice(2));

      return pm.locations[
        Object.keys(pm.locations).find((location) =>
          filter.locations.has(location),
        ) as keyof typeof pm.locations
      ]?.some((sleepStyle) => levelScore[sleepStyle.level] + sleepStyle.subLevel === baseScore);
    } else if (Array.isArray(pm[filter.groupBy])) {
      if (filter.groupBy === 'ingredients' && filter.onlyFirstIngredient) {
        return pm[filter.groupBy][0] === groupBy;
      } else {
        return pm[filter.groupBy].includes(groupBy);
      }
    }
    return pm[filter.groupBy] === groupBy;
  };

  const filterPm = (pm: Pokemon) => {
    let display = filter.keyword === '';

    if (filter.keyword != '') {
      display = pm.name.includes(filter.keyword);
    }

    if (display && filter.berries.size > 0) {
      display = filter.berries.has(pm.berry);
    }

    if (display && filter.ingredients.size > 0) {
      if (filter.onlyFirstIngredient) {
        display =
          [...filter.ingredients].find((ingredient) => ingredient === pm.ingredients[0]) !==
          undefined;
      } else {
        display =
          pm.ingredients.find((ingredient) => filter.ingredients.has(ingredient)) !== undefined;
      }
    }

    if (display && filter.skills.size > 0) {
      display = filter.skills.has(pm.skill);
    }

    if (display && filter.specialties.size > 0) {
      display = filter.specialties.has(pm.specialty);
    }

    if (display && filter.locations.size > 0) {
      display = Object.keys(pm.locations).some((areaName) => filter.locations.has(areaName));
    }

    return display;
  };

  const sortPm = (pm_a: Pokemon, pm_b: Pokemon) => {
    if (filter.groupBy !== 'level') {
      return 0;
    }

    if (pm_a.sleep_type > pm_b.sleep_type) {
      return 1;
    } else if (pm_a.sleep_type < pm_b.sleep_type) {
      return -1;
    } else {
      return pm_a.pid > pm_b.pid ? 1 : -1;
    }
  };

  const subList = pmList
    .filter((pm: Pokemon) => filterGroup(pm, groupBy))
    .filter(filterPm)
    .sort(sortPm);

  return (
    <>
      {filter.groupBy === 'level' && (
        <div className='flex gap-4 py-2 pl-1'>
          {Object.entries(
            subList.reduce(
              (acc, cur) => {
                if (acc[cur.sleep_type] === undefined) {
                  acc[cur.sleep_type] = 0;
                }
                acc[cur.sleep_type] += 1;
                return acc;
              },
              {} as Record<string, number>,
            ),
          ).map(([key, val]) => (
            <span
              key={key}
              className={clsx(
                'rounded-full px-2 py-1',
                'shadow-list-items',
                'text-sm',
                SleepTypeBgClass[key as keyof typeof SleepTypeBgClass],
              )}
            >
              {key} {val} 種
            </span>
          ))}
        </div>
      )}
      <ul
        className={clsx(
          'grid grid-cols-list-mobile justify-between justify-items-center gap-y-4',
          'md:mx-0 md:grid-cols-list md:gap-x-4',
          'h-full',
        )}
      >
        {subList.map((pm: Pokemon) => (
          <li
            className={clsx(
              'relative w-28 md:w-32',
              'rounded-xl text-center',
              'transition-all duration-300',
              'shadow-list-items hover:shadow-list-items--hover',
              'hover:translate-x-[-0.2rem] hover:translate-y-[-0.2rem]',
              SleepTypeBgClass[pm.sleep_type as keyof typeof SleepTypeBgClass],
            )}
            key={pm.pid}
          >
            <Card pm={pm} filter={filter} groupBy={groupBy} />
            <Link className={'stretchedLink'} to={`/pm/${pm.pid.slice(-3)}`} />
          </li>
        ))}
      </ul>
    </>
  );
}
