import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import QuestionForm from '../components/QuestionForm/QuestionForm';


function App() {
  return (
    <div>
      <Header /> {/* ヘッダーコンポーネントを表示 */}
      <QuestionForm /> {/* QuestionFormコンポーネントをここで使用 */}
      <Footer /> {/* フッターコンポーネントを表示 */}
    </div>
  );
}

export default App;
