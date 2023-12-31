import { useEffect } from 'react';

import { Pokemon } from '@/types';
import { SubTitleSlide, TitleSlide } from '@/components';
import { pmList, areas } from '@/data';

import { SearchBar, Filter, Category, Indicator } from './components';
import { ToolBar } from './ToolBar';
import { Group } from './Group';
import { UseFilter } from './UseFilter';

export type Filter = {
  keyword: string;
  berries: Set<string>;
  ingredients: Set<string>;
  onlyFirstIngredient: boolean;
  skills: Set<string>;
  specialties: Set<string>;
  locations: Set<string>;
  displayFilter: boolean;
  groupBy:
    | keyof Pick<Pokemon, 'sleep_type' | 'berry' | 'ingredients' | 'type' | 'specialty' | 'skill'>
    | 'level'
    | null;
  displayGroupBy: boolean;
  level: string;
  subLevel: number;
  isUseSnorlaxBerries: boolean;
  isUseSnorlaxLocations: boolean;
};

export type groupByKeys = keyof Pick<
  Filter,
  'berries' | 'ingredients' | 'skills' | 'specialties' | 'locations'
>;
export type checkKeys = keyof Pick<
  Filter,
  | 'displayGroupBy'
  | 'displayFilter'
  | 'onlyFirstIngredient'
  | 'isUseSnorlaxBerries'
  | 'isUseSnorlaxLocations'
>;

function List() {
  const {
    filter,
    handleInputChange,
    handleChickChange,
    removeFilter,
    handleGroupByChange,
    handleCheckChange,
  } = UseFilter();

  useEffect(() => {
    document.title = `Sleep Pokédex`;
  }, []);

  let groupByList: string[] = [''];
  if (filter.groupBy !== null) {
    if (filter.groupBy === 'level') {
      if (filter.locations.size === 1) {
        groupByList = ['普通', '超級', '高級', '大師'].flatMap((rank) =>
          new Array(rank !== '大師' ? 5 : 20).fill(0).map((_, i) => `${rank}${i + 1}`),
        );
      }
    } else {
      groupByList = pmList
        .map((pm: Pokemon) => pm[filter.groupBy as Extract<Filter['groupBy'], keyof Pokemon>])
        .flat();
      groupByList = [...new Set(groupByList)];
    }
  }

  const hasFilter = [
    filter.berries,
    filter.ingredients,
    filter.skills,
    filter.specialties,
    filter.locations,
  ].some((set) => set.size > 0);

  let area = areas[0];
  if (filter.groupBy === 'level') {
    area = areas.find((area) => filter.locations.has(area.name)) || areas[0];
  }

  return (
    <div className='flex flex-col'>
      <div className='flex justify-end py-3'>
        <div className='flex w-full items-center gap-x-3 md:w-3/5 lg:w-1/3'>
          <SearchBar value={filter.keyword} onChange={handleInputChange} />
          <div className='relative'>
            <Filter checked={filter.displayFilter} onChange={handleCheckChange('displayFilter')} />
            {hasFilter && <Indicator />}
          </div>
          <div className='relative'>
            <Category
              checked={filter.displayGroupBy}
              onChange={handleCheckChange('displayGroupBy')}
            />
            {filter.groupBy !== null && <Indicator />}
          </div>
        </div>
      </div>

      <ToolBar
        filter={filter}
        handleChickChange={handleChickChange}
        handleGroupByChange={handleGroupByChange}
        removeFilter={removeFilter}
        handleFirstChange={handleCheckChange('onlyFirstIngredient')}
        handleCheckChange={handleCheckChange}
      />

      <TitleSlide title='清單' />
      <div className='mt-4 space-y-8'>
        {groupByList.map((groupBy: string, i: number, list: string[]) => {
          let subTitle = groupBy;
          if (filter.groupBy === 'level') {
            subTitle += ` (卡比獸能量：${area.strength[i].toLocaleString('zh-TW')} 分)${
              i < list.length - 1
                ? ` 下一等需 ${(area.strength[i + 1] - area.strength[i]).toLocaleString(
                    'zh-TW',
                  )} 分`
                : ''
            }`;
          }
          return (
            <div key={groupBy} className='space-y-2'>
              {groupBy !== '' && <SubTitleSlide title={subTitle} />}
              <Group pmList={pmList} filter={filter} groupBy={groupBy} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default List;
