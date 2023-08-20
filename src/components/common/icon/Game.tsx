import { Pokemon, Berrys, Ingredients, Meals, Type as TypeEnum } from '@/types';

function PmFull({ pm, shiny = false }: { pm: Pokemon; shiny?: boolean }) {
  const imgSrc = (pid: string) =>
    `${process.env.PUBLIC_URL}/image/pm/${pid.slice(-3)}${shiny ? '_s' : ''}.png`;
  return <img src={imgSrc(pm.pid)} alt={pm.name} loading='lazy' />;
}

function Pm({ pm }: { pm: Pokemon }) {
  const imgSrc = (pid: string) => `${process.env.PUBLIC_URL}/image/pmIcon/${pid.slice(-3)}.png`;
  return <img src={imgSrc(pm.pid)} alt={pm.name} loading='lazy' />;
}

function Berry({ name }: { name: string }) {
  const imgSrc = (fileName: string) => `${process.env.PUBLIC_URL}/image/berries/${fileName}.png`;
  return <img src={imgSrc(Berrys[name as keyof typeof Berrys])} alt={name} loading='lazy' />;
}

function Ingredient({ name }: { name: string }) {
  const imgSrc = (fileName: string) =>
    `${process.env.PUBLIC_URL}/image/ingredients/${fileName}.png`;
  return (
    <img src={imgSrc(Ingredients[name as keyof typeof Ingredients])} alt={name} loading='lazy' />
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

export { PmFull, Pm, Berry, Ingredient, Meal, Type };
