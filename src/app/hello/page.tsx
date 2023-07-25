import { Hello } from '@/components';

const Home = async () => {
  const title = 'Hello Page';
  return (
    <main>
      <h1>{title}</h1>
      <Hello />
    </main>
  );
};

export default Home;
