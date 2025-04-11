import { getSession } from "next-auth/react";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ScoreButtons from '../components/Select/ScoreButtons';

const Home = () => {
  return (
    <div>
      <ScoreButtons />
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    // 未ログインなら /login にリダイレクト
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  // セッションあり → 通常表示
  return {
    props: {},
  };
}

export default Home;
