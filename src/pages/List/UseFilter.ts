import { ChangeEvent, useState } from 'react';
import { Pokemon } from '@/types';
import { Filter, groupByKeys } from './List';

export function UseFilter() {
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

  const handleCheckChange =
    (key: keyof Pick<Filter, 'displayGroupBy' | 'displayFilter' | 'onlyFirstIngredient'>) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      const { checked } = event.target;

      setFilter((prevSearch) => {
        return {
          ...prevSearch,
          [key]: checked,
        };
      });
    };

  return {
    filter,
    handleInputChange,
    handleChickChange,
    removeFilter,
    handleGroupByChange,
    handleCheckChange,
  };
}
