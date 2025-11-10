import { useEffect, useRef, useState } from 'react';

import InputBar from './components/InputBar';
import NavBar from './components/NavBar';
import ResponseCard, { type ResponseCardData } from './components/ResponseCard';
import ScrollableContent from './components/ScrollableContent';
import ThinkingIndicator from './components/ThinkingIndicator';
import UserMessageBubble from './components/UserMessageBubble';
import type { SentimentSeries } from './components/CallsSentimentChart';

type Message =
  | { id: string; type: 'user'; text: string }
  | { id: string; type: 'thinking' }
  | { id: string; type: 'bot'; data: ResponseCardData };

const THINK_DELAY = 900;

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type ResponseTemplate = {
  positiveSeries: number[];
  negativeSeries: number[];
  summary: string;
  followUps: string[];
  sentimentLabel: string;
  sentimentColor?: string;
  positiveTotal: number;
  negativeTotal: number;
  neutralTotal: number;
};

const RESPONSE_TEMPLATES: ResponseTemplate[] = [
  {
    positiveSeries: [410_000, 430_000, 480_000, 510_000, 600_000, 595_000, 530_000, 740_000, 780_000, 775_000, 770_000, 765_000],
    negativeSeries: [95_000, 98_000, 105_000, 110_000, 125_000, 128_000, 185_000, 120_000, 115_000, 112_000, 110_000, 108_000],
    summary:
      'Strong iPhone 17 demand, especially for higher-priced Pro and Pro Max models, is expected to drive revenue growth and support higher average selling prices. Increased manufacturing commitments, particularly for flagship devices, suggest confidence in upcoming upgrade cycles and potential beats on earnings estimates.',
    followUps: [
      'Which negative calls should I follow up on?',
      'Did any leads fall through?',
      'How many calls converted to services rendered?',
    ],
    sentimentLabel: 'Negative',
    sentimentColor: '#f55151',
    positiveTotal: 10_123_000,
    negativeTotal: 1_406_931,
    neutralTotal: 839_069,
  },
  {
    positiveSeries: [320_000, 360_000, 380_000, 420_000, 460_000, 500_000, 540_000, 620_000, 660_000, 700_000, 720_000, 730_000],
    negativeSeries: [140_000, 135_000, 130_000, 125_000, 118_000, 110_000, 105_000, 102_000, 98_000, 95_000, 92_000, 90_000],
    summary:
      'Call volume continues to grow, with sustained improvements after support hours were extended. The reduction in negative interactions aligns with better agent staffing and the new routing workflow.',
    followUps: [
      'Are weekend calls trending upward as well?',
      'What issues are driving negative sentiment?',
      'Which agents handled the most positive calls?',
    ],
    sentimentLabel: 'Positive',
    sentimentColor: '#22c55e',
    positiveTotal: 8_940_000,
    negativeTotal: 1_120_000,
    neutralTotal: 620_000,
  },
  {
    positiveSeries: [280_000, 295_000, 305_000, 360_000, 420_000, 480_000, 510_000, 550_000, 590_000, 610_000, 600_000, 590_000],
    negativeSeries: [160_000, 158_000, 156_000, 155_000, 150_000, 148_000, 146_000, 142_000, 138_000, 134_000, 130_000, 128_000],
    summary:
      'Support interactions are stabilizing after the product release rush. Positive sentiment is recovering while negative calls remain concentrated around billing questions.',
    followUps: [
      'Can we see billing call volume broken down by plan?',
      'How many calls were escalated last week?',
      'Which channels drove the neutral sentiment?',
    ],
    sentimentLabel: 'Stabilizing',
    sentimentColor: '#f59e0b',
    positiveTotal: 7_540_000,
    negativeTotal: 1_860_000,
    neutralTotal: 940_000,
  },
];

const jitterSeries = (series: number[]) => series.map((value) => Math.max(0, Math.round(value * (0.97 + Math.random() * 0.06))));

const buildSeries = (values: number[], id: string, color: string): SentimentSeries => ({
  id,
  color,
  data: months.map((month, index) => ({ x: month, y: values[index] })),
});

const buildResponseData = (template: ResponseTemplate): ResponseCardData => {
  const positiveSeries = jitterSeries(template.positiveSeries);
  const negativeSeries = jitterSeries(template.negativeSeries);

  const positiveTotal = Math.round(template.positiveTotal * (0.97 + Math.random() * 0.06));
  const negativeTotal = Math.round(template.negativeTotal * (0.97 + Math.random() * 0.06));
  const neutralTotal = Math.round(template.neutralTotal * (0.97 + Math.random() * 0.06));

  return {
    totalCalls: positiveTotal + negativeTotal + neutralTotal,
    chart: [buildSeries(positiveSeries, 'Positive', '#1a88f8'), buildSeries(negativeSeries, 'Negative', '#ff1c1c')],
    sentiment: {
      positive: positiveTotal,
      negative: negativeTotal,
      neutral: neutralTotal,
      label: template.sentimentLabel,
      color: template.sentimentColor,
    },
    stats: [
      { label: 'Positive', value: positiveTotal, color: '#1a88f8' },
      { label: 'Negative', value: negativeTotal, color: '#ff1c1c' },
    ],
    summary: template.summary,
    followUps: template.followUps.map((question, index) => ({ id: `${index}`, question })),
  };
};

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const responseCursor = useRef(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idRef = useRef(0);

  const createId = () => {
    idRef.current += 1;
    return idRef.current.toString();
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  const enqueueResponse = () => {
    const template = RESPONSE_TEMPLATES[responseCursor.current % RESPONSE_TEMPLATES.length];
    responseCursor.current += 1;
    return buildResponseData(template);
  };

  const handleSubmit = (raw: string) => {
    const text = raw.trim();
    if (!text) {
      return;
    }

    const userMessage: Message = { id: createId(), type: 'user', text };
    const thinkingId = createId();

    setMessages((prev) => [...prev, userMessage, { id: thinkingId, type: 'thinking' }]);
    setInputValue('');
    setIsLoading(true);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      const data = enqueueResponse();
      setMessages((prev) => {
        const withoutThinking = prev.filter((message) => message.id !== thinkingId);
        return [...withoutThinking, { id: createId(), type: 'bot', data }];
      });
      setIsLoading(false);
    }, THINK_DELAY);
  };

  const handleFollowUp = (question: string) => {
    handleSubmit(question);
  };

  return (
    <div className="min-h-screen w-full bg-background-surface p-2 text-text-primary">
      <div className="flex h-[calc(100vh-16px)] w-full flex-col rounded-lg-plus border border-border bg-background-primary">
        <NavBar />
        <main className="flex flex-1 min-h-0 justify-center overflow-hidden px-4">
          <ScrollableContent>
            {messages.map((message) => {
              if (message.type === 'user') {
                return <UserMessageBubble key={message.id} text={message.text} />;
              }
              if (message.type === 'thinking') {
                return <ThinkingIndicator key={message.id} />;
              }
              return <ResponseCard key={message.id} data={message.data} onFollowUp={handleFollowUp} />;
            })}
          </ScrollableContent>
        </main>
        <div className="flex w-full flex-col items-center justify-center gap-4 p-4">
          <InputBar value={inputValue} onChange={setInputValue} onSubmit={handleSubmit} isLoading={isLoading} />
        </div>
      </div>
    </div>
  );
}

export default App;
