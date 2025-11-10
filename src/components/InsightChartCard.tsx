import MetricsHeader from './MetricsHeader';
import ResponseChartSection from './ResponseChartSection';
import SentimentBar from './SentimentBar';
import StatsList from './StatsList';

import type { InsightChartPayload, InsightSectionStatus } from '../types/insights';

type InsightChartCardProps = {
  status: InsightSectionStatus;
  data?: InsightChartPayload;
};

const InsightChartCard = ({ status, data }: InsightChartCardProps) => {
  const isReady = status === 'ready' && data;

  return (
    <section className="rounded-lg-plus border border-border bg-background-primary">
      <div className="flex flex-col gap-6 py-6">
        {isReady ? (
          <div className="px-6">
            <MetricsHeader totalCalls={data.totalCalls} />
          </div>
        ) : (
          <div className="px-6">
            <div className="flex flex-col gap-2">
              <div className="h-4 w-24 animate-pulse rounded-md bg-alpha-soft" />
              <div className="h-6 w-36 animate-pulse rounded-md bg-alpha-soft" />
            </div>
          </div>
        )}

        <ResponseChartSection status={status} data={data} />

        {isReady ? (
          <>
            <SentimentBar
              negative={data.sentiment.negative}
              neutral={data.sentiment.neutral}
              positive={data.sentiment.positive}
              sentimentColor={data.sentiment.color}
              sentimentLabel={data.sentiment.label}
            />

            <StatsList items={data.stats} />
          </>
        ) : (
          <div className="flex flex-col gap-3 px-6">
            <div className="h-4 animate-pulse rounded-md bg-alpha-soft" />
            <div className="h-4 w-3/4 animate-pulse rounded-md bg-alpha-soft" />
          </div>
        )}
      </div>
    </section>
  );
};

export default InsightChartCard;

