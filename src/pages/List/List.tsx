import { useState, ChangeEvent, useEffect } from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { Pokemon, SleepTypeBgClass } from '@/types';
import { SubTitleSlide, TitleSlide } from '@/components';
import { pmList } from '@/data';

import { Card, SearchBar, Filter, Category, Indicator } from './components';
import { ToolBar } from './ToolBar';

export type Filter = {
  keyword: string;
  berries: Set<string>;
  ingredients: Set<string>;
  skills: Set<string>;
  specialties: Set<string>;
  locations: Set<string>;
  displayFilter: boolean;
  groupBy:
    | keyof Pick<Pokemon, 'sleep_type' | 'berry' | 'ingredients' | 'type' | 'specialty' | 'skill'>
    | null;
  displayGroupBy: boolean;
};

function List() {
  const [filter, setFilter] = useState<Filter>({
    keyword: '',
    berries: new Set<string>(),
    ingredients: new Set<string>(),
    skills: new Set<string>(),
    specialties: new Set<string>(),
    locations: new Set<string>(),
    displayFilter: false,
    groupBy: null,
    displayGroupBy: false,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilter((prevSearch) => ({
      ...prevSearch,
      keyword: value,
    }));
  };

  const handleChickChange =
    (key: 'berries' | 'ingredients' | 'skills' | 'specialties' | 'locations') =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const { name, checked } = event.target;

      setFilter((prevSearch) => {
        if (checked) {
          prevSearch[key].add(name);
        } else {
          prevSearch[key].delete(name);
        }

        return {
          ...prevSearch,
          [key]: prevSearch[key],
        };
      });
    };

  const removeFilter = (
    key: 'berries' | 'ingredients' | 'skills' | 'specialties',
    name: string,
  ) => {
    setFilter((prevSearch) => {
      prevSearch[key].delete(name);

      return {
        ...prevSearch,
        [key]: prevSearch[key],
      };
    });
  };

  const handleGroupByChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setFilter((prevSearch) => {
      return {
        ...prevSearch,
        groupBy: name !== 'none' ? (name as Extract<Filter['groupBy'], keyof Pokemon>) : null,
      };
    });
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setFilter((prevSearch) => {
      return {
        ...prevSearch,
        displayGroupBy: checked,
      };
    });
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setFilter((prevSearch) => {
      return {
        ...prevSearch,
        displayFilter: checked,
      };
    });
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
      display =
        pm.ingredients.find((ingredient) => filter.ingredients.has(ingredient)) !== undefined;
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

  useEffect(() => {
    document.title = `Sleep Pokédex`;
  }, []);

  let groupByList: string[] = [''];
  if (filter.groupBy !== null) {
    groupByList = pmList
      .map((pm: Pokemon) => pm[filter.groupBy as Extract<Filter['groupBy'], keyof Pokemon>])
      .flat();
    groupByList = [...new Set(groupByList)];
  }

  const hasFilter = [filter.berries, filter.ingredients, filter.skills, filter.specialties].some(
    (set) => set.size > 0,
  );

  return (
    <div className='flex flex-col'>
      <div className='flex justify-end py-3'>
        <div className='flex w-full items-center gap-x-3 md:w-3/5 lg:w-1/3'>
          <SearchBar value={filter.keyword} onChange={handleInputChange} />
          <div className='relative'>
            <Filter checked={filter.displayFilter} onChange={handleFilterChange} />
            {hasFilter && <Indicator />}
          </div>
          <div className='relative'>
            <Category checked={filter.displayGroupBy} onChange={handleCategoryChange} />
            {filter.groupBy !== null && <Indicator />}
          </div>
        </div>
      </div>

      <ToolBar
        filter={filter}
        handleChickChange={handleChickChange}
        handleGroupByChange={handleGroupByChange}
        removeFilter={removeFilter}
      />

      <TitleSlide title='清單' />
      <div className='mt-4 space-y-8'>
        {groupByList.map((groupBy: string) => {
          return (
            <div key={groupBy} className='space-y-2'>
              {groupBy !== '' && <SubTitleSlide title={groupBy} />}
              <ul
                className={clsx(
                  'grid grid-cols-list-mobile justify-between justify-items-center gap-y-4',
                  'md:mx-0 md:grid-cols-list md:gap-x-4',
                  'h-full',
                )}
              >
                {pmList
                  .filter((pm: Pokemon) => {
                    if (filter.groupBy === null) {
                      return true;
                    } else if (Array.isArray(pm[filter.groupBy])) {
                      return pm[filter.groupBy].includes(groupBy);
                    }
                    return pm[filter.groupBy] === groupBy;
                  })
                  .filter(filterPm)
                  .map((pm: Pokemon) => (
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
                      <Card pm={pm} />
                      <Link className={'stretchedLink'} to={`/pm/${pm.pid.slice(-3)}`} />
                    </li>
                  ))}
              </ul>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
