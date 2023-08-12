export type Pokemon = {
  pid: string;
  name: string;
  type: string;
  sleep_type: string;
  specialty: string;
  berry: string;
  berry_quantity: number;
  skill: string;
  skill_description: string;
  base_frequency: string;
  carry_limit: number;
  friendship_points_needed: number;
  recruit_experience: number;
  recruit_shards: number;
  ingredients: string[];
  location: string[];
};

export enum Type {
  '鋼' = 'Steel',
  '幽靈' = 'Ghost',
  '格鬥' = 'Fighting',
  '毒' = 'Poison',
  '草' = 'Grass',
  '地面' = 'Ground',
  '電' = 'Electric',
  '火' = 'Fire',
  '蟲' = 'Bug',
  '超能力' = 'Psychic',
  '水' = 'Water',
  '飛行' = 'Flying',
  '妖精' = 'Fairy',
  '一般' = 'Normal',
  '冰' = 'Ice',
  '岩石' = 'Rock',
  '惡' = 'Dark',
  '龍' = 'Dragon',
}

export enum Berrys {
  '靛莓果' = 'belueberry',
  '墨莓果' = 'blukberry',
  '櫻子果' = 'cheriberry',
  '零餘果' = 'chestoberry',
  '金枕果' = 'durinberry',
  '勿花果' = 'figyberry',
  '萄葡果' = 'grepaberry',
  '蘋野果' = 'leppaberry',
  '木子果' = 'lumberry',
  '芒芒果' = 'magoberry',
  '橙橙果' = 'oranberry',
  '椰木果' = 'pamtreberry',
  '桃桃果' = 'pechaberry',
  '柿仔果' = 'persimberry',
  '莓莓果' = 'rawstberry',
  '文柚果' = 'sitrusberry',
  '異奇果' = 'wikiberry',
  '番荔果' = 'yacheberry',
}

export enum Ingredients {
  '粗枝大蔥' = 'largeleek',
  '品鮮蘑菇' = 'tastymushroom',
  '窩心洋芋' = 'softpotato',
  '特選蘋果' = 'fancyapple',
  '火辣香草' = 'fieryherb',
  '哞哞鮮奶' = 'moomoomilk',
  '好眠番茄' = 'snoozytomato',
  '放鬆可可' = 'soothingcacao',
  '美味尾巴' = 'slowpoketail',
  '萌綠大豆' = 'greengrasssoybeans',
  '豆製肉' = 'beansausage',
  '甜甜蜜' = 'honey',
  '純粹油' = 'pureoil',
  '暖暖薑' = 'warmingginger',
  '特選蛋' = 'fancyegg',
}
