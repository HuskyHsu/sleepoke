import clsx from 'clsx';
import { Pokemon } from '@/types';
import { Icon } from '@/components';

type Props = {
  pm: Pokemon;
  i: number;
};

export function ShowStyle({ pm, i }: Props) {
  const Stand =
    i < 3 ? (
      <Icon.Stand className='absolute bottom-0 h-full w-full' />
    ) : (
      <Icon.Snorlax className='absolute bottom-0 h-full w-full' />
    );

  return (
    <div className='relative h-64 w-64'>
      {Stand}
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
  );
}
