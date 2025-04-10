import React, { useState } from 'react';
import styles from './QuestionForm.module.css';

const Part6Display = ({ response }) => {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showAnswer, setShowAnswer] = useState(false);

  if (!response) return <p>データを読み込んでいます...</p>;

  let res;
  try {
    res = typeof response === 'string' ? JSON.parse(response) : response;
  } catch {
    return <p>JSONの形式が不正です。</p>;
  }

  if (!res.passage || !res.questions) return <p>データ構造が不正です。</p>;

  const handleSelect = (number, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [number]: option
    }));
  };

  const renderPassage = (passageText) => {
    // Splitting the passage text by the placeholders for the questions
    return passageText.split(/\((\d+)\)/g).map((part, index) => {
      if (index % 2 === 1) {
        const qNum = parseInt(part);
        const selected = selectedAnswers[qNum] || '＿＿';
        return <strong key={index}> [{selected}] </strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  return (
    <div className={styles.responseContainer}>
      <div className={styles.responseText}>
        {/* Render the passage */}
        <p>{renderPassage(res.passage)}</p>

        {/* Render each question and its options */}
        {res.questions.map((q) => (
          <div key={q.number} className={styles.questionBlock}>
            <p>{q.text}</p>
            {q.options.map((opt, idx) => (
              <button
                key={idx}
                onClick={() => handleSelect(q.number, opt)}
                className={`${styles.optionButton} ${
                  selectedAnswers[q.number] === opt ? styles.selected : ''
                }`}
              >
                {`${String.fromCharCode(65 + idx)}. ${opt}`}
              </button>
            ))}

            {/* Show answer feedback */}
            {showAnswer && (
              <p>
                {selectedAnswers[q.number] === q.answer ? (
                  <span style={{ color: 'green' }}>正解です！</span>
                ) : (
                  <span style={{ color: 'red' }}>
                    不正解です。正解: {q.answer}
                  </span>
                )}
              </p>
            )}
          </div>
        ))}

        {/* Button to show the answers */}
        {!showAnswer && (
          <button onClick={() => setShowAnswer(true)} className={styles.submitButton}>
            答えを確認する
          </button>
        )}
      </div>
    </div>
  );
};

export default Part6Display;
