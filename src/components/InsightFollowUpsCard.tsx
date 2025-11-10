import FollowUpsAccordion from './FollowUpsAccordion';

import type { InsightFollowUp, InsightSectionStatus } from '../types/insights';

type InsightFollowUpsCardProps = {
  status: InsightSectionStatus;
  data?: InsightFollowUp[];
  onSelect: (question: string) => void;
};

const InsightFollowUpsCard = ({ status, data, onSelect }: InsightFollowUpsCardProps) => {
  const isReady = status === 'ready' && data;

  if (status === 'error') {
    return <div className="text-sm text-red-500">Unable to load follow ups. Please try again.</div>;
  }

  return (
    <div>{isReady ? <FollowUpsSection items={data} onSelect={onSelect} /> : <FollowUpsSkeleton />}</div>
  );
};

const FollowUpsSection = ({
  items,
  onSelect,
}: {
  items: InsightFollowUp[];
  onSelect: (question: string) => void;
}) => {
  return <FollowUpsAccordion items={items} onSelect={onSelect} />;
};

const FollowUpsSkeleton = () => {
  return (
    <div className="flex flex-col gap-3 rounded-[6px] py-2">
      <div className="flex items-start gap-3">
        <div className="mt-[2px] h-4 w-4 shrink-0 animate-pulse rounded bg-alpha-soft/80" />
        <div className="h-4 w-20 animate-pulse rounded-md bg-alpha-soft" />
      </div>
      <div className="flex flex-col gap-2 pl-[30px]">
        <div className="h-10 animate-pulse rounded-md bg-alpha-soft" />
        <div className="h-10 animate-pulse rounded-md bg-alpha-soft" />
      </div>
    </div>
  );
};

export default InsightFollowUpsCard;

