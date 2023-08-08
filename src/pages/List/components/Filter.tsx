import { ChangeEvent } from 'react';

import { Icon } from '@/components';

type Props = {
    checked: boolean,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void
}

export function Filter({checked, onChange}: Props) {
    return <>
        <input 
            type="checkbox" 
            name={'filter'} 
            id={'filter'} 
            className='hidden' 
            checked={checked} 
            onChange={onChange}
        />
        <label htmlFor={'filter'} className='flex cursor-pointer flex-col items-center'>
        <Icon.Filter className="h-6 w-6" />
        </label>
    </>
}