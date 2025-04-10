import React, { useState } from 'react';
import styles from './QuestionForm.module.css';

const ResponseDisplay = ({ response, showAnswer, setShowAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null); // ユーザーの選択した答え
  const [isCorrect, setIsCorrect] = useState(null); // 正解かどうかの判定

  if (!response) {
    return <p>データを読み込んでいます...</p>;
  }

  let res;
  try {
    res = typeof response === 'string' ? JSON.parse(response) : response;
  } catch (e) {
    return <p>JSONの形式が正しくありません。</p>;
  }

  // 単体でも配列でも対応
  const questions = Array.isArray(res) ? res : [res];
  const question = questions[0]; // 1問だけ表示

  // 回答が選ばれたときの処理
  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
    setIsCorrect(option === question.answer);
    setShowAnswer(true); // 答えを表示する
  };

  // 文字列内の「...」を「＿」に置き換える関数
  const replaceEllipsis = (text) => {
    if (!text) return null;
    return text.replace(/\.{3}/g, '＿'); // 正規表現で「...」を「＿」に置き換え
  };

  return (
    <div className={styles.responseContainer}>
      <div className={styles.responseText}>
        {question.question ? (
          <p>{replaceEllipsis(question.question)}</p>
        ) : (
          <p>質問がありません</p>
        )}

        {question.options && question.options.length > 0 ? (
          question.options.map((option, i) => (
            <button
              key={i}
              onClick={() => handleAnswerSelect(option)}
              className={styles.optionButton}
            >
              {`${i + 1}. ${replaceEllipsis(option)}`}
            </button>
          ))
        ) : (
          <p>選択肢がありません</p>
        )}

        {selectedAnswer && showAnswer && (
          <p>
            {isCorrect ? (
              <strong style={{ color: 'green' }}>正解です！</strong>
            ) : (
              <strong style={{ color: 'red' }}>不正解です。</strong>
            )}
            <br />
            あなたの選択: {selectedAnswer}
            <br />
            正解: {question.answer}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResponseDisplay;
