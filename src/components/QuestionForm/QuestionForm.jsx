import React, { useState } from 'react';
import { fetchApiResponse } from './api';  // APIリクエストを切り出したファイル
import styles from './QuestionForm.module.css';
import ResponseDisplay from './ResponseDisplay';  // 回答を表示するコンポーネント
import LoadingIndicator from './LoadingIndicator';  // ローディングインジケータ

const QuestionForm = (props) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState('');
  const [submitCount, setSubmitCount] = useState(0);  // 送信回数の状態を追加
  const { scoreRange, description, additionalInfo } = props.level;  // レベル情報を取得

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
    console.log(nextText);  // デバッグ用
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>{`${scoreRange}突破レベル`}</h1>
      <p className={styles.description}>{additionalInfo}</p>

      {/* プリセットボタン */}
      <div className={styles.presetButtons}>
        <button onClick={() => handlePresetClick(`toeicのpart5問題3問難易度は${scoreRange}レベル(わかりやすいよう改行して)`)} className={styles.presetButton}>
          part5
        </button>
        <button onClick={() => handlePresetClick(`toeicのpart6の穴埋めの問題1問、過去問参照して難易度は${scoreRange}レベル(わかりやすいよう改行して)`)} className={styles.presetButton}>
          part6
        </button>
      </div>

      {/* ローディング状態 */}
      {loading && <LoadingIndicator />}

      {/* 回答表示 */}
      <ResponseDisplay response={response} />

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
