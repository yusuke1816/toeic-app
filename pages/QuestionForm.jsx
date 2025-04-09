import React, { useState } from 'react';
import axios from 'axios';

function QuestionForm() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',  // OpenAI APIのエンドポイントURL
        {
          model: 'gpt-4',
          messages: [
            { role: 'user', content: question }
          ],
          max_tokens: 100,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
            // APIキーを環境変数から取得
          },
        }
      );

      setResponse(res.data.choices[0].message.content.trim());
    } catch (error) {
      console.error(error);
      setResponse('エラーが発生しました。APIキーを確認してください。');
    }
  };

  return (
    <div>
      <h1>OpenAI 質問フォーム</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="質問を入力"
          required
        />
        <button type="submit">送信</button>
      </form>
      <h2>回答:</h2>
      <p>{response}</p>
    </div>
  );
}

export default QuestionForm;
