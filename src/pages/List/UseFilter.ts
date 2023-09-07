import { ChangeEvent, useEffect, useState } from 'react';
import { Pokemon } from '@/types';
import { Filter, groupByKeys } from './List';
import { useWeek } from '@/components/contexts';

export function UseFilter() {
  const { week } = useWeek();

  const [filter, setFilter] = useState<Filter>({
    keyword: '',
    berries: new Set<string>(),
    ingredients: new Set<string>(),
    onlyFirstIngredient: false,
    skills: new Set<string>(),
    specialties: new Set<string>(),
    locations: new Set<string>(),
    displayFilter: false,
    groupBy: null,
    displayGroupBy: false,
    isUseSnorlaxBerries: false,
    isUseSnorlaxLocations: false,
    level: '',
    subLevel: 0,
  });

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setFilter((prevSearch) => ({
      ...prevSearch,
      keyword: value,
    }));
  };

  const handleChickChange = (key: groupByKeys) => (event: ChangeEvent<HTMLInputElement>) => {
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

  const removeFilter = (key: groupByKeys, name: string) => {
    setFilter((prevSearch) => {
      prevSearch[key].delete(name);

      const newSearch = {
        ...prevSearch,
        [key]: prevSearch[key],
      };

      if (key === 'berries') {
        newSearch.isUseSnorlaxBerries = false;
      } else if (key === 'locations') {
        newSearch.isUseSnorlaxLocations = false;
        if (newSearch.groupBy === 'level') {
          newSearch.groupBy = null;
        }
      }

      return newSearch;
    });
  };

  const handleGroupByChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setFilter((prevSearch) => {
      if (name === 'level' && prevSearch.locations.size !== 1) {
        alert('請選擇一個區域出來');
        return prevSearch;
      }

      return {
        ...prevSearch,
        groupBy: name !== 'none' ? (name as Extract<Filter['groupBy'], keyof Pokemon>) : null,
      };
    });
  };

  const handleCheckChange =
    (
      key: keyof Pick<
        Filter,
        | 'displayGroupBy'
        | 'displayFilter'
        | 'onlyFirstIngredient'
        | 'isUseSnorlaxBerries'
        | 'isUseSnorlaxLocations'
      >,
    ) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;

      setFilter((prevSearch) => {
        const newSearch = {
          ...prevSearch,
          [key]: checked,
        };

        if (key === 'isUseSnorlaxBerries' && checked === false) {
          newSearch.berries = new Set();
        } else if (key === 'isUseSnorlaxLocations' && checked === false) {
          newSearch.locations = new Set();
        }

        return newSearch;
      });
    };

  useEffect(() => {
    setFilter((prevSearch) => {
      if (!filter.isUseSnorlaxBerries) {
        return prevSearch;
      }

      return {
        ...prevSearch,
        berries: new Set(week.snorlaxLike),
      };
    });
  }, [filter.isUseSnorlaxBerries, week]);

  useEffect(() => {
    setFilter((prevSearch) => {
      if (!filter.isUseSnorlaxLocations) {
        return prevSearch;
      }

      return {
        ...prevSearch,
        locations: new Set([week.area]),
      };
    });
  }, [filter.isUseSnorlaxLocations, week]);

  return {
    filter,
    handleInputChange,
    handleChickChange,
    removeFilter,
    handleGroupByChange,
    handleCheckChange,
  };
}
