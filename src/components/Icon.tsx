import { Pokemon, Berrys, Ingredients } from '@/types';

export function PmImage({ pm }: { pm: Pokemon }) {
  const imgSrc = (pid: string) => `${process.env.PUBLIC_URL}/image/pm/${pid.slice(-3)}.png`;
  return <img
    src={imgSrc(pm.pid)}
    alt={pm.name}
  />;
}

export function PmIcon({ pm }: { pm: Pokemon }) {
  const imgSrc = (pid: string) => `${process.env.PUBLIC_URL}/image/pmIcon/${pid.slice(-3)}.png`;
  return <img
    src={imgSrc(pm.pid)}
    alt={pm.name}
  />;
}

export function BerryIcon({ name }: { name: string }) {
  const imgSrc = (fileName: string) => `${process.env.PUBLIC_URL}/image/berries/${fileName}.png`;
  return (
    <img
      src={imgSrc(Berrys[name as keyof typeof Berrys])}
      alt={name}
    />
  );
}

export function IngredientIcon({ name }: { name: string }) {
  const imgSrc = (fileName: string) => `${process.env.PUBLIC_URL}/image/ingredients/${fileName}.png`;
  return (
    <img
      src={imgSrc(Ingredients[name as keyof typeof Ingredients])}
      alt={name}
    />
  );
}
