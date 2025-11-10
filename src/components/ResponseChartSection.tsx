import CallsSentimentChart, { type SentimentSeries } from './CallsSentimentChart';
import type { InsightChartPayload, InsightSectionStatus } from '../types/insights';

type ResponseChartSectionProps = {
  status: InsightSectionStatus;
  data?: InsightChartPayload;
};

const ResponseChartSection = ({ status, data }: ResponseChartSectionProps) => {
  if (status === 'loading' || !data) {
    return (
      <div className="mx-6 h-[195px] rounded-xl border border-border-subtle bg-[#fcfcfc] px-4 pb-6 pt-4">
        <div className="flex h-full items-center justify-center text-xs text-text-secondary">Loading chart…</div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="mx-6 h-[195px] rounded-xl border border-border-subtle bg-[#fcfcfc] px-4 pb-6 pt-4">
        <div className="flex h-full items-center justify-center text-xs text-red-500">Unable to load chart</div>
      </div>
    );
  }

  const series: SentimentSeries[] = data.series.map((serie) => ({
    id: serie.id,
    color: serie.color,
    data: serie.points.map((point) => ({
      x: point.period,
      y: point.value,
    })),
  }));

  return <CallsSentimentChart data={series} yMax={data.yMax} />;
};

export default ResponseChartSection;

