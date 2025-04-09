import React, { useState } from 'react';
import axios from 'axios';
import styles from './QuestionForm.module.css';

function QuestionForm() {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false); // リクエスト中かどうかの状態
  const [text, setText] = useState(''); // 現在の質問を管理

  // 改行を <p> タグに変換するヘルパー関数
  const formatResponse = (text) => {
    return text.split('\n').map((line, index) => <p key={index}>{line}</p>);
  };

  const handleSubmit = async (question) => {
    setLoading(true);  // リクエスト開始時にローディングを開始
    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            { role: 'user', content: question }
          ],
          max_tokens: 150,
    temperature: 0.5,  // 高すぎない温度でランダム性を減らす
    top_p: 1,  // 最大確率の選択肢を使用
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
          },
        }
      );

      setResponse(res.data.choices[0].message.content.trim());
    } catch (error) {
      console.error(error);
      setResponse('エラーが発生しました。APIキーを確認してください。');
    } finally {
      setLoading(false); // リクエスト終了時にローディングを終了
    }
  };

  const handlePresetClick = async (newText) => {
    setText(newText); // 新しいプロンプトを設定
    await handleSubmit(newText);  // プリセットボタンのテキストをそのまま送信
  };

  // 次の問題へ進む
  const handleNextClick = () => {
    // 現在のテキストを使って、次の問題を送信する
    const nextText = `${text}`; // テキストに「違うので」を付けて次の問題に
    setText(nextText); // 次の質問を設定
    handleSubmit(nextText); // 次の質問を送信
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.header}>OpenAI 質問フォーム</h1>

      {/* プリセットボタン */}
      <div className={styles.presetButtons}>
        <button onClick={() => handlePresetClick('toeicのpart5問題3問(わかりやすいよう改行して)')} className={styles.presetButton}>
          part5
        </button>
        <button onClick={() => handlePresetClick('toeicのpart6問題(わかりやすいよう改行して)')} className={styles.presetButton}>
          part6
        </button>
        {/* 必要に応じて増やせる */}
      </div>

      {/* ローディング状態 */}
      {loading && <div className={styles.loading}>送信中...</div>}

      <div className={styles.responseContainer}>
        <h2 className={styles.responseHeader}>回答:</h2>
        <div className={styles.responseText}>
          {/* 改行を処理して表示 */}
          {formatResponse(response)}
        </div>
      </div>

      {/* 次の問題ボタン */}
      <button onClick={handleNextClick} className={styles.nextButton}>
        次へ
      </button>
    </div>
  );
}

export default QuestionForm;
