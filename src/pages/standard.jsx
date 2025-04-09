// pages/standard.jsx

import QuestionForm from "../components/QuestionForm/QuestionForm";

const level = {
  scoreRange: "700-800点",
  description: "このページでは700-800点のTOEICスコア帯に関連する情報が表示されます。",
  additionalInfo: "次のステップに進むためのアドバイスを提供します。",
};

const Standard = () => {
  return (
    <div>
      <h1>700-800点のスコア帯</h1>
      <p>このページでは700-800点のTOEICスコア帯に関連する情報が表示されます。</p>
      {/* levelオブジェクトをpropsとして渡す */}
      <QuestionForm level={level} />
    </div>
  );
};

export default Standard;
