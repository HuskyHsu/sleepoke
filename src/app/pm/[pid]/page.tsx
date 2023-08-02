import Link from 'next/link';

type PropsType = {
  params: {
    pid: string;
  };
};

export default async function Page(props: PropsType) {
  const { params } = props;

  return (
    <main>
      <h1>{params.pid}</h1>
      <p>切換世界線成功了這邊是第 {params.pid} 條世界線</p>

      <hr />

      <Link href="/">回列表</Link>
    </main>
  );
}
