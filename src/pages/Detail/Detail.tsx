import { useParams } from 'react-router-dom';
import clsx from 'clsx';

import { Pokemon } from '@/types';
import { Icon, TitleSlide } from '@/components';
import { pmList } from '@/data';

type Render =
  | {
      title: string;
      key: keyof Pokemon;
      content?: never;
    }
  | {
      title: string;
      content: (pm: Pokemon) => JSX.Element;
      key?: never;
    };

const renderData: Render[] = [
  {
    title: '分類',
    key: 'sleep_type',
  },
  {
    title: '分類',
    key: 'type',
  },
  {
    title: '專長',
    key: 'specialty',
  },
  {
    title: '樹果',
    content: (pm: Pokemon) => (
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
    content: (pm) => (
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
    key: 'skill',
  },
  {
    title: '主技能描述',
    key: 'skill_description',
  },
];

function Moves() {
  const { link = '001' } = useParams();
  const pm = pmList.find((pm: Pokemon) => pm.pid === `#${link.padStart(4, '0')}`) || pmList[0];

  return (
    <section className='space-y-4'>
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
            'absolute -inset-x-4 bottom-0 z-0 h-1/2 md:inset-x-0',
            'md:rounded-2xl',
            'bg-custom-green/60',
          )}
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

            {data.content ? data.content(pm) : (pm[data.key] as string)}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default Moves;
