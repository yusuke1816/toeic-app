// pages/advanced.jsx

import QuestionForm from "../../components/QuestionForm/QuestionForm";

const level = {
  scoreRange: "800-900点",
  description: "このページでは800-900点のTOEICスコア帯に関連する情報が表示されます。",
  additionalInfo: "さらに高得点を狙うための戦略を提供します。",
};

const Advanced = () => {
  return (
    <div>
      <h1>800-900点のスコア帯</h1>
      <p>このページでは800-900点のTOEICスコア帯に関連する情報が表示されます。</p>
      {/* levelオブジェクトをpropsとして渡す */}
      <QuestionForm level={level} />
    </div>
  );
};

export default Advanced;
