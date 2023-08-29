import './Cube.css';

type Props = {
  label: JSX.Element;
  children: JSX.Element;
};

export function Cube({ children, label }: Props) {
  return (
    <div className='icon-list__item relative ml-0 w-[212px] pl-[36px] text-center'>
      <div className='absolute inset-x-0 bottom-0 z-10 w-[300px]'>{children}</div>
      <div>
        <div className='box'>
          <div className='box__face box__face--front bg-custom-green/50'></div>
          {/* <div className='box__face box__face--back'></div> */}
          <div className='box__face box__face--right bg-custom-green/70'></div>
          {/* <div className='box__face box__face--left'></div>
          <div className='box__face box__face--top'></div> */}
          <div className='box__face box__face--bottom bg-custom-green'></div>
        </div>
      </div>
      {label}
    </div>
  );
}
