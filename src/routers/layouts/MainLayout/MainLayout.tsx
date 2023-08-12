import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

import { Icon } from '@/components';

function MainLayout() {
  return (
    <main className={clsx('my-4 text-slate-800', 'px-4 md:px-[10vw] lg:px-[15vw]')}>
      <span className='flex w-full justify-center'>
        <Icon.Logo className='h-[90px] w-[300px]' />
      </span>
      <hr />
      <Outlet />
    </main>
  );
}

export default MainLayout;
