import { useRouter } from 'next/router'; // useRouterをインポート
import QuestionForm from "../components/QuestionForm/QuestionForm";

// スコア帯ごとの情報を格納したオブジェクト
const levels = {
  "600-700": {
    scoreRange: "600-700点",
    description: "このページでは600-700点のTOEICスコア帯に関連する情報が表示されます。",
    additionalInfo: "詳細なスコア分析やアドバイスを提供します。",
  },
  "700-800": {
    scoreRange: "700-800点",
    description: "このページでは700-800点のTOEICスコア帯に関連する情報が表示されます。",
    additionalInfo: "詳細なスコア分析やアドバイスを提供します。",
  },
  "900+": {
    scoreRange: "900点以上",
    description: "このページでは900点以上のTOEICスコア帯に関連する情報が表示されます。",
    additionalInfo: "詳細なスコア分析やアドバイスを提供します。",
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
