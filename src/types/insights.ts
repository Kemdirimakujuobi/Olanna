export type InsightSectionStatus = 'idle' | 'loading' | 'ready' | 'error';

export type InsightChartPoint = {
  period: string;
  value: number;
};

export type InsightChartSerie = {
  id: string;
  color: string;
  points: InsightChartPoint[];
};

export type InsightChartPayload = {
  type: 'line';
  totalCalls: number;
  sentiment: {
    positive: number;
    neutral: number;
    negative: number;
    label: string;
    color?: string;
  };
  stats: {
    label: string;
    value: number;
    color: string;
  }[];
  series: InsightChartSerie[];
  yMax?: number;
};

export type InsightSummaryPayload = {
  text: string;
};

export type InsightFollowUp = {
  id: string;
  question: string;
};

export type InsightResponse = {
  chart: {
    status: InsightSectionStatus;
    data?: InsightChartPayload;
  };
  summary: {
    status: InsightSectionStatus;
    data?: InsightSummaryPayload;
  };
  followUps: {
    status: InsightSectionStatus;
    data?: InsightFollowUp[];
  };
};

