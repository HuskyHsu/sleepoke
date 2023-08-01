import Image from 'next/image';
import data from '@/data/pmList.json';

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
