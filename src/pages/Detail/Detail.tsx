import { Link, useParams } from 'react-router-dom';
import clsx from 'clsx';
import { Pokemon, SleepTypeBgClass } from '@/types';
import { Icon, TitleSlide } from '@/components';
import dataList from '@/data/pmList.json'

function Moves() {
  const { link = '001' } = useParams();
  const pm = dataList.find((pm: Pokemon) => pm.pid === `#${link.padStart(4, '0')}`) || dataList[0]
  const sleepTypeBgClass = SleepTypeBgClass[pm.sleep_type as keyof typeof SleepTypeBgClass];
  const renderData = [
    {
        title: '名稱',
        content: pm.name,
    },
    {
        title: '分類',
        content: pm.sleep_type,
    },
    {
        title: '屬性',
        content: pm.type,
    },
    {
        title: '專長',
        content: pm.specialty,
    },
    {
        title: '樹果',
        content: `${pm.berry}x${pm.berry_quantity}`,
    },
    {
        title: '食材',
        content: pm.ingredients.join(', '),
    },
    {
        title: '主技能',
        content: pm.skill,
    },
    {
        title: '主技能描述',
        content: pm.skill_description,
    },
  ]

  return (
    <section className='space-y-4'>
        <div className='relative flex justify-center'>
            <div className="z-10 space-y-1 text-center">
                <Icon.Game.PmFull pm={pm}/>
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
                <dd className="flex gap-x-4 text-lg font-semibold">
                    {
                        new Array(pm.berry_quantity)
                        .fill(0)
                        .map((_, index) => <span className="flex h-12 w-12 flex-col items-center justify-center" key={index}>
                                <Icon.Game.Berry name={pm.berry} />
                                <span className='text-xs'>{pm.berry}</span>
                            </span>
                        )
                    }
                </dd>
            </div>
            <div className="flex flex-col py-3">
                <dt className="mb-1 md:text-lg">食材</dt>
                <dd className="flex gap-x-4 text-lg font-semibold">
                    {
                        pm.ingredients
                            .map((ingredient) => <span className="flex h-12 w-12 flex-col items-center justify-center" key={ingredient}>
                                    <Icon.Game.Ingredient name={ingredient} />
                                    <span className='text-xs'>{ingredient}</span>
                                </span>
                            )
                    }
                </dd>
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
        
        <hr />

        <ul className='flex flex-col gap-5'>
            {
                renderData.map((data, renderIndex) => (
                    <li
                        className='flex items-center gap-5'
                        key={renderIndex}
                    >
                        <div className={clsx(
                            'py-px',
                            'shrink-0 grow-0 basis-[30%]',
                            'border-2 border-solid border-green-600',
                            'rounded-full text-center text-black',
                        )}>{data.title}</div>

                        {
                            data.title === '樹果' ? (
                                <ul className='flex w-full gap-6'>
                                    {
                                        new Array(pm.berry_quantity)
                                        .fill(0)
                                        .map((_, index) => (
                                            <li className="flex items-center" key={index}>
                                                <div className='w-12'>
                                                    <Icon.Game.Berry name={pm.berry} />
                                                </div>
                                                <span className='text-xs'>{pm.berry}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            ) : data.title === '食材' ? (
                                <ul className='flex w-full gap-6'>
                                    {
                                        pm.ingredients.map((ingredient) => (
                                            <li className="flex items-center" key={ingredient}>
                                                <div className='w-12'>
                                                    <Icon.Game.Ingredient name={ingredient} />
                                                </div>
                                                <span className='text-xs'>{ingredient}</span>
                                            </li>
                                        ))
                                    }
                                </ul>
                            ) : (
                                <span className='flex-1'>{data.content}</span>
                            )
                        }
                    </li>
                ))
            }
        </ul>

        <Link
            className={clsx(
                'inline-block px-3 py-1',
                'transition-all duration-300',
                'shadow-list-items hover:shadow-list-items--hover'
            )}
            to={'/'}
        >返回</Link>
    </section>
  );
}

export default Moves;
