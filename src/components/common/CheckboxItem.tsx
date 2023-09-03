import { ChangeEvent } from 'react';
import clsx from 'clsx';

type Props = {
  label: string;
  children?: JSX.Element;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  prefixKey?: string;
};

export function CheckboxItem({ label, children, checked, onChange, prefixKey }: Props) {
  const onlyText = children === undefined;
  let name = label;
  if (prefixKey) {
    name = `${prefixKey}:${name}`;
  }

  return (
    <div className={clsx('whitespace-nowrap', !onlyText && 'mb-6 h-12 w-12')}>
      <input
        type='checkbox'
        name={name}
        id={name}
        className='hidden'
        checked={checked}
        onChange={onChange}
      />
      <label
        htmlFor={name}
        className={clsx(
          'flex cursor-pointer flex-col items-center gap-y-2',
          'transition-all duration-300',
          !children && 'shadow-list-items',
          onlyText && [
            'min-w-[2.5rem] rounded-xl px-2 py-1',
            checked ? 'bg-amber-300' : 'bg-amber-100',
          ],
        )}
      >
        {children && (
          <div
            className={clsx(
              'rounded-full p-1',
              'shadow-list-items',
              'transition-all duration-300',
              checked ? 'bg-amber-300' : 'bg-amber-100',
            )}
          >
            {children}
          </div>
        )}
        <span className={clsx(!onlyText && 'text-xs')}>{label}</span>
      </label>
    </div>
  );
}

type TextProps = {
  label: { key: string; name: string };
  children?: JSX.Element;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
};

export function CheckboxTextItem({ label, checked, onChange }: TextProps) {
  return (
    <div
      className={clsx(
        'whitespace-nowrap rounded-xl px-2 py-1',
        checked ? 'bg-amber-300' : 'bg-amber-100',
        'shadow-list-items',
      )}
    >
      <input
        type='checkbox'
        name={label.key}
        id={label.key}
        className='hidden'
        checked={checked}
        onChange={onChange}
      />
      <label htmlFor={label.key} className='flex cursor-pointer flex-col items-center'>
        {label.name}
      </label>
    </div>
  );
}
