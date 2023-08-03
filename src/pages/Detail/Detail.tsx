import { Link, useParams } from 'react-router-dom';

import { Pokemon } from '@/types';
import { PmImage } from '@/components';
import dataList from '@/data/pmList.json'

function Moves() {
  const { link = '001' } = useParams();
  const pm = dataList.find((pm: Pokemon) => pm.pid === `#${link.padStart(4, '0')}`) || dataList[0]

  return (
    <>
    <dl className="grid grid-cols-2 divide-y divide-gray-200">
        <div className="flex flex-col py-3">
            <dt className="mb-1 md:text-lg">正常色</dt>
            <dd className="text-lg font-semibold"><PmImage pm={pm} shiny={false}/></dd>
        </div>
        <div className="flex flex-col py-3">
            <dt className="mb-1 md:text-lg">異色</dt>
            <dd className="text-lg font-semibold"><PmImage pm={pm} shiny={true}/></dd>
        </div>
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
    </>
  );
}

export default Moves;
