import styles from './Header.module.css';

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1>サイトのタイトル</h1>
        <nav>
          <ul className={styles.navList}>
            <li><a href="/" className={styles.navItem}>ホーム</a></li>
            <li><a href="/about" className={styles.navItem}>アバウト</a></li>
            <li><a href="/contact" className={styles.navItem}>お問い合わせ</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

