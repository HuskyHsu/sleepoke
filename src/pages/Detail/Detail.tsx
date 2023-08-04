import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { Pokemon, SleepTypeBgClass } from '@/types';
import { Icon } from '@/components';
import dataList from '@/data/pmList.json'

function Moves() {
  const { link = '001' } = useParams();
  const pm = dataList.find((pm: Pokemon) => pm.pid === `#${link.padStart(4, '0')}`) || dataList[0]
  const sleepTypeBgClass = SleepTypeBgClass[pm.sleep_type as keyof typeof SleepTypeBgClass];

  return (
    <section className='space-y-4'>
        <div className={clsx(
            'flex justify-center rounded-2xl p-3',
            sleepTypeBgClass,
        )}>
            <div className="space-y-1">
                <p className="md:text-lg">正常色</p>
                <Icon.Game.PmFull pm={pm} shiny={false}/>
            </div>
            <div className="space-y-1">
                <p className="md:text-lg">異色</p>
                <Icon.Game.PmFull pm={pm} shiny={true}/>
            </div>
        </div>

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
