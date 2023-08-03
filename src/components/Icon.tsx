import Image from 'next/image';

import { Pokemon } from '@/models';

enum Berry {
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

export function PmImage({ pm }: { pm: Pokemon }) {
  const imgSrc = (pid: string) => `/image/pm/${pid.slice(-3)}.png`;
  return <Image src={imgSrc(pm.pid)} alt={pm.name} width={64} height={58} />;
}

export function PmIcon({ pm }: { pm: Pokemon }) {
  const imgSrc = (pid: string) => `/image/pmIcon/${pid.slice(-3)}.png`;
  return <Image className="inline" src={imgSrc(pm.pid)} alt={pm.name} width={64} height={64} />;
}

export function BerryIcon({ name }: { name: string }) {
  const imgSrc = (fileName: string) => `/image/berries/${fileName}.png`;
  return (
    <Image
      className="inline"
      src={imgSrc(Berry[name as keyof typeof Berry])}
      alt={name}
      width={32}
      height={32}
    />
  );
}
