import clsx from 'clsx';
import { Link } from "react-router-dom";

import { Pokemon, SleepTypeBgClass } from '@/types';
import { Icon } from '@/components';
import dataList from '@/data/pmList.json'
import { Card, SearchBar } from './components';

function List() {
  const berries = [
    "靛莓果", "墨莓果", "櫻子果", "零餘果", "金枕果", "勿花果", "萄葡果", "蘋野果",
    "木子果", "芒芒果", "橙橙果", "椰木果", "桃桃果", "柿仔果", "莓莓果", "文柚果",
    "異奇果", "番荔果",
  ]

  const ingredients = [
    "粗枝大蔥", "品鮮蘑菇", "特選蛋", "窩心洋芋", "特選蘋果", "火辣香草", "豆製肉", "哞哞鮮奶",
    "甜甜蜜", "純粹油", "暖暖薑", "好眠番茄", "放鬆可可", "美味尾巴", "萌綠大豆",
  ]


  return (
    <div className='flex flex-col'>
      <div className="flex items-center justify-between py-3">
        <h2>Pokemon List</h2>
        <div className="flex items-center gap-3">
          <SearchBar/>
        </div>
      </div>

      <hr />

      <div className={
        clsx(
          'grid w-full gap-4',
          'grid-cols-6 md:grid-cols-9 xl:grid-cols-18'
        )
      }>
      {
        berries.map((berry) => <span className='h-16 w-16' key={berry}><Icon.Game.Berry name={berry} /></span>)
      }
      </div>

      <hr />

      <div className={
        clsx(
          'grid w-full gap-4',
          'grid-cols-5 xl:grid-cols-15'
        )
      }>
      {
        ingredients.map((ingredient) => <span className='h-16 w-16' key={ingredient}><Icon.Game.Ingredient name={ingredient} /></span>)
      }
      </div>

      <div>
      group by 睡覺分類，食材，樹果 or None
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
