import { ReactNode, createContext, useContext, useEffect, useState } from 'react';
import { areas } from '@/data';

type Meal = {
  type: string;
  size: number;
};

type Week = {
  timestamp: number;
  area: string;
  level: string;
  subLevel: number;
  meal: Meal;
  snorlaxLike: string[];
};

interface WeekContextProps {
  week: Week;
  toggleArea: (area: string) => void;
  toggleLevel: (level: string) => void;
  toggleSubLevel: (subLevel: string) => void;
  toggleMealType: (mealType: string) => void;
  toggleMealSize: (size: number) => void;
  toggleSnorlaxLike: (name: string) => void;
}

const localStorageKey = 'week';

const init: Week = {
  timestamp: new Date().getTime(),
  area: areas[0],
  level: '普通',
  subLevel: 1,
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
      level: oldWeek.level || init.level,
      subLevel: oldWeek.subLevel || init.subLevel,
      snorlaxLike: oldWeek.snorlaxLike || init.snorlaxLike,
      meal: {
        type: oldWeek.meal?.type ? oldWeek.meal.type : init.meal.type,
        size: oldWeek.meal?.size ? oldWeek.meal.size : init.meal.size,
      },
    };
  });

  const toggleArea = (area: string) => {
    setWeek((prevWeek) => {
      const likeMap: Record<string, string[]> = {
        天青沙灘: ['橙橙果', '桃桃果', '椰木果'],
        灰褐洞窟: ['蘋野果', '勿花果', '文柚果'],
        白花雪原: ['莓莓果', '柿仔果', '異奇果'],
      };

      return {
        ...prevWeek,
        timestamp: new Date().getTime(),
        area: area,
        level: '普通',
        subLevel: 1,
        snorlaxLike: likeMap[area] || [],
      };
    });
  };

  const toggleLevel = (level: string) => {
    setWeek((prevWeek) => {
      return {
        ...prevWeek,
        timestamp: new Date().getTime(),
        level: level,
        subLevel: 1,
      };
    });
  };

  const toggleSubLevel = (level: string) => {
    setWeek((prevWeek) => {
      return {
        ...prevWeek,
        timestamp: new Date().getTime(),
        subLevel: Number(level),
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

  const toggleSnorlaxLike = (name: string) => {
    setWeek((prevWeek) => {
      if (prevWeek.snorlaxLike.includes(name)) {
        prevWeek.snorlaxLike = prevWeek.snorlaxLike.filter((berry) => berry !== name);
      } else {
        prevWeek.snorlaxLike.push(name);
      }

      return {
        ...prevWeek,
        snorlaxLike: prevWeek.snorlaxLike.slice(0, 3),
      };
    });
  };

  useEffect(() => {
    localStorage.setItem(localStorageKey, JSON.stringify(week));
  }, [week]);

  const contextValue: WeekContextProps = {
    week,
    toggleArea,
    toggleLevel,
    toggleSubLevel,
    toggleMealType,
    toggleMealSize,
    toggleSnorlaxLike,
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
