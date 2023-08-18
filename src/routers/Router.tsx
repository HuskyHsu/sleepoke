import { Navigate, Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import { List, Detail, Meal } from '@/pages';

export function Router() {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        {/* 主頁 */}
        <Route index element={<List />} />
        <Route path='pm/:link' element={<Detail />} />
        <Route path='meal' element={<Meal />} />
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  );
}