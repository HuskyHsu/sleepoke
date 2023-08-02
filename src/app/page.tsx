import Image from 'next/image';
import data from '@/data/pmList.json';

type PmItemType = {
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

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-between p-24'>
      {data.map((pm) => (
        <li key={pm.pid}>
          <Image
            src={`/image/pmList/${pm.pid.slice(-3)}.png`}
            alt={pm.name}
            width={100}
            height={100}
            priority
          />
        </li>
      ))}
    </main>
  );
}
