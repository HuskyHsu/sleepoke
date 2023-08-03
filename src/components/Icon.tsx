import Image from 'next/image';

import { Pokemon, Berrys, Ingredients } from '@/types';

export function PmImage({ pm }: { pm: Pokemon }) {
  const imgSrc = (pid: string) => `/image/pm/${pid.slice(-3)}.png`;
  return <Image
    src={imgSrc(pm.pid)}
    alt={pm.name}
    fill={true}
    sizes="(max-width: 768px) 100vw, 100vw"
  />;
}

export function PmIcon({ pm }: { pm: Pokemon }) {
  const imgSrc = (pid: string) => `/image/pmIcon/${pid.slice(-3)}.png`;
  return <Image
    src={imgSrc(pm.pid)}
    alt={pm.name}
    fill={true}
    sizes="(max-width: 768px) 100vw, 100vw"
  />;
}

export function BerryIcon({ name }: { name: string }) {
  const imgSrc = (fileName: string) => `/image/berries/${fileName}.png`;
  return (
    <Image
      className="inline"
      src={imgSrc(Berrys[name as keyof typeof Berrys])}
      alt={name}
      fill={true}
      sizes="(max-width: 768px) 100vw, 100vw"
    />
  );
}

export function IngredientIcon({ name }: { name: string }) {
  const imgSrc = (fileName: string) => `/image/ingredients/${fileName}.png`;
  return (
    <Image
      className="inline"
      src={imgSrc(Ingredients[name as keyof typeof Ingredients])}
      alt={name}
      fill={true}
      sizes="(max-width: 768px) 100vw, 100vw"
    />
  );
}
