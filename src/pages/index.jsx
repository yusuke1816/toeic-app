// pages/index.jsx
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import ScoreButtons from '../components/select/select'; // ScoreButtonsコンポーネントをインポート

const Home = () => {
  return (
    <div>

      <ScoreButtons /> {/* ScoreButtonsコンポーネントをここで使用 */}
 
    </div>
  );
};

export default Home;
