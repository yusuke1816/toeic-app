import axios from 'axios';
import styles from './YourComponent.module.css'; // CSS モジュールをインポート

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
      alert('チェックしました'); // アラートでメッセージを表示
    } catch (err) {
      console.error('❌ 保存失敗:', err);
      alert('保存に失敗しました'); // エラーメッセージをアラートで表示
    }
  };

  const isDisabled = !response || (typeof response === 'string' && response.trim() === '');

  const handleClick = () => {
    if (isDisabled) {
      alert('問題がありません');
    } else {
      sendData();
    }
  };

  return (
    <div>
      <button className={styles.saveButton} onClick={handleClick}>チェックして残す</button>
    </div>
  );
};

export default YourComponent;
