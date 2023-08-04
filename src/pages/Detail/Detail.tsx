import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { Pokemon, SleepTypeBgClass } from '@/types';
import { Icon } from '@/components';
import dataList from '@/data/pmList.json'

function TitleSlide(props: {
    title:string,
}) {
    const { title } = props;

    return (
        <div className='relative w-full bg-green-600  pl-2'>
            <div className='absolute -left-3 h-full w-2 bg-green-600' />
            <h3 className='text-white'>{title}</h3>
            <div className={clsx(
                'absolute right-0 top-0',
                'h-0 w-0',
                'border-solid border-transparent border-b-white',
                'border-b-[24px] border-l-[8px]',
            )}/>
        </div>
    )
}

function Moves() {
  const { link = '001' } = useParams();
  const pm = dataList.find((pm: Pokemon) => pm.pid === `#${link.padStart(4, '0')}`) || dataList[0]
  const sleepTypeBgClass = SleepTypeBgClass[pm.sleep_type as keyof typeof SleepTypeBgClass];

  return (
    <section className='space-y-4'>
        <div className='relative flex justify-center'>
            <div className="z-10 space-y-1 text-center">
                <Icon.Game.PmFull pm={pm} shiny={false}/>
                <p className="md:text-lg">正常色</p>
            </div>
            <div className="z-10 space-y-1 text-center">
                <Icon.Game.PmFull pm={pm} shiny={true}/>
                <p className="md:text-lg">異色</p>
            </div>

            {/* bg banner */}
            <div className={clsx(
                'absolute inset-x-0 bottom-0 z-0 h-3/5',
                'rounded-2xl',
                sleepTypeBgClass,
            )}/>
        </div>

        <h2 className='text-center text-2xl'>{pm.name}</h2>

        <TitleSlide title='基本資訊' />

        <dl className="grid grid-cols-2 divide-y divide-gray-200">
            <div className="flex flex-col py-3">
                <dt className="mb-1 md:text-lg">名稱</dt>
                <dd className="text-lg font-semibold">{pm.name}</dd>
            </div>
            <div className="flex flex-col py-3">
                <dt className="mb-1 md:text-lg">分類</dt>
                <dd className="text-lg font-semibold">{pm.sleep_type}</dd>
            </div>
            <div className="flex flex-col py-3">
                <dt className="mb-1 md:text-lg">屬性</dt>
                <dd className="text-lg font-semibold">{pm.type}</dd>
            </div>
            <div className="flex flex-col py-3">
                <dt className="mb-1 md:text-lg">專長</dt>
                <dd className="text-lg font-semibold">{pm.specialty}</dd>
            </div>
            <div className="flex flex-col py-3">
                <dt className="mb-1 md:text-lg">樹果</dt>
                <dd className="text-lg font-semibold">{pm.berry}x{pm.berry_quantity}</dd>
            </div>
            <div className="flex flex-col py-3">
                <dt className="mb-1 md:text-lg">食材</dt>
                <dd className="text-lg font-semibold">{pm.ingredients.join(', ')}</dd>
            </div>
            <div className="flex flex-col py-3">
                <dt className="mb-1 md:text-lg">主技能</dt>
                <dd className="text-lg font-semibold">{pm.skill}</dd>
            </div>
            <div className="flex flex-col py-3">
                <dt className="mb-1 md:text-lg">主技能描述</dt>
                <dd className="text-lg font-semibold">{pm.skill_description}</dd>
            </div>
        </dl>
        <Link to={'/'}>Back</Link>
    </section>
  );
}

export default Moves;
