import Link from 'next/link';
import styles from './ScoreButtons.module.css'; // CSS モジュールをインポート

const ScoreButtons = () => {
  return (
    <div className={styles.container}>
      <h1>TOEICスコア帯を選択</h1>
      
      <div className={styles.card}>
        <Link href="/300-500">
          <button className={styles.button}>300-500点</button>
        </Link>
      </div>
      
      <div className={styles.card}>
        <Link href="/500-650">
          <button className={styles.button}>500-650点</button>
        </Link>
      </div>
      
      <div className={styles.card}>
        <Link href="/650-780">
          <button className={styles.button}>650-780点</button>
        </Link>
      </div>
      
      <div className={styles.card}>
        <Link href="/780-900">
          <button className={styles.button}>780-900点</button>
        </Link>
      </div>
      
      <div className={styles.card}>
        <Link href="/900+">
          <button className={styles.button}>900点以上</button>
        </Link>
      </div>
     
    </div>
  );
};

export default ScoreButtons;
