import clsx from 'clsx';
import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <main className={clsx(
      'my-4 text-slate-800',
      'px-4 md:px-[10vw] lg:px-[15vw]',
    )}>
      <h1 className="text-3xl">SleePoke</h1>
      <hr />
      <Outlet />
    </main>
  );
}

export default MainLayout;
