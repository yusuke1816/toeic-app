// src/pages/_app.jsx
import Header from '../components//Header/Header'; // ヘッダーコンポーネントをインポート
import Footer from '../components/Footer/Footer'; // フッターコンポーネントをインポート


function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Header />  {/* 全ページにヘッダーを追加 */}
      <main>
        <Component {...pageProps} />  {/* ページコンポーネントがここに表示される */}
      </main>
      <Footer />  {/* 全ページにフッターを追加 */}
    </div>
  );
}

export default MyApp;
