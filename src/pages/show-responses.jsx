import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../components/QuestionForm/QuestionForm.module.css';

const ShowResponses = () => {
  const [responses, setResponses] = useState([])
  const [showAnswer, setShowAnswer] = useState(false)
  const [selectedAnswers, setSelectedAnswers] = useState({})

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
      [number]: option,
    }))
  }
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete('/api/delete-response', { data: { id } });
      console.log('削除成功:', response.data);
      // レスポンスが成功した場合、リストから削除
      setResponses((prev) => prev.filter((res) => res.id !== id));
    } catch (err) {
      console.error('削除エラー:', err);
      console.log('削除しようとしたID:', id);
    }
  };
  
  
  const renderPassage = (passageText) => {
    return passageText.split(/\((\d+)\)/g).map((part, index) => {
      if (index % 2 === 1) {
        const qNum = parseInt(part)
        const selected = selectedAnswers[qNum] || '＿＿'
        return <strong key={index}> [{selected}] </strong>
      }
      return <span key={index}>{part}</span>
    })
  }

  return (
    <div>
      <h1>保存されたデータ</h1>

      {responses.length === 0 ? (
        <p>データはありません。</p>
      ) : (
        <ul>
          {responses.map((response) => {
            let res
            try {
              res = typeof response === 'string' ? JSON.parse(response) : response
            } catch {
              return <p key={response.id}>JSONの形式が不正です。</p>
            }

            const contentData = res?.content?.content
            const isPart6 = contentData?.passage && contentData?.questions
            const isPart5 = contentData?.question && contentData?.options

            return (
              <li key={res.id}>
                <div className={styles.responseContainer}>
                  <div className={styles.responseText}>
                    {isPart6 ? (
                      // Part6 表示
                      <div>
                        <p>{renderPassage(contentData.passage)}</p>
                        {contentData.questions.map((q) => (
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
                    ) : isPart5 ? (
                      // Part5 表示
                      <div>
                        <p>{contentData.question}</p>
                        {contentData.options.map((option, i) => (
                          <button
                            key={i}
                            onClick={() => handleSelect(res.id, option)}
                            className={`${styles.optionButton} ${
                              selectedAnswers[res.id] === option ? styles.selected : ''
                            }`}
                          >
                            {`${String.fromCharCode(65 + i)}. ${option}`}
                          </button>
                        ))}
                        {selectedAnswers[res.id] && showAnswer && (
                          <p>
                            {selectedAnswers[res.id] === contentData.answer ? (
                              <span style={{ color: 'green' }}>正解です！</span>
                            ) : (
                              <span style={{ color: 'red' }}>
                                不正解です。正解: {contentData.answer}
                              </span>
                            )}
                          </p>
                        )}
                      </div>
                    ) : (
                      <p>データ形式が対応していません。</p>
                    )}

                    {!showAnswer && (
                      <button
                        onClick={() => setShowAnswer(true)}
                        className={styles.submitButton}
                      >
                        答えを確認する
                      </button>
                    )}

                    <button
                      onClick={() => handleDelete(res.id)} // Fix here
                      className={styles.deleteButton}
                    >
                      削除
                    </button>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default ShowResponses
