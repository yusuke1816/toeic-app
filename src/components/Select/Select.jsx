import Link from 'next/link';

const ScoreButtons = () => {
  return (
    <div>
      <h1>TOEICスコア帯を選択</h1>
      <div>
        <Link href="/300-500">
          <button>300-500点</button>
        </Link>
        <Link href="/500-650">
          <button>500-650点</button>
        </Link>
        <Link href="/650-780">
          <button>650-780点</button>
        </Link>
        <Link href="/780-900">
          <button>780-900点</button>
        </Link>
        <Link href="/900+">
          <button>900点以上</button>
        </Link>
      </div>
    </div>
  );
};

export default ScoreButtons;
