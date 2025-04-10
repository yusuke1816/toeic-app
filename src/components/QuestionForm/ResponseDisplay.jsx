import React from 'react';
import styles from './QuestionForm.module.css';

const ResponseDisplay = ({ response }) => {
  // 改行を <p> タグに変換する関数
  const formatResponse = (text) => {
    return text.split('\n').map((line, index) => <p key={index}>{line}</p>);
  };

  return (
    <div className={styles.responseContainer}>
      <h2 className={styles.responseHeader}>問題</h2>
      <div className={styles.responseText}>
        {formatResponse(response)}
      </div>
    </div>
  );
};

export default ResponseDisplay;
