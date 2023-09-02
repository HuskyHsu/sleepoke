import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { areas } from '@/data';

type Meal = {
  type: string;
  size: number;
};

type Week = {
  timestamp: number;
  area: string;
  meal: Meal;
  snorlaxLike: string[];
};

interface WeekContextProps {
  week: Week;
  toggleArea: (area: string) => void;
  toggleMealType: (mealType: string) => void;
  toggleMealSize: (size: number) => void;
}

const localStorageKey = 'week';

const init: Week = {
  timestamp: new Date().getTime(),
  area: areas[0],
  snorlaxLike: [],
  meal: {
    type: '咖哩',
    size: 15,
  },
};

const Context = createContext<WeekContextProps | undefined>(undefined);

export function WeekProvider({ children }: { children: ReactNode }) {
  const [week, setWeek] = useState<Week>(() => {
    const savedWeek = localStorage.getItem(localStorageKey) || '{}';
    const oldWeek = JSON.parse(savedWeek);
    return {
      timestamp: new Date().getTime(),
      area: oldWeek.area || init.area,
      snorlaxLike: oldWeek.snorlaxLike || init.snorlaxLike,
      meal: {
        type: oldWeek.meal?.type ? oldWeek.meal.type : init.meal.type,
        size: oldWeek.meal?.size ? oldWeek.meal.size : init.meal.size,
      },
    };
  });

  const toggleArea = (area: string) => {
    setWeek((prevWeek) => {
      return {
        ...prevWeek,
        timestamp: new Date().getTime(),
        area: area,
      };
    });
  };

  const toggleMealType = (mealType: string) => {
    setWeek((prevWeek) => {
      return {
        ...prevWeek,
        timestamp: new Date().getTime(),
        meal: {
          ...prevWeek.meal,
          type: mealType,
        },
      };
    });
  };

  const toggleMealSize = (mealSize: number) => {
    setWeek((prevWeek) => {
      return {
        ...prevWeek,
        timestamp: new Date().getTime(),
        meal: {
          ...prevWeek.meal,
          size: mealSize,
        },
      };
    });
  };

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(week));
  }, [week]);

  const contextValue: WeekContextProps = {
    week,
    toggleArea,
    toggleMealType,
    toggleMealSize,
  };

  return <Context.Provider value={contextValue}>{children}</Context.Provider>;
}

export function useWeek() {
  const week = useContext(Context);
  if (week === undefined) {
    throw new Error('useWeek必須在WeekProvider內部使用');
  }
  return week;
}
