// src/components/Header.jsx
import Link from 'next/link';  // next/link をインポート
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>サイトのタイトル</h1>
        <nav>
          <ul className={styles.navList}>
            {/* Link コンポーネント内で直接 className を指定 */}
            <li>
              <Link href="/" className={styles.navItem}>ホーム</Link>
            </li>
            <li>
              <Link href="/about" className={styles.navItem}>アバウト</Link>
            </li>
            <li>
              <Link href="/contact" className={styles.navItem}>お問い合わせ</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
