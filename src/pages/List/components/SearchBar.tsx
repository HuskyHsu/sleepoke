import clsx from 'clsx';

import { Icon } from '@/components';

export function SearchBar() {
  return (
    <>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Icon.Search className="h-5 w-5" />
        </div>
        <input
          type="search"
          className={clsx(
            'block w-full rounded-lg border border-gray-300',
            'bg-gray-50 p-2 pl-10 text-sm text-gray-900'
          )}
          placeholder="搜尋名稱/樹果/食材"
          value={''}
          onChange={(e) => e}
        />
      </div>
    </>
  );
}
