import clsx from 'clsx';

import { Icon, TitleSlide } from '@/components';
import { Pokemon } from '@/types';
import { berries, pmEnergyOrder, pmFrequencyOrder } from '@/data';

type Props = {
  pm: Pokemon;
};

type ContentProps = { pm: Pokemon };

type Render = {
  title: string;
  Content: ({ pm }: ContentProps) => JSX.Element;
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
          <li className='w-8' key={index}>
            <Icon.Game.Berry name={pm.berry} />
          </li>
        ))}
        <li
          className={clsx(
            'absolute -bottom-2 -right-10',
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

export function Info({ pm }: Props) {
  return (
    <>
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
    </>
  );
}
