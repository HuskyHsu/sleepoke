import { lazy } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';

import { WeekProvider } from '@/components/contexts';

const List = lazy(() => import(/* webpackChunkName: "List" */ '@/pages/List/List'));
const Detail = lazy(() => import(/* webpackChunkName: "Detail" */ '@/pages/Detail/Detail'));
const Meal = lazy(() => import(/* webpackChunkName: "Meal" */ '@/pages/Meal/Meal'));

export function Router() {
  return (
    <WeekProvider>
      <Routes>
        <Route path='/' element={<MainLayout />}>
          {/* 主頁 */}
          <Route index element={<List />} />
          <Route path='pm/:link' element={<Detail />} />
          <Route path='meal' element={<Meal />} />
        </Route>
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </WeekProvider>
  );
}
