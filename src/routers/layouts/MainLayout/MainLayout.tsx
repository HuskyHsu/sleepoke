import { Outlet } from 'react-router-dom';

function MainLayout() {
  return (
    <main className="container mx-auto my-8 max-w-4xl px-4 text-slate-800 md:px-0">
      <h1 className="text-3xl">SleePoke</h1>
      <hr />
      <Outlet />
    </main>
  );
}

export default MainLayout;
