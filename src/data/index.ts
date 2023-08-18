import berries from './berries.json';
import ingredients_ from './ingredients.json';
import skills from './skills.json';
import pmList from './pmList.json';
import specialties from './specialties.json';
import meals from './meals.json';

const ingredients = ingredients_.sort((a, b) => a.point - b.point);

export { pmList, meals, berries, ingredients, skills, specialties };
