import berries from './berries.json';
import ingredients from './ingredients.json';
import skills from './skills.json';
import pmList from './pmList.json';
import specialties from './specialties.json';
import meals from './meals.json';
import areas from './areas.json';

const pmFrequencyOrder = [...new Set(pmList.map((pm) => pm.base_frequency))].sort((a, b) =>
  a.localeCompare(b),
);

const berryMap = Object.fromEntries(berries.map((berry) => [berry.name, berry.point]));

const pmEnergyOrder = [
  ...new Set(
    pmList.map((pm) => {
      const basePoint = berryMap[pm.berry];
      const totalSec = pm.base_frequency.split(':').reduce((acc, cur) => acc * 60 + Number(cur), 0);
      return Math.ceil((86400 / totalSec) * (basePoint * pm.berry_quantity));
    }),
  ),
].sort((a, b) => b - a);

export {
  pmList,
  pmFrequencyOrder,
  pmEnergyOrder,
  meals,
  berries,
  ingredients,
  skills,
  specialties,
  areas,
};
