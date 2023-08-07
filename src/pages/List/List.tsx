import { useState , ChangeEvent} from 'react';
import { Link } from 'react-router-dom';
import clsx from 'clsx';

import { Pokemon, SleepTypeBgClass } from '@/types';
import { Icon, TitleSlide } from '@/components';
import dataList from '@/data/pmList.json'

import { Card, SearchBar } from './components';

function CheckboxItem({ label, icon, checked, onChange }: {
    label: string,
    icon: JSX.Element,
    checked: boolean,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
  }) {
  return (
    <div className='mb-6 h-12 w-12'>
      <input type="checkbox" name={label} id={label} className='hidden' checked={checked} onChange={onChange}/>
      <label htmlFor={label} className='flex cursor-pointer flex-col items-center'>
        <div className={clsx('rounded-full p-1', checked ? 'bg-amber-400': 'bg-amber-100')}>{icon}</div>
        <span className='text-xs'>{label}</span>
      </label>
    </div>
  );
}

function BerryButtons({handleChange, checkSet}: {handleChange: (event: ChangeEvent<HTMLInputElement>) => void, checkSet: Set<string>}) {
  const berries = [
    "靛莓果", "墨莓果", "櫻子果", "零餘果", "金枕果", "勿花果", "萄葡果", "蘋野果",
    "木子果", "芒芒果", "橙橙果", "椰木果", "桃桃果", "柿仔果", "莓莓果", "文柚果",
    "異奇果", "番荔果",
  ]

  return <div className={
      clsx(
        'grid w-full justify-items-center gap-y-2',
        'grid-cols-6 md:grid-cols-9 xl:grid-cols-18'
      )
    }>
    {
      berries.map((berry) => <CheckboxItem 
        key={berry} 
        label={berry} 
        icon={<Icon.Game.Berry name={berry} />}
        checked={checkSet.has(berry)}
        onChange={handleChange}
      />)
    }
  </div>
}

function IngredientButtons({handleChange, checkSet}: {handleChange: (event: ChangeEvent<HTMLInputElement>) => void, checkSet: Set<string>}) {
  const ingredients = [
    "粗枝大蔥", "品鮮蘑菇", "特選蛋", "窩心洋芋", "特選蘋果", "火辣香草", "豆製肉", "哞哞鮮奶",
    "甜甜蜜", "純粹油", "暖暖薑", "好眠番茄", "放鬆可可", "美味尾巴", "萌綠大豆",
  ]

  return <div className={
    clsx(
      'grid w-full justify-items-center gap-y-2',
      'grid-cols-6 md:grid-cols-9 xl:grid-cols-18'
    )
  }>
  {
    ingredients.map((ingredient) => <CheckboxItem 
      key={ingredient} 
      label={ingredient} 
      icon={<Icon.Game.Ingredient name={ingredient} />}
      checked={checkSet.has(ingredient)}
      onChange={handleChange}
    />)
  }
</div>
}


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
      <BerryButtons handleChange={handleChickChange('berries')} checkSet={filter.berries}/>

      <TitleSlide title='食材篩選' />
      <IngredientButtons handleChange={handleChickChange('ingredients')} checkSet={filter.ingredients}/>

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
        {dataList.filter((pm: Pokemon) => {
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
