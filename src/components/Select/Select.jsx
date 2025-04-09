import Link from 'next/link';

const ScoreButtons = () => {
  return (
    <div>
      <h1>TOEICスコア帯を選択</h1>
      <div>
        <Link href="/600-700">
          <button>600-700点</button>
        </Link>
        <Link href="/700-800">
          <button>700-800点</button>
        </Link>
        <Link href="/900+">
          <button>900点以上</button>
        </Link>
      </div>
    </div>
  );
};

export default ScoreButtons;

