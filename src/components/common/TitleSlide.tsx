import clsx from "clsx";

type Props = {
    title: string,
    color?: string
}

export function TitleSlide({title, color = 'bg-green-600'}: Props) {
    return (
        <div className="w-full">
            <div className={clsx('relative ml-4 box-content', color)}>
                <div className={clsx('absolute -left-4 h-full w-2', color)} />
                <h3 className='ml-2 text-white'>{title}</h3>
                <div className={clsx(
                    'absolute right-0 top-0',
                    'h-0 w-0',
                    'border-solid border-transparent border-b-white',
                    'border-b-[24px] border-l-[12px]',
                )}/>
            </div>
        </div>
    )
}