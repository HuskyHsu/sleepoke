import clsx from 'clsx';
import { Link, Outlet } from 'react-router-dom';

import { Icon } from '@/components';

function MainLayout() {
  return (
    <main
      className={clsx('my-4 text-slate-800', 'px-4 pb-[4.5rem] md:px-[10vw] md:pb-0 lg:px-[15vw]')}
    >
      <span className='flex w-full items-center justify-center md:justify-between'>
        <Link to={`/`}>
          <Icon.Logo className='h-[90px] w-[300px]' />
        </Link>
        <div className='hidden gap-4 text-2xl md:flex'>
          <Link to={`/`}>圖鑑</Link>
          <Link to={`/meal`}>食譜</Link>
        </div>
      </span>
      <hr />
      <Outlet />
      <div className='fixed bottom-0 left-0 z-50 h-16 w-full bg-white shadow-navigation md:hidden'>
        <div
          className={clsx(
            'mx-auto grid h-full max-w-lg grid-cols-2',
            'items-center justify-around divide-x-2 text-center text-xl',
          )}
        >
          <Link to={`/`} className='leading-[4rem]'>
            圖鑑
          </Link>
          <Link to={`/meal`} className='leading-[4rem]'>
            食譜
          </Link>
        </div>
      </div>
    </main>
  );
}

export default MainLayout;
