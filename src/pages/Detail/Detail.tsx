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

  const switchContentByTitle = (
    propsTitle: string,
    propsContent: string,
  ) => {
    const {
        berry_quantity,
        berry,
        ingredients
    } = pm;

    switch (propsTitle) {
        case '樹果':
            return  (
                <ul className='flex w-full gap-6'>
                    {
                        new Array(berry_quantity)
                        .fill(0)
                        .map((_, index) => (
                            <li className="flex items-center" key={index}>
                                <div className='w-12'>
                                    <Icon.Game.Berry name={berry} />
                                </div>
                                <span className='text-xs'>{berry}</span>
                            </li>
                        ))
                    }
                </ul>
            )
        case '食材':
            return (
                <ul className='flex w-full gap-6'>
                    {
                        ingredients.map((item, index) => (
                            <li className="flex items-center" key={index}>
                                <div className='w-12'>
                                    <Icon.Game.Ingredient name={item} />
                                </div>
                                <span className='text-xs'>{item}</span>
                            </li>
                        ))
                    }
                </ul>
            )
        default:
            return  <span className='flex-1'>{propsContent}</span>
    }
  }


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

        <ul className='flex flex-col gap-5'>
            {
                renderData.map((data, index) => (
                    <li
                        className='flex items-center gap-5'
                        key={index}
                    >
                        <div className={clsx(
                            'py-px',
                            'shrink-0 grow-0 basis-[30%]',
                            'border-2 border-solid border-green-600',
                            'rounded-full text-center text-black',
                        )}>{data.title}</div>

                        { switchContentByTitle(data.title, data.content) }
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
