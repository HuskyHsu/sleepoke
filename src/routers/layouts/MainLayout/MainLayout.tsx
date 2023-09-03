import { Suspense, useEffect, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import ReactGA from 'react-ga4';
import clsx from 'clsx';

import { Icon, Loading } from '@/components';
import { Snorlax } from '@/components/modal';

function Header({ toggleSnorlaxModal }: { toggleSnorlaxModal: () => void }) {
  return (
    <>
      <span className='flex w-full items-center justify-center md:justify-between'>
        <Link to={`/`}>
          <Icon.Logo className='h-[90px] w-[300px]' />
        </Link>
        <div className='hidden items-center gap-4 text-2xl md:flex'>
          <div className='cursor-pointer' onClick={() => toggleSnorlaxModal()}>
            <Icon.Game.Snorlax />
          </div>
          <Link to={`/`}>圖鑑</Link>
          <Link to={`/meal`}>食譜</Link>
        </div>
      </span>
    </>
  );
}

function Navigation({ toggleSnorlaxModal }: { toggleSnorlaxModal: () => void }) {
  return (
    <div className='fixed bottom-0 left-0 z-50 h-16 w-full rounded-t-xl bg-white shadow-navigation md:hidden'>
      <div
        className={clsx(
          'mx-auto flex h-full max-w-lg',
          'items-center justify-around text-center text-xl',
        )}
      >
        <Link to={`/`} className='w-2/5 leading-[4rem]'>
          圖鑑
        </Link>
        <div className='mx-auto cursor-pointer' onClick={() => toggleSnorlaxModal()}>
          <Icon.Game.Snorlax />
        </div>
        <Link to={`/meal`} className='w-2/5 leading-[4rem]'>
          食譜
        </Link>
      </div>
    </div>
  );
}

function MainLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const [displaySnorlax, setDisplaySnorlax] = useState<boolean>(false);
  const toggleSnorlaxModal = () => {
    setDisplaySnorlax((displaySnorlax) => !displaySnorlax);
  };

  useEffect(() => {
    ReactGA.initialize('G-VX7N3PN01C');
    ReactGA.send({
      hitType: 'pageview',
      page: location.pathname,
    });
    if (location.search) {
      ReactGA.event({
        category: location.pathname,
        action: location.search,
      });
    }
  }, [location, navigate]);

  return (
    <main
      className={clsx('my-4 px-4 pb-[4.5rem]', 'text-slate-800 md:px-[10vw] md:pb-0 lg:px-[15vw]')}
    >
      <Header toggleSnorlaxModal={toggleSnorlaxModal} />
      <Suspense fallback={<Loading />}>
        <Outlet />
      </Suspense>
      <Navigation toggleSnorlaxModal={toggleSnorlaxModal} />
      {displaySnorlax && <Snorlax toggleSnorlaxModal={toggleSnorlaxModal} />}
    </main>
  );
}

export default MainLayout;
