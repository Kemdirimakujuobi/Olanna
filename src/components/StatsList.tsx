type StatsListItem = {
  label: string;
  value: number;
  color: string;
};

type StatsListProps = {
  items: StatsListItem[];
};

const formatter = new Intl.NumberFormat('en-US');

const StatsList = ({ items }: StatsListProps) => {
  return (
    <div className="flex flex-col gap-2 px-6">
      {items.map((item) => (
        <div
          key={item.label}
          className="flex items-center justify-between gap-4 py-2 text-[14px] leading-[20px] text-text-secondary"
        >
          <div className="flex items-center gap-3">
            <span className="flex size-[8px] items-center justify-center rounded-full" style={{ backgroundColor: item.color }} />
            <span className="font-medium">{item.label}</span>
          </div>
          <span className="text-right text-[14px] font-semibold text-text-primary tabular-nums">
            {formatter.format(item.value)}
          </span>
        </div>
      ))}
    </div>
  );
};

export type { StatsListItem };
export default StatsList;

