import { ChangeEvent, useRef } from 'react';
import clsx from 'clsx';
import { CheckboxItem, Icon, SubTitleSlide } from '@/components';
import { areas, berries } from '@/data';
import { useWeek } from '../contexts';

type Props = {
  checkSet: Set<string>;
  list: string[];
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  Icon?: ({ name, size }: { name: string; size?: string }) => JSX.Element;
  wrap?: boolean;
};

function Buttons({ list, checkSet, Icon, handleChange, wrap = true }: Props) {
  return (
    <div
      className={clsx(
        'flex w-full justify-items-center gap-x-4 gap-y-3',
        wrap ? 'flex-wrap pb-2 pl-2' : 'overflow-x-scroll overscroll-none whitespace-nowrap p-2',
        '',
      )}
    >
      {list.map((item) => (
        <CheckboxItem
          key={item}
          label={item}
          checked={checkSet.has(item)}
          onChange={handleChange}
          prefixKey='snorlax'
        >
          {Icon && <Icon name={item} size='h-10 w-10' />}
        </CheckboxItem>
      ))}
    </div>
  );
}

export function Snorlax({ toggleSnorlaxModal }: { toggleSnorlaxModal: () => void }) {
  const { week, toggleArea, toggleLevel, toggleSubLevel, toggleSnorlaxLike } = useWeek();

  const outerDivRef = useRef<HTMLDivElement>(null);
  const innerDivRef = useRef<HTMLDivElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (event.target !== innerDivRef.current) {
      toggleSnorlaxModal();
    }
  };

  const handleInnerClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation();
  };

  return (
    <div
      className={clsx(
        'fixed inset-x-0 top-0 z-50 h-full max-h-full w-full',
        'overflow-y-auto overflow-x-hidden p-4',
        'bg-slate-600/40',
        'flex flex-col items-center',
        'justify-start',
      )}
      ref={outerDivRef}
      onClick={handleClick}
    >
      <div
        className={clsx('max-h-full w-full max-w-md')}
        ref={innerDivRef}
        onClick={handleInnerClick}
      >
        <div className='rounded-lg bg-white shadow'>
          <div className='flex items-center justify-between rounded-t border-b px-5 py-2'>
            <h3 className='text-xl font-medium'>卡比獸調查</h3>
            <Icon.Close className='h-3 w-3 cursor-pointer' onClick={() => toggleSnorlaxModal()} />
          </div>
          <div className='space-y-4 p-6'>
            <SubTitleSlide title='區域' />
            <Buttons
              list={areas}
              checkSet={new Set([week.area])}
              handleChange={(e) => {
                toggleArea(e.target.name.split(':')[1]);
              }}
            />

            <SubTitleSlide title='愛吃的三種樹果' />
            <Buttons
              list={berries.map((berry) => berry.name)}
              Icon={Icon.Game.Berry}
              checkSet={new Set(week.snorlaxLike)}
              handleChange={(e) => {
                toggleSnorlaxLike(e.target.name.split(':')[1]);
              }}
            />

            <SubTitleSlide title='卡比獸等級(我還沒想好怎麼用，所以沒作用)' />
            <Buttons
              list={['普通', '超級', '高級', '大師']}
              Icon={Icon.Game.Rank}
              checkSet={new Set([week.level])}
              handleChange={(e) => {
                toggleLevel(e.target.name.split(':')[1]);
              }}
            />
            <Buttons
              list={new Array(week.level !== '大師' ? 5 : 20).fill(0).map((_, i) => String(i + 1))}
              checkSet={new Set([String(week.subLevel)])}
              handleChange={(e) => {
                toggleSubLevel(e.target.name.split(':')[1]);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
