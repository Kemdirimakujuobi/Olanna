import InsightChartCard from './InsightChartCard';
import InsightFollowUpsCard from './InsightFollowUpsCard';
import InsightSummaryCard from './InsightSummaryCard';

import type { InsightResponse } from '../types/insights';

type ResponseCardProps = {
  data: InsightResponse;
  onFollowUp: (question: string) => void;
};

const ResponseCard = ({ data, onFollowUp }: ResponseCardProps) => {
  return (
    <div className="flex flex-col gap-3">
      <InsightChartCard status={data.chart.status} data={data.chart.data} />
      <InsightSummaryCard status={data.summary.status} data={data.summary.data} />
      <InsightFollowUpsCard status={data.followUps.status} data={data.followUps.data} onSelect={onFollowUp} />
    </div>
  );
};

export default ResponseCard;

