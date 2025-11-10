import SummarySection from './SummarySection';

import type { InsightSectionStatus, InsightSummaryPayload } from '../types/insights';

type InsightSummaryCardProps = {
  status: InsightSectionStatus;
  data?: InsightSummaryPayload;
};

const InsightSummaryCard = ({ status, data }: InsightSummaryCardProps) => {
  const isReady = status === 'ready' && data;

  if (status === 'error') {
    return <div className="text-sm text-red-500">Unable to load summary. Please try again.</div>;
  }

  return <div>{isReady ? <SummarySection text={data.text} /> : <SummarySkeleton />}</div>;
};

const SummarySkeleton = () => {
  return (
    <div className="flex items-start gap-3 rounded-[6px] py-2">
      <div className="mt-[2px] h-4 w-4 shrink-0 animate-pulse rounded bg-alpha-soft/80" />
      <div className="flex flex-1 flex-col gap-2">
        <div className="h-4 w-24 animate-pulse rounded-md bg-alpha-soft" />
        <div className="h-4 animate-pulse rounded-md bg-alpha-soft" />
        <div className="h-4 w-5/6 animate-pulse rounded-md bg-alpha-soft" />
      </div>
    </div>
  );
};

export default InsightSummaryCard;

