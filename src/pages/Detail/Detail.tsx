import { useState, useEffect, TouchEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { Pokemon } from '@/types';
import { Icon, TitleSlide } from '@/components';
import { pmFrequencyOrder, pmEnergyOrder, pmList, berries } from '@/data';

type ContentProps = { pm: Pokemon };

type Render = {
  title: string;
  Content: ({ pm }: ContentProps) => JSX.Element;
};

type Status = {
  index: number;
  touchStart: number[];
  touchEnd: number[];
  displaySwipe: boolean;
};

const berryMap = Object.fromEntries(berries.map((berry) => [berry.name, berry.point]));

const renderData: Render[] = [
  {
    title: '分類',
    Content: ({ pm }: ContentProps) => <>{pm.sleep_type}</>,
  },
  {
    title: '屬性',
    Content: ({ pm }: ContentProps) => (
      <span className='flex items-center gap-2 pl-2'>
        <Icon.Game.Type type={pm.type} className='h-8 w-8' />
        {pm.type}
      </span>
    ),
  },
  {
    title: '專長',
    Content: ({ pm }: ContentProps) => <>{pm.specialty}</>,
  },
  {
    title: '樹果',
    Content: ({ pm }: ContentProps) => (
      <ul className='relative flex whitespace-nowrap'>
        {new Array(pm.berry_quantity).fill(0).map((_, index) => (
          <li className='w-12' key={index}>
            <Icon.Game.Berry name={pm.berry} />
          </li>
        ))}
        <li
          className={clsx(
            'absolute -right-8 bottom-0',
            'rounded-full border-[1px] border-amber-300 bg-white px-2 py-1 text-xs',
          )}
        >
          {pm.berry}
        </li>
      </ul>
    ),
  },
  {
    title: '食材',
    Content: ({ pm }: ContentProps) => (
      <ul className='mb-2 flex w-full gap-x-12 whitespace-nowrap'>
        {pm.ingredients.map((item) => (
          <li className='relative' key={item}>
            <div className='w-10'>
              <Icon.Game.Ingredient name={item} />
            </div>
            <span
              className={clsx(
                'absolute -bottom-2 left-4',
                'rounded-full border-[1px] border-amber-300 bg-white px-2 py-1 text-xs',
              )}
            >
              {item}
            </span>
          </li>
        ))}
      </ul>
    ),
  },
  {
    title: '主技能',
    Content: ({ pm }: ContentProps) => <>{pm.skill}</>,
  },
  {
    title: '主技能描述',
    Content: ({ pm }: ContentProps) => <>{pm.skill_description}</>,
  },
  {
    title: '幫忙間隔',
    Content: ({ pm }: ContentProps) => {
      const pmOrder = pmFrequencyOrder.findIndex((f) => f === pm.base_frequency) + 1;
      return (
        <>
          {pm.base_frequency} (#{pmOrder})
        </>
      );
    },
  },
  {
    title: '果實能量基準',
    Content: ({ pm }: ContentProps) => {
      const basePoint = berryMap[pm.berry];
      const totalSec = pm.base_frequency.split(':').reduce((acc, cur) => acc * 60 + Number(cur), 0);
      const energy = Math.ceil((86400 / totalSec) * (basePoint * pm.berry_quantity));
      const pmOrder = pmEnergyOrder.findIndex((e) => e === energy) + 1;
      return (
        <>
          {basePoint * pm.berry_quantity}/{totalSec}s [{energy}/day] (#{pmOrder})
        </>
      );
    },
  },
  {
    title: '友情點數',
    Content: ({ pm }: ContentProps) => {
      return <>{pm.friendship_points_needed}點</>;
    },
  },
];

function Detail() {
  const { link = '001' } = useParams();
  const pmIndex = pmList.findIndex((pm: Pokemon) => pm.pid === `#${link.padStart(4, '0')}`);
  const navigate = useNavigate();

  const [status, setStatus] = useState<Status>({
    index: pmIndex,
    touchStart: [0, 0],
    touchEnd: [0, 0],
    displaySwipe: true,
  });

  const pm = pmList[status.index];

  setTimeout(function () {
    setStatus((prevStatus) => ({
      ...prevStatus,
      displaySwipe: false,
    }));
  }, 2000);

  const handleTouchStart = (event: TouchEvent) => {
    const { clientX, clientY } = event.touches[0];
    setStatus((prevStatus) => ({
      ...prevStatus,
      touchStart: [clientX, clientY],
    }));
  };

  const handleTouchEnd = (event: TouchEvent) => {
    const { clientX, clientY } = event.changedTouches[0];
    setStatus((prevStatus) => ({
      ...prevStatus,
      touchEnd: [clientX, clientY],
    }));
  };

  const handleSwipe = (plusMinus: number) => {
    setStatus((prevStatus) => {
      let newIndex = prevStatus.index + plusMinus;
      if (newIndex < 0) {
        newIndex = pmList.length - 1;
      } else if (newIndex >= pmList.length) {
        newIndex = 0;
      }

      return {
        ...prevStatus,
        index: newIndex,
      };
    });
  };

  useEffect(() => {
    document.title = `Sleep ${pm.name}`;
  }, [pm]);

  useEffect(() => {
    const { touchStart, touchEnd } = status;

    const swipeDistanceX = touchEnd[0] - touchStart[0];
    const swipeDistanceY = touchEnd[1] - touchStart[1];

    if (Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY) && Math.abs(swipeDistanceX) > 50) {
      swipeDistanceX > 0 ? handleSwipe(-1) : handleSwipe(1);
    }
  }, [status.touchEnd]);

  useEffect(() => {
    navigate(`/pm/${pmList[status.index].pid.slice(-3)}`);
  }, [status.index]);

  return (
    <section
      className='relative space-y-4'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <div className='relative flex justify-center'>
        <div className='z-10 md:h-[273px]'>
          <Icon.Game.PmFull pm={pm} />
        </div>
        <div className='z-10 md:h-[273px]'>
          <Icon.Game.PmFull pm={pm} shiny={true} />
        </div>

        {/* bg banner */}
        <div
          className={clsx(
            'absolute -inset-x-4 bottom-0 z-0 h-3/5 md:inset-x-0',
            'md:rounded-2xl',
            'bg-custom-green/60',
          )}
        />

        <Icon.Before
          className={clsx(
            'absolute bottom-8 left-0 hidden h-32 w-32',
            'cursor-pointer fill-slate-100 opacity-40 md:block',
          )}
          onClick={() => handleSwipe(-1)}
        />
        <Icon.Next
          className={clsx(
            'absolute bottom-8 right-0 hidden h-32 w-32',
            'cursor-pointer fill-slate-100 opacity-40 md:block',
          )}
          onClick={() => handleSwipe(1)}
        />
      </div>

      <h2 className='text-2xl'>
        #{pm.pid.slice(2)} {pm.name}
      </h2>

      <TitleSlide title='基本資訊' />
      <ul className='grid grid-cols-2 gap-y-4'>
        {renderData.map((data, index) => (
          <li
            className={clsx('flex h-10 items-center gap-x-2', index > 3 && 'col-span-2')}
            key={index}
          >
            <span
              className={clsx(
                'py-px',
                'shrink-0 grow-0 basis-[30%]',
                'border-2 border-solid border-custom-green',
                'rounded-full text-center text-sm text-black',
              )}
            >
              {data.title}
            </span>

            <data.Content pm={pm} />
          </li>
        ))}
      </ul>

      <TitleSlide title='睡姿' />
      <div className='relative flex justify-center text-center'>
        {new Array(2).fill(0).map((_, i) => {
          return (
            <div className='relative z-10' key={i}>
              <span className='absolute inset-x-0 top-0 text-xl'>{pm.sleep[i]}</span>
              <Icon.Game.PmSleep pm={pm} index={i} />
            </div>
          );
        })}

        {/* bg banner */}
        <div
          className={clsx(
            'absolute -inset-x-4 bottom-0 z-0 h-3/5 md:inset-x-0',
            'md:rounded-2xl',
            'bg-custom-green/60',
          )}
        />
      </div>

      <Icon.Swipe
        className={clsx(
          'absolute inset-0 -z-10 h-full w-full fill-slate-200',
          'transition duration-[2s]',
          status.displaySwipe ? 'block opacity-40 md:hidden' : 'opacity-0',
        )}
      />
    </section>
  );
}

export default Detail;
