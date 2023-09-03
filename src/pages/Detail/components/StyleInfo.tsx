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
            <p>{style.area}</p>
            <p>
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
