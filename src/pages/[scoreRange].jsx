import { useRouter } from 'next/router'; // useRouterをインポート
import QuestionForm from "../components/QuestionForm/QuestionForm";

// スコア帯ごとの情報を格納したオブジェクト
const levels = {
  "300-500": {
    scoreRange: "300-500点",
    description: "このページでは300-500点のTOEICスコア帯に関連する情報が表示されます。",
    additionalInfo: "このスコア帯では基本的な英語の理解が必要です。",
  },
  "500-650": {
    scoreRange: "500-650点",
    description: "このページでは500-650点のTOEICスコア帯に関連する情報が表示されます。",
    additionalInfo: "このスコア帯では日常的な英会話に必要な英語力が求められます。",
  },
  "650-780": {
    scoreRange: "650-780点",
    description: "このページでは650-780点のTOEICスコア帯に関連する情報が表示されます。",
    additionalInfo: "このスコア帯ではより複雑な英語文を理解できる力が必要です。",
  },
  "780-900": {
    scoreRange: "780-900点",
    description: "このページでは780-900点のTOEICスコア帯に関連する情報が表示されます。",
    additionalInfo: "高い英語力を持ち、ビジネス英語にも対応できる力があります。",
  },
  "900+": {
    scoreRange: "900点以上",
    description: "このページでは900点以上のTOEICスコア帯に関連する情報が表示されます。",
    additionalInfo: "このスコア帯は上級者向けで、流暢で正確な英語を使いこなせるレベルです。",
  },
};

const ScorePage = () => {
  const router = useRouter();
  const { scoreRange } = router.query; // URLパラメータを取得

  const level = levels[scoreRange]; // スコア帯に対応する情報を取得
  console.log(level); // デバッグ用
  if (!level) {
    return <p>該当するスコア帯は見つかりませんでした。</p>; // 該当しない場合の表示
  }

  return (
    <div>
      <h1>{level.scoreRange}のスコア帯</h1>
      <p>{level.description}</p>
      <QuestionForm level={level} />
    </div>
  );
};

export default ScorePage;
