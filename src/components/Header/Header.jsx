import Link from 'next/link';  // next/link をインポート
import { useSession, signIn, signOut } from 'next-auth/react'; // useSession, signIn, signOut をインポート
import styles from './Header.module.css';

const Header = () => {
  const { data: session } = useSession(); // セッションデータを取得

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>AI*TOEIC</h1>
        <nav>
          <ul className={styles.navList}>
            <li>
              <Link href="/" className={styles.navItem}>レベル選択</Link>
            </li>
            <li>
              <Link href="/about" className={styles.navItem}>復習</Link>
            </li>
            <li>
              <Link href="/contact" className={styles.navItem}>分析</Link>
            </li>
            {/* ログイン状態によって表示内容を切り替える */}
            <li>
              {!session ? (
                <button 
                  onClick={() => signIn("google")} 
                  className={styles.navItem}
                >
                  ログイン
                </button> 
              ) : (
                <div className={styles.loggedIn}>
                  <span>{session.user?.name} さん <img src={session.user?.image || ""} alt="Profile" width={50} height={50} /></span>
                  <button onClick={() => signOut()} className={styles.navItem}>ログアウト</button>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
