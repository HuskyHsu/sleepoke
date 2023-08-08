import { useState , ChangeEvent} from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { Pokemon, SleepTypeBgClass } from '@/types';
import { Icon, TitleSlide } from '@/components';
import pmList from '@/data/pmList.json'
import berries from '@/data/berries.json'
import ingredients from '@/data/ingredients.json'

import { Card, SearchBar, Buttons } from './components';

type Filter = {
  keyword: string;
  berries: Set<string>;
  ingredients: Set<string>;
}

function List() {
  const [filter, setFilter] = useState<Filter>({
    keyword: '',
    berries: new Set<string>(),
    ingredients: new Set<string>(),
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

  return (
    <div className='flex flex-col gap-y-4'>
      <div className="-mb-4 flex items-center justify-between py-3">
        <h2>Pokemon List</h2>
        <div className="flex items-center gap-0">
          <SearchBar value={filter.keyword} onChange={handleInputChange}/>
        </div>
      </div>

      <TitleSlide title='樹果篩選' />
      <Buttons 
        list={berries} 
        Icon={Icon.Game.Berry}
        checkSet={filter.berries}
        handleChange={handleChickChange('berries')}
      />

      <TitleSlide title='食材篩選' />
      <Buttons 
        list={ingredients} 
        Icon={Icon.Game.Ingredient}
        checkSet={filter.ingredients}
        handleChange={handleChickChange('ingredients')}
      />

      {/* <div>
      group by 睡覺分類，食材，樹果 or None
      </div> */}

      <TitleSlide title='清單' />

      <ul
        className={clsx(
          'grid grid-cols-list-mobile justify-between justify-items-center gap-y-4',
          'md:mx-0 md:grid-cols-list md:gap-x-4',
          'h-full',
        )}
      >
        {pmList.filter((pm: Pokemon) => {
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
        }).map((
          pm: Pokemon,
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
            key={pm.pid}
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
