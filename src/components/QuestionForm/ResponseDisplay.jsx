import React, { useState } from 'react';
import styles from './QuestionForm.module.css';

const ResponseDisplay = ({ response, showAnswer, setShowAnswer }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  if (!response) return <p>データを読み込んでいます...</p>;

  let res;
  try {
    res = typeof response === 'string' ? JSON.parse(response) : response;
  } catch {
    return <p>JSONの形式が不正です。</p>;
  }

  // passage があるかどうかで Part6 と 単一問題に分岐
  const isPart6 = res.passage && res.questions;

  // 共通: "..." を "＿" に置き換え
  const replaceEllipsis = (text) => {
    if (!text) return '';
    return text.replace(/\.{3}/g, '＿');
  };

  // Part6 用: passage を表示する処理
  const renderPassage = (passageText) => {
    return passageText.split(/\((\d+)\)/g).map((part, index) => {
      if (index % 2 === 1) {
        const qNum = parseInt(part);
        const selected = selectedAnswers[qNum] || '＿＿';
        return <strong key={index}> [{selected}] </strong>;
      }
      return <span key={index}>{part}</span>;
    });
  };

  // Part6 の選択処理
  const handleSelect = (number, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [number]: option
    }));
  };

  // 単一問題用
  const questions = Array.isArray(res) ? res : [res];
  const question = questions[0];

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
    setIsCorrect(option === question.answer);
    setShowAnswer(true);
  };

  return (
    <>
      {isPart6 ? (
        <div className={styles.responseContainer}>
          <div className={styles.responseText}>
            <p>{renderPassage(res.passage)}</p>

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

            {!showAnswer && (
              <button
                onClick={() => setShowAnswer(true)}
                className={styles.submitButton}
              >
                答えを確認する
              </button>
            )}
          </div>
          {console.log('part6')}
        </div>
      ) : (
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
            {console.log('part5')}
          </div>
        </div>
      )}
    </>
  );
};

export default ResponseDisplay;
