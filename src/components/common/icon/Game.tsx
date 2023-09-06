import { Pokemon, Berrys, Ingredients, Meals, Ranks, Type as TypeEnum } from '@/types';
import clsx from 'clsx';

function PmFull({ pm, shiny = false }: { pm: Pokemon; shiny?: boolean }) {
  const imgSrc = (pid: string) =>
    `${process.env.PUBLIC_URL}/image/pm/${pid.slice(-3)}${shiny ? '_s' : ''}.png`;
  return <img src={imgSrc(pm.pid)} alt={pm.name} loading='lazy' />;
}

function Snorlax() {
  const imgSrc = () => `${process.env.PUBLIC_URL}/image/pmIcon/snorlax.png`;
  return <img src={imgSrc()} alt='snorlax' className='w-10' />;
}

function Pm({ pm }: { pm: Pokemon }) {
  const imgSrc = (pid: string, type: string) =>
    `${process.env.PUBLIC_URL}/image/pmIcon/${pid.slice(-3)}.${type}`;

  return (
    <picture>
      <source srcSet={imgSrc(pm.pid, 'webp')} type='image/webp' />
      <img src={imgSrc(pm.pid, 'png')} alt={pm.name} />
    </picture>
  );
}

function PmSleep({ pm, index }: { pm: Pokemon; index: number }) {
  const SleepType = ['sleep', 'drowse', 'sleep', 'sleep'];
  const pids = [pm.pid.slice(-3), pm.pid.slice(-3), 'unown_question', pm.pid.slice(-3)];

  const imgSrc = () => `${process.env.PUBLIC_URL}/image/${SleepType[index]}/${pids[index]}.png`;

  return (
    <img
      src={imgSrc()}
      alt={`${pm.name} - ${pm.sleep[index] || '大肚上睡'}`}
      loading='lazy'
      className={index < 3 ? 'h-full w-full' : 'h-[70%] w-[70%]'}
    />
  );
}

function Berry({ name }: { name: string }) {
  const imgSrc = (fileName: string, type: string) =>
    `${process.env.PUBLIC_URL}/image/berries/${fileName}.${type}`;
  return (
    <picture>
      <source srcSet={imgSrc(Berrys[name as keyof typeof Berrys], 'webp')} type='image/webp' />
      <img src={imgSrc(Berrys[name as keyof typeof Berrys], 'png')} alt={name} />
    </picture>
  );
}

function Ingredient({ name }: { name: string }) {
  const imgSrc = (fileName: string, type: string) =>
    `${process.env.PUBLIC_URL}/image/ingredients/${fileName}.${type}`;

  return (
    <picture>
      <source
        srcSet={imgSrc(Ingredients[name as keyof typeof Ingredients], 'webp')}
        type='image/webp'
      />
      <img src={imgSrc(Ingredients[name as keyof typeof Ingredients], 'png')} alt={name} />
    </picture>
  );
}

function Meal({ name }: { name: string }) {
  const imgSrc = (name: string) => `${process.env.PUBLIC_URL}/image/meals/${name}.png`;
  return <img src={imgSrc(Meals[name as keyof typeof Meals])} alt={name} loading='lazy' />;
}

function Type({ type, className = 'w-5 h-5' }: { type: string; className?: string }) {
  const link = TypeEnum[type as keyof typeof TypeEnum];

  return (
    <img
      src={`${process.env.PUBLIC_URL}/image/type/${link}.svg`}
      alt={type}
      className={className}
    />
  );
}

function Rank({ name, size = 'h-6 w-6' }: { name: string; size?: string }) {
  const imgSrc = (rank: string) =>
    `${process.env.PUBLIC_URL}/image/rank/${Ranks[rank as keyof typeof Ranks]}.webp`;
  return <img src={imgSrc(name)} alt={name} className={clsx('inline', size)} />;
}

export { PmFull, Pm, PmSleep, Berry, Ingredient, Meal, Type, Rank, Snorlax };
