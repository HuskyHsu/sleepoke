import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

import { Icon } from '@/components';

function MainLayout() {
  return (
    <main className={clsx(
      'my-4 text-slate-800',
      'px-4 md:px-[10vw] lg:px-[15vw]',
    )}>
      <div className='flex items-center gap-2'>
        <Icon.Logo className="h-12 w-12 md:h-20 md:w-20" />
        <h1 className="text-3xl md:text-5xl">SleePoke</h1>
      </div>
      <hr />
      <Outlet />
    </main>
  );
}

export default MainLayout;
