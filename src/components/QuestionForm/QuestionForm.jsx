import React, { useState } from 'react';
import { fetchApiResponse } from './api';
import styles from './QuestionForm.module.css';
import ResponseDisplay from './ResponseDisplay'; // 回答を表示するコンポーネント
import LoadingIndicator from './LoadingIndicator'; // ローディングインジケータ

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
    console.log(response);  // デバッグ用
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
    console.log(nextText);  // デバッグ用
    setShowAnswer(prevState => !prevState);  
  };

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
        <button onClick={() => handlePresetClick(`問題: 
A survey shows growing interest in eco-friendly products. The company plans to launch a sustainable product line, made from recyclable materials, with biodegradable packaging. An advertising campaign, including online ads, TV, and print media, will promote the products. Profits will support environmental efforts.

空欄 (1): 
(A) However
(B) As a result
(C) Therefore
(D) On the other hand

空欄 (2): 
(A) Furthermore
(B) Otherwise
(C) Moreover
(D) In addition

空欄 (3): 
(A) In this way
(B) Consequently
(C) For example
(D) For instance

形式: {
  "passage": "...",
  "questions": [
    { "number": 1, "text": "(1)", "options": [...], "answer": "..." },
    { "number": 2, "text": "(2)", "options": [...], "answer": "..." },
    { "number": 3, "text": "(3)", "options": [...], "answer": "..." }
  ]
}`)} className={styles.presetButton}>
          part6
        </button>
      </div>

      {/* ローディング状態 */}
      {loading && <LoadingIndicator />}

      {/* 回答表示 */}
      {!loading && (
        <ResponseDisplay response={response} showAnswer={showAnswer} setShowAnswer={setShowAnswer} />
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
