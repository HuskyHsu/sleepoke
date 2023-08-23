import { Icon } from '..';
import './Loading.css';

export function Loading() {
  return (
    <div className='flex h-[50vh] w-full items-center justify-center'>
      <div className='wobbling relative'>
        <span className='absolute bottom-4 left-8'>
          <Icon.ZZ className='h-24' />
        </span>
      </div>
    </div>
  );
}
