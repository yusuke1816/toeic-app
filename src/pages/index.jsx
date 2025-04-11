import { getSession } from "next-auth/react";
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ScoreButtons from '../components/Select/ScoreButtons';
import YourComponent from '../components/YourComponent'; // 追加

const Home = () => {
  return (
    <div>
      <Header />
      <ScoreButtons />
      <YourComponent /> {/* これが送信ボタン */}
      <Footer />
    </div>
  );
};

export async function getServerSideProps(context) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default Home;
