import React from 'react';
import styles from './QuestionForm.module.css';

const LoadingIndicator = () => {
  return <div className={styles.loading}>送信中...</div>;
};

export default LoadingIndicator;
