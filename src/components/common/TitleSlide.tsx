import clsx from "clsx";


export function TitleSlide({title}: {
    title:string,
}) {

    return (
        <div className='relative ml-4 box-content w-full bg-green-600'>
            <div className='absolute -left-4 h-full w-2 bg-green-600' />
            <h3 className='ml-2 text-white'>{title}</h3>
            <div className={clsx(
                'absolute right-0 top-0',
                'h-0 w-0',
                'border-solid border-transparent border-b-white',
                'border-b-[24px] border-l-[16px]',
            )}/>
        </div>
    )
}