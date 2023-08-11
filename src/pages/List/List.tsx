import { useState , ChangeEvent} from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { Pokemon, SleepTypeBgClass } from '@/types';
import { Icon, SubTitleSlide, TitleSlide } from '@/components';
import pmList from '@/data/pmList.json'
import berries from '@/data/berries.json'
import ingredients from '@/data/ingredients.json'

import { Card, SearchBar, Buttons, Filter, Category, TextButtons } from './components';

type Filter = {
  keyword: string;
  berries: Set<string>;
  ingredients: Set<string>;
  displayFilter: boolean;
  groupBy: keyof Pick<Pokemon, 'sleep_type' | 'berry' | 'ingredients' | 'type'> | null;
  displayGroupBy: boolean;
}

function List() {
  const [filter, setFilter] = useState<Filter>({
    keyword: '',
    berries: new Set<string>(),
    ingredients: new Set<string>(),
    displayFilter: false,
    groupBy: null,
    displayGroupBy: false,
  })

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {  value } = event.target;
    setFilter(prevSearch => ({
      ...prevSearch,
      keyword: value,
    }));
  };

  const handleChickChange = (key: 'berries' | 'ingredients') => (event: ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setFilter(prevSearch => {
      if (checked) {
        prevSearch[key].add(name)
      } else {
        prevSearch[key].delete(name)
      }

      return {
        ...prevSearch,
        [key]: prevSearch[key]
      }
    });
  };

  const handleGroupByChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setFilter(prevSearch => {
      return {
        ...prevSearch,
        groupBy: name !== 'none' ? name as Extract<Filter['groupBy'], keyof Pokemon> : null
      }
    });
  };

  const handleCategoryChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setFilter(prevSearch => {
      return {
        ...prevSearch,
        displayGroupBy: checked
      }
    });
  };

  const handleFilterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { checked } = event.target;

    setFilter(prevSearch => {
      return {
        ...prevSearch,
        displayFilter: checked
      }
    });
  };

  const filterPm = (pm: Pokemon) => {
    let display = filter.keyword === ''

    if (filter.keyword != '') {
      display = pm.name.includes(filter.keyword)
    }

    if (display && filter.berries.size > 0) {
      display = filter.berries.has(pm.berry)
    }

    if (display && filter.ingredients.size > 0) {
      display = pm.ingredients.find((ingredient) => filter.ingredients.has(ingredient)) !== undefined
    }

    return display
  }

  let groupByList: string[] = ['']
  if (filter.groupBy !== null) {
    groupByList = pmList.map((pm: Pokemon) => pm[filter.groupBy as Extract<Filter['groupBy'], keyof Pokemon>]).flat()
    groupByList = [...new Set(groupByList)]
  }

  return (
    <div className='flex flex-col gap-y-4'>
      <div className="-mb-4 flex justify-end py-3">
        <div className="flex w-full items-center gap-x-3">
          <SearchBar value={filter.keyword} onChange={handleInputChange}/>
          <Filter checked={filter.displayFilter} onChange={handleFilterChange}/>
          <Category checked={filter.displayGroupBy} onChange={handleCategoryChange}/>
        </div>
      </div>

      <div className={clsx(
        'origin-top space-y-4 overflow-hidden transition-all duration-300',
        filter.displayFilter
          ? 'h-full scale-y-100 opacity-100'
          : 'h-0 scale-y-0 opacity-0',
      )}>
        <SubTitleSlide title='篩選：樹果' />
        <Buttons
          list={berries}
          Icon={Icon.Game.Berry}
          checkSet={filter.berries}
          handleChange={handleChickChange('berries')}
        />
        <SubTitleSlide title='篩選：食材' />
        <Buttons
          list={ingredients}
          Icon={Icon.Game.Ingredient}
          checkSet={filter.ingredients}
          handleChange={handleChickChange('ingredients')}
        />
      </div>

      <div className={clsx(
        'origin-top space-y-4 overflow-hidden transition-all duration-300',
        filter.displayGroupBy
          ? 'h-full scale-y-100 opacity-100'
          : 'h-0 scale-y-0 opacity-0',
      )}>
        <SubTitleSlide title='分組方式' />
        <TextButtons
          list={[{key: 'none', name: '無'}, {key: 'sleep_type', name: '睡眠分類'}, {key: 'berry', name: '樹果'}, {key: 'ingredients', name: '食材'}, {key: 'type', name: '屬性'}]}
          select={filter.groupBy}
          handleChange={handleGroupByChange}
        />
      </div>

      <TitleSlide title='清單' />
      <div className='space-y-8'>
        {
          groupByList.map((groupBy: string) => {
            return (
              <div key={groupBy} className='space-y-2'>
                {groupBy !== "" && <SubTitleSlide title={groupBy} />}
                <ul
                  className={clsx(
                    'grid grid-cols-list-mobile justify-between justify-items-center gap-y-4',
                    'md:mx-0 md:grid-cols-list md:gap-x-4',
                    'h-full',
                  )}
                >
                  {
                    pmList.filter((pm: Pokemon) => {
                      if (filter.groupBy === null) {
                        return true
                      } else if (Array.isArray(pm[filter.groupBy])) {
                        return pm[filter.groupBy].includes(groupBy)
                      }
                      return pm[filter.groupBy] === groupBy
                    }).filter(filterPm)
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
                          <Link
                            className={'stretchedLink'}
                            to={`/pm/${pm.pid.slice(-3)}`}
                          />
                        </li>
                      ))
                  }
                  </ul>
                </div>
            )
          })
        }
      </div>
    </div>
  );
}

export default List;
