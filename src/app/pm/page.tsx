import Link from 'next/link';

type PropsType = {
  params: {
    pid: string;
  };
};

export default async function Page(props: PropsType) {
  const { params } = props;

  return (
    <>
      <h1>{params.pid}</h1>
      <Link href="/">回列表</Link>
    </>
  );
}
