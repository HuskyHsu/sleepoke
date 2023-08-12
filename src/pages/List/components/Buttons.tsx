import { ChangeEvent } from 'react';
import clsx from 'clsx';

import { CheckboxItem, CheckboxTextItem } from '@/components';

type Props = {
  checkSet: Set<string>,
  list: string[],
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
  Icon: ({name}: {name: string}) => JSX.Element,
}

type TextProps = {
  select: string | null,
  list: {key: string, name: string}[],
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void,
}
  
export function Buttons({list, checkSet, Icon, handleChange}: Props) {
  return <div className={
      clsx(
        'grid w-full justify-items-center gap-y-2',
        'grid-cols-6 md:grid-cols-9 xl:grid-cols-18'
      )
    }>
    {
      list.map((item) => <CheckboxItem 
        key={item} 
        label={item}
        checked={checkSet.has(item)}
        onChange={handleChange}
      >
        <Icon name={item}/>
      </CheckboxItem>)
    }
  </div>
}

export function TextButtons({list, select, handleChange}: TextProps) {
  return <div className={
      clsx(
        'flex w-full flex-wrap gap-4'
      )
    }>
    {
      list.map((item) => <CheckboxTextItem 
        key={item.key} 
        label={item}
        checked={(select === null && item.key === 'none') || select === item.key}
        onChange={handleChange}
      />)
    }
  </div>
}