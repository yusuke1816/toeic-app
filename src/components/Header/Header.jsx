// src/components/Header.jsx
import Link from 'next/link';  // next/link をインポート
import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>AI*TOEIC</h1>
        <nav>
          <ul className={styles.navList}>
            {/* Link コンポーネント内で直接 className を指定 */}
            <li>
              <Link href="/" className={styles.navItem}>レベル選択</Link>
            </li>
            <li>
              <Link href="/about" className={styles.navItem}>復習</Link>
            </li>
            <li>
              <Link href="/contact" className={styles.navItem}>分析</Link>
            </li>
            <li>
              <Link href="/contact" className={styles.navItem}>login</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
