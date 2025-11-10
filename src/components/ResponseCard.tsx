import CallsSentimentChart, { type SentimentSeries } from './CallsSentimentChart';
import FollowUpsAccordion from './FollowUpsAccordion';
import MetricsHeader from './MetricsHeader';
import SentimentBar from './SentimentBar';
import StatsList, { type StatsListItem } from './StatsList';
import SummarySection from './SummarySection';

export type FollowUpOption = {
  id: string;
  question: string;
};

export type ResponseCardData = {
  totalCalls: number;
  chart: SentimentSeries[];
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
    label: string;
    color?: string;
  };
  stats: StatsListItem[];
  summary: string;
  followUps: FollowUpOption[];
};

type ResponseCardProps = {
  data: ResponseCardData;
  onFollowUp: (question: string) => void;
};

const ResponseCard = ({ data, onFollowUp }: ResponseCardProps) => {
  const { totalCalls, chart, sentiment, stats, summary, followUps } = data;

  return (
    <section className="rounded-lg-plus border border-border bg-background-primary">
      <div className="flex flex-col gap-6 py-6">
        <div className="px-6">
          <MetricsHeader totalCalls={totalCalls} />
        </div>

        <CallsSentimentChart data={chart} />

        <SentimentBar
          negative={sentiment.negative}
          neutral={sentiment.neutral}
          positive={sentiment.positive}
          sentimentColor={sentiment.color}
          sentimentLabel={sentiment.label}
        />

        <StatsList items={stats} />

        <SummarySection text={summary} />

        <FollowUpsAccordion items={followUps} onSelect={onFollowUp} />
      </div>
    </section>
  );
};

export default ResponseCard;

