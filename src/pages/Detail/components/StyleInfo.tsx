import { sleepType } from '@/types';
import { Icon } from '@/components';

type Props = {
  sleepStyle: (sleepType & {
    area: string;
  })[];
};

export function StyleInfo({ sleepStyle }: Props) {
  return (
    <div className='-mt-4 flex text-center text-base'>
      {sleepStyle.map((style, i) => {
        return (
          <div key={i} className='flex flex-col justify-center px-4 py-0 text-center'>
            <p className='whitespace-nowrap'>{style.area}</p>
            <p className='whitespace-nowrap'>
              <Icon.Game.Rank name={style.level} />
              {style.level}
              {style.subLevel}
            </p>
          </div>
        );
      })}
    </div>
  );
}
