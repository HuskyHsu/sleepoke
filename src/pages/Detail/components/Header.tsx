import clsx from 'clsx';

import { Icon } from '@/components';
import { Pokemon } from '@/types';

type Props = {
  pm: Pokemon;
  handleSwipe: (plusMinus: number) => void;
};

export function Header({ pm, handleSwipe }: Props) {
  return (
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
          'absolute bottom-8 left-0 z-20 hidden h-32 w-32',
          'cursor-pointer fill-slate-100 opacity-40 md:block',
        )}
        onClick={() => handleSwipe(-1)}
      />
      <Icon.Next
        className={clsx(
          'absolute bottom-8 right-0 z-20 hidden h-32 w-32',
          'cursor-pointer fill-slate-100 opacity-40 md:block',
        )}
        onClick={() => handleSwipe(1)}
      />
    </div>
  );
}
