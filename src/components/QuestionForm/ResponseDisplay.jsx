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

  const isPart6 = res.passage && res.questions;

  const replaceEllipsis = (text) => {
    if (!text) return '';
    return text.replace(/\.{3}/g, '＿');
  };

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

  const handleSelect = (number, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [number]: option
    }));
  };

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
                {q.options.map((opt, idx) => {
                  const isSelected = selectedAnswers[q.number] === opt;
                  const isCorrectOption = opt === q.answer;
                  let className = styles.optionButton;

                  if (isSelected) {
                    className += ` ${styles.selected}`;
                    if (showAnswer) {
                      className += isCorrectOption
                        ? ` ${styles.correct}`
                        : ` ${styles.incorrect}`;
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(q.number, opt)}
                      className={className}
                    >
                      {`${String.fromCharCode(65 + idx)}. ${opt}`}
                    </button>
                  );
                })}

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
              question.options.map((option, i) => {
                const isSelected = selectedAnswer === option;
                const isCorrectOption = option === question.answer;
                let className = styles.optionButton;

                if (isSelected) {
                  className += ` ${styles.selected}`;
                  if (showAnswer) {
                    className += isCorrectOption
                      ? ` ${styles.correct}`
                      : ` ${styles.incorrect}`;
                  }
                }

                return (
                  <button
                    key={i}
                    onClick={() => handleAnswerSelect(option)}
                    className={className}
                  >
                    {`${i + 1}. ${replaceEllipsis(option)}`}
                  </button>
                );
              })
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
      )}
    </>
  );
};

export default ResponseDisplay;
