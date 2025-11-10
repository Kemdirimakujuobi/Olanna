import { ChevronDown } from 'lucide-react';

type RangeOption = 'D' | 'M' | 'Y';

type MetricsHeaderProps = {
  totalCalls: number;
  filterLabel?: string;
  rangeOptions?: RangeOption[];
  activeRange?: RangeOption;
  onRangeChange?: (option: RangeOption) => void;
};

const MetricsHeader = ({
  totalCalls,
  filterLabel = 'Sentiment',
  rangeOptions = ['D', 'M', 'Y'],
  activeRange = 'Y',
  onRangeChange,
}: MetricsHeaderProps) => {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div>
        <span className="block text-sm font-medium text-text-secondary">Total calls</span>
        <p className="mt-1 text-[24px] font-semibold leading-[27px] text-text-primary tabular-nums">
          {totalCalls.toLocaleString()}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button
          className="flex h-8 items-center gap-2 rounded-md border border-border bg-background-primary px-3 text-sm font-medium text-text-primary shadow-[0_0_0_1px_rgba(5,5,5,0.07)_inset] transition hover:bg-alpha-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue/40"
          type="button"
        >
          {filterLabel}
          <ChevronDown className="size-4 text-text-secondary" strokeWidth={2} />
        </button>

        <div className="flex h-8 w-[92px] items-center justify-between rounded-md border border-border bg-alpha-soft p-1 shadow-inner">
          {rangeOptions.map((option) => {
            const isActive = option === activeRange;
            return (
              <button
                key={option}
                className={`flex h-full w-[30px] items-center justify-center rounded-md px-3 text-sm font-medium transition ${
                  isActive
                    ? 'bg-background-primary text-text-primary shadow-[0_0_0_1px_rgba(20,20,20,0.11)]'
                    : 'text-text-secondary hover:text-text-primary'
                }`}
                onClick={() => onRangeChange?.(option)}
                type="button"
              >
                {option}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export type { RangeOption };
export default MetricsHeader;

