import berries from './berries.json';
import ingredients from './ingredients.json';
import skills from './skills.json';
import pmList from './pmList.json';
import specialties from './specialties.json';
import meals from './meals.json';

const pmFrequencyOrder = [...new Set(pmList.map((pm) => pm.base_frequency))].sort((a, b) =>
  a.localeCompare(b),
);

export { pmList, pmFrequencyOrder, meals, berries, ingredients, skills, specialties };
