import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../components/QuestionForm/QuestionForm.module.css';

const ShowResponses = () => {
  const [responses, setResponses] = useState([])
  const [showAnswer, setShowAnswer] = useState(false);
  const [selectedAnswers, setSelectedAnswers] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('/api/get-responses')
        console.log('📥 取得したデータ:', res.data)
        setResponses(res.data)
      } catch (err) {
        console.error('Error fetching data', err)
      }
    }
    fetchData()
  }, [])

  const handleSelect = (number, option) => {
    setSelectedAnswers((prev) => ({
      ...prev,
      [number]: option
    }));
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

  return (
    <div>
      <h1>保存されたデータ</h1>
      {responses.length === 0 ? (
        <p>データはありません。</p>
      ) : (
        <ul>
          {responses.map((response) => {
            let res;
            try {
              res = typeof response === 'string' ? JSON.parse(response) : response;
            } catch {
              return <p key={response.id}>JSONの形式が不正です。</p>;
            }

            const isPart6 = res.passage && res.questions;

            return (
              <li key={response.id}>
                <div className={styles.responseContainer}>
                  <div className={styles.responseText}>
                    {isPart6 ? (
                      <div>
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
                      </div>
                    ) : (
                      <div>
                        {response.content?.question ? (
                          <p>{response.content.question}</p>
                        ) : (
                          <p>質問がありません</p>
                        )}
                        {response.content?.options && response.content.options.length > 0 ? (
                          response.content.options.map((option, i) => (
                            <button
                              key={i}
                              onClick={() => handleSelect(response.id, option)}
                              className={styles.optionButton}
                            >
                              {`${i + 1}. ${option}`}
                            </button>
                          ))
                        ) : (
                          <p>選択肢がありません</p>
                        )}
                        {selectedAnswers[response.id] && showAnswer && (
                          <p>
                            {selectedAnswers[response.id] === response.content.answer ? (
                              <strong style={{ color: 'green' }}>正解です！</strong>
                            ) : (
                              <strong style={{ color: 'red' }}>不正解です。</strong>
                            )}
                            <br />
                            あなたの選択: {selectedAnswers[response.id]}
                            <br />
                            正解: {response.content.answer}
                          </p>
                        )}
                      </div>
                    )}
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
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default ShowResponses;
