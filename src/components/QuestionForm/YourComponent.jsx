import axios from 'axios';

const YourComponent = ({ response }) => {
  const sendData = async () => {
    let parsedResponse = response;

    if (typeof response === 'string') {
      try {
        parsedResponse = JSON.parse(response);
      } catch (error) {
        console.error('❌ JSONのパースに失敗しました:', error);
        return;
      }
    }

    let dataToSend;

    // passage があるかどうかだけで形式判定
    if ('passage' in parsedResponse) {
      // 新形式 (Part6)
      dataToSend = { content: parsedResponse };
      console.log('📥 新形式のデータ:', dataToSend);
    } else {
      // passage がなければ旧形式 (Part5)
      dataToSend = { content: parsedResponse };
      console.log('📥 旧形式のデータ:', dataToSend);
    }

    try {
      const res = await axios.post('/api/save-response', dataToSend);
      console.log('✅ 保存成功:', res.data);
    } catch (err) {
      console.error('❌ 保存失敗:', err);
    }
  };

  return (
    <div>
      <button onClick={sendData}>データをDBに送信</button>
    </div>
  );
};

export default YourComponent;
