import { useState, useEffect, TouchEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import clsx from 'clsx';

import { Pokemon, sleepType } from '@/types';
import { Icon, TitleSlide } from '@/components';
import { pmList, areas } from '@/data';

import { Header, Info } from './components';

type Status = {
  index: number;
  displaySwipe: boolean;
};

function Detail() {
  const { link = '001' } = useParams();
  const pmIndex = pmList.findIndex((pm: Pokemon) => pm.pid === `#${link.padStart(4, '0')}`);
  const navigate = useNavigate();
  let touchStart = [0, 0];

  const [status, setStatus] = useState<Status>({
    index: pmIndex,
    displaySwipe: true,
  });

  const pm = pmList[status.index];

  const allSleepStyle = areas.reduce(
    (acc, cur) => {
      acc = acc.concat(
        (pm.locations[cur as keyof typeof pm.locations] || []).map((location) => {
          return {
            ...location,
            area: cur,
          };
        }),
      );

      return acc;
    },
    [] as (sleepType & { area: string })[],
  );

  const handleTouchStart = (event: TouchEvent) => {
    const { clientX, clientY } = event.touches[0];
    touchStart = [clientX, clientY];
  };

  const handleTouchEnd = (event: TouchEvent) => {
    const { clientX, clientY } = event.changedTouches[0];

    const swipeDistanceX = clientX - touchStart[0];
    const swipeDistanceY = clientY - touchStart[1];

    if (Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY) && Math.abs(swipeDistanceX) > 50) {
      swipeDistanceX > 0 ? handleSwipe(-1) : handleSwipe(1);
    }
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
    setTimeout(function () {
      setStatus((prevStatus) => ({
        ...prevStatus,
        displaySwipe: false,
      }));
    }, 2000);
  }, []);

  useEffect(() => {
    navigate(`/pm/${pmList[status.index].pid.slice(-3)}`);
  }, [status.index]);

  return (
    <section
      className='relative space-y-4'
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <Header pm={pm} handleSwipe={handleSwipe} />
      <Info pm={pm} />

      <TitleSlide title='睡姿' />

      <div className='flex flex-col justify-around gap-y-10 md:grid md:grid-cols-2'>
        {new Array(4).fill(0).map((_, i) => {
          const sleepStyle = allSleepStyle.filter((style) => style.style === i);
          if (i == 3 && sleepStyle.length === 0) return null;

          return (
            <div key={i} className='flex flex-col items-center'>
              <div className='relative h-64 w-64'>
                {i < 3 ? (
                  <Icon.Stand className='absolute bottom-0 h-full w-full' />
                ) : (
                  <Icon.Snorlax className='absolute bottom-0 h-full w-full' />
                )}
                <div
                  className={clsx(
                    'absolute flex w-full items-center justify-center',
                    i < 3 ? 'bottom-16' : 'bottom-28 left-4',
                  )}
                >
                  {<Icon.Game.PmSleep pm={pm} index={i} />}
                </div>
                <div className='absolute inset-x-0 bottom-[15%] mx-auto'>
                  <div
                    className={clsx(
                      'mx-auto w-fit rounded-full border-2',
                      'border-custom-green bg-white px-4 py-1 text-base',
                    )}
                  >
                    {pm.sleep[i] || '大肚上睡'}
                  </div>
                </div>
              </div>
              <div className='-mt-4 flex text-center text-base' key={i}>
                {sleepStyle.map((style, i) => {
                  return (
                    <div key={i} className='flex flex-col justify-center px-4 py-0 text-center'>
                      <p>{style.area}</p>
                      <p>
                        <Icon.Game.Rank rank={style.level} />
                        {style.level}
                        {style.subLevel}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
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
