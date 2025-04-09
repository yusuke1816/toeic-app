import QuestionForm from "../../components/QuestionForm/QuestionForm";

const level = {
  scoreRange: "900点以上",
  description: "このページでは900点以上のTOEICスコア帯に関連する情報が表示されます。",
  additionalInfo: "詳細なスコア分析やアドバイスを提供します。",
};

// pages/super.jsx
const Super = () => {
  return (
    <div>
      <h1>900点以上のスコア帯</h1>
      <p>このページでは900点以上のTOEICスコア帯に関連する情報が表示されます。</p>
      <QuestionForm level={level} />
    </div>
  );
};

export default Super;
