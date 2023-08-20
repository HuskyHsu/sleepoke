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
  sleep: string[];
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

export enum Meals {
  '拌拌咖哩' = 'mixedcurry',
  '特選蘋果咖哩' = 'fancyapplecurry',
  '炙燒尾肉咖哩' = 'grilledtailcurry',
  '太陽之力番茄咖哩' = 'solarpowertomatocurry',
  '絕對睡眠奶油咖哩' = 'dreameaterbuttercurry',
  '辣味蔥勁十足咖哩' = 'spicyleekcurry',
  '蘑菇孢子咖哩' = 'sporemushroomcurry',
  '親子愛咖哩' = 'eggbombcurry',
  '吃飽飽起司肉排咖哩' = 'heartycheeseburgercurry',
  '窩心白醬濃湯' = 'softpotatochowder',
  '單純白醬濃湯' = 'simplechowder',
  '豆製肉排咖哩' = 'beanburgercurry',
  '寶寶甜蜜咖哩' = 'mildhoneycurry',
  '忍者咖哩' = 'ninjacurry',
  '日照炸肉排咖哩' = 'droughtkatsucurry',
  '入口即化蛋捲咖哩' = 'meltyomelettecurry',
  '健美豆子咖哩' = 'bulkupbeancurry',
  '拌拌沙拉' = 'mixedsalad',
  '呆呆獸尾巴的胡椒沙拉' = 'slowpoketailpeppersalad',
  '蘑菇孢子沙拉' = 'sporemushroomsalad',
  '撥雪凱撒沙拉' = 'snowcloakcaesarsalad',
  '貪吃鬼洋芋沙拉' = 'gluttonypotatosalad',
  '濕潤豆腐沙拉' = 'waterveiltofusalad',
  '蠻力豪邁沙拉' = 'superpowerextremesalad',
  '豆製火腿沙拉' = 'beanhamsalad',
  '好眠番茄沙拉' = 'snoozytomatosalad',
  '哞哞起司番茄沙拉' = 'moomoocapresesalad',
  '心情不定肉沙拉淋巧克力醬' = 'contrarychocolatemeatsalad',
  '過熱沙拉' = 'overheatgingersalad',
  '特選蘋果沙拉' = 'fancyapplesalad',
  '免疫蔥花沙拉' = 'immunityleeksalad',
  '迷人蘋果起司沙拉' = 'dazzlingapplecheesesalad',
  '忍者沙拉' = 'ninjasalad',
  '熱風豆腐沙拉' = 'heatwavetofusalad',
  '拌拌果汁' = 'mixedjuice',
  '熟成甜薯燒' = 'fluffysweetpotatoes',
  '不屈薑餅' = 'steadfastgingercookies',
  '特選蘋果汁' = 'fancyapplejuice',
  '手製勁爽汽水' = 'craftsodapop',
  '火花薑茶' = 'embergingertea',
  '胖丁百匯布丁' = "jigglypuff'sfruityflan",
  '惡魔之吻水果牛奶' = 'lovelykisssmoothie',
  '祈願蘋果派' = 'luckychantapplepie',
  '橙夢的排毒茶' = "neroli'srestorativetea",
  '甜甜香氣巧克力蛋糕' = 'sweetscentchocolatecake',
  '哞哞熱鮮奶' = 'warmmoomoomilk',
  '輕裝豆香蛋糕' = 'cloudninesoycake',
  '活力蛋白飲' = 'hustleproteinsmoothie',
  '我行我素蔬菜汁' = 'stalwartvegetablejuice',
  '大馬拉薩達' = 'bigmalasada',
  '大力士豆香甜甜圈' = 'hugepowersoydonuts',
}
