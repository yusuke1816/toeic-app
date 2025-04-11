import axios from 'axios';

const YourComponent = () => {
  // 旧形式 (選択肢と答えのみ)
  const oldResponseData = {
    question: 'What is your name?',
    options: ['A', 'B', 'C', 'D'],
    answer: 'A',
  };

  // 新形式 (passage と複数の質問)
  const newResponseData = {
    passage: 'A survey shows growing interest in eco-friendly products. The company plans to launch a sustainable product line, made from recyclable materials, with biodegradable packaging. An advertising campaign, including online ads, TV, and print media, will promote the products. Profits will support environmental efforts.',
    questions: [
      { number: 1, text: '(1)', options: ['However', 'As a result', 'Therefore', 'On the other hand'], answer: 'However' },
      { number: 2, text: '(2)', options: ['Furthermore', 'Otherwise', 'Moreover', 'In addition'], answer: 'Furthermore' },
      { number: 3, text: '(3)', options: ['In this way', 'Consequently', 'For example', 'For instance'], answer: 'Consequently' }
    ]
  };

  // データ送信処理
  const sendData = async (data) => {
    try {
      const res = await axios.post('/api/save-response', data);
      console.log('✅ 保存成功:', res.data);
    } catch (err) {
      console.error('❌ 保存失敗:', err);
    }
  };

  return (
    <div>
      <button onClick={() => sendData(oldResponseData)}>Send Old Data to DB</button>
      <button onClick={() => sendData(newResponseData)}>Send New Data to DB</button>
    </div>
  );
};

export default YourComponent;
