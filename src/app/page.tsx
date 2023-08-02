/* eslint-disable import/extensions */
import Image from 'next/image';
import data from '@/data/pmList.json';
import clsx from 'clsx';

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
  const imgSrc = (pid: string) => `/image/pmList/${pid.slice(-3)}.png`;

  return (
    <main className="my-[50px] max-w-[1100px] px-7">
      <h1 className="text-3xl">SleePoke</h1>

      <hr />

      <div className="flex justify-between py-3">
        <h2>Pokemon List</h2>
        <div className="flex gap-3">
          <p>search</p>
          <p>filter</p>
        </div>
      </div>

      <hr />

      <ul className={clsx(
        'mx-auto flex flex-wrap gap-y-3',
        'h-full max-w-[800px]',
      )}>
        {
          data.map((
            item: PmItemType,
            index: number,
          ) => (
            <li
              className={clsx(
                'basis-1/6 px-2 text-center',
                'border border-solid border-red-300',
              )}
              key={index}
            >
              <div className="relative mx-auto h-[64px] w-[64px]">
                <Image
                  src={imgSrc(item.pid)}
                  alt={item.name}
                  fill={true}
                />
              </div>
              <h3>{item.name}</h3>
              <p>{item.sleep_type}</p>
            </li>
          ))
        }
      </ul>
    </main>
  );
}
