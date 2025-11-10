type SentimentBarProps = {
  positive: number;
  neutral: number;
  negative: number;
  sentimentLabel?: string;
  sentimentColor?: string;
};

const SentimentBar = ({ positive, neutral, negative, sentimentLabel = 'Balanced', sentimentColor = '#f55151' }: SentimentBarProps) => {
  const total = positive + neutral + negative;
  const positivePct = Math.round((positive / total) * 100);
  const neutralPct = Math.round((neutral / total) * 100);
  const negativePct = 100 - positivePct - neutralPct;

  return (
    <div className="flex flex-col gap-3 px-6">
      <div className="flex items-center justify-between">
        <span className="text-[12px] font-medium leading-[16px] text-text-secondary">Overall call sentiment</span>
        <div className="flex items-center gap-2">
          <span className="text-[12px] font-medium leading-[16px]" style={{ color: sentimentColor }}>
            {sentimentLabel}
          </span>
          <span className="relative flex h-3 w-10 items-center rounded-full bg-alpha-soft">
            <span className="absolute right-0 h-3 w-5 rounded-full bg-accent-green" />
          </span>
        </div>
      </div>
      <div className="relative h-2 w-full overflow-hidden rounded-full bg-grayscale-200">
        <div className="absolute inset-y-0 left-0 bg-accent-red" style={{ width: `${negativePct}%` }} />
        <div
          className="absolute inset-y-0 bg-accent-orange"
          style={{ left: `${negativePct}%`, width: `${neutralPct}%` }}
        />
        <div
          className="absolute inset-y-0 right-0 bg-accent-green"
          style={{ width: `${positivePct}%` }}
        />
      </div>
    </div>
  );
};

export default SentimentBar;

