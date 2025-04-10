import React, { useState, useEffect } from 'react';
import { fetchApiResponse } from './api';
import styles from './QuestionForm.module.css';
import ResponseDisplay from './ResponseDisplay'; // 回答を表示するコンポーネント
import LoadingIndicator from './LoadingIndicator'; // ローディングインジケータ
import Part6Display from './Part6Display'; // Part 6 の回答を表示するコンポーネント

const QuestionForm = (props) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [submitCount, setSubmitCount] = useState(0);  // 送信回数の状態を追加
  const { scoreRange, description, additionalInfo } = props.level;  // レベル情報を取得
  const [showAnswer, setShowAnswer] = useState(false); // 答えの表示/非表示を管理するステート

  // 質問を送信する関数
  const handleSubmit = async (question) => {
    setLoading(true);  // ローディング開始
    const response = await fetchApiResponse(question);
    setResponse(response);  // レスポンス設定
    setLoading(false);  // ローディング終了
    setSubmitCount(prevCount => prevCount + 1);  // 送信回数をインクリメント
  };

  // プリセットボタンのテキストを設定して送信
  const handlePresetClick = async (newText) => {
    setText(newText);
    await handleSubmit(newText);
  };

  // 次の問題に進む処理
  const handleNextClick = () => {
    const nextText = `${text}`;  // 次の質問を設定
    setText(nextText);  // テキスト更新
    handleSubmit(nextText);  // 次の質問送信
    setShowAnswer(prevState => !prevState);  
  };

  const isPart6 = (response) => {
    if (response && typeof response === "string" && response.includes("passage")) {
      return true;
    }
    return false;
  };

  // ここでresponseの変更を監視
  useEffect(() => {
    if (response) {
      console.log("Response updated", response);
    }
  }, [response]); // responseの更新を監視

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{`${scoreRange}突破レベル`}</h1>
      <p className={styles.description}>{additionalInfo}</p>

      {/* プリセットボタン */}
      <div className={styles.presetButtons}>
        <button onClick={() => handlePresetClick(`toeicのpart5問題1問難易度は${scoreRange}レベル[
  { "question": "...", "options": [...], "answer": "..." }
]
このかたちで出力
`)} className={styles.presetButton}>
          part5
        </button>
        <button onClick={() => handlePresetClick(`なるべくtoken消費しないように、toeicのpart6の長文虫食い問題を一問だけ出して形式は{
  "passage": "...",
  "questions": [
    { "number": 1, "text": "(1)", "options": [...], "answer": "..." },
    { "number": 2, "text": "(2)", "options": [...], "answer": "..." },
    { "number": 3, "text": "(3)", "options": [...], "answer": "..." }
  ]
}


このかたちで出力
`)} className={styles.presetButton}>
          part6
        </button>
      </div>

      {/* ローディング状態 */}
      {loading && <LoadingIndicator />}

      {/* 回答表示 */}
      {!loading && (
        isPart6(response) ? (
          <Part6Display response={response} />
        ) : (
          <ResponseDisplay response={response} showAnswer={showAnswer} setShowAnswer={setShowAnswer} />
        )
      )}

      {/* 次の問題ボタン */}
      <button onClick={handleNextClick} className={styles.nextButton}>
        次へ
      </button>

      {/* 送信回数表示 */}
      <p>{submitCount}回目</p>
    </div>
  );
};

export default QuestionForm;
