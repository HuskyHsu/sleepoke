import clsx from 'clsx';
import { Link, Outlet } from 'react-router-dom';

import { Icon } from '@/components';

function MainLayout() {
  return (
    <main className={clsx('my-4 text-slate-800', 'px-4 pb-12 md:px-[10vw] md:pb-0 lg:px-[15vw]')}>
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
      <div className='fixed bottom-0 left-0 z-50 h-12 w-full bg-custom-brown md:hidden'>
        <div className='mx-auto grid h-full max-w-lg grid-cols-2 justify-around text-gray-100'>
          <button type='button' className='inline-flex flex-col items-center justify-center px-5'>
            <Link to={`/`}>圖鑑</Link>
          </button>
          <button type='button' className='inline-flex flex-col items-center justify-center px-5'>
            <Link to={`/meal`}>食譜</Link>
          </button>
        </div>
      </div>
    </main>
  );
}

export default MainLayout;
