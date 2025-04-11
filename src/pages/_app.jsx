import { SessionProvider } from "next-auth/react"; // SessionProviderをインポート
import Header from '../components/Header/Header'; // ヘッダーコンポーネントをインポート
import Footer from '../components/Footer/Footer'; // フッターコンポーネントをインポート
import '../styles/globals.css'; // グローバルCSSをインポート

function MyApp({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}> {/* SessionProviderでラップ */}
      <div className="app-container">
        <Header /> {/* 全ページにヘッダーを追加 */}
        <main className="main-content">
          <Component {...pageProps} /> {/* ページコンポーネントがここに表示される */}
        </main>
        <Footer /> {/* 全ページにフッターを追加 */}
      </div>
    </SessionProvider> 
  );
}

export default MyApp;
