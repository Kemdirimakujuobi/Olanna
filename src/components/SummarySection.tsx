import { Loader2 } from 'lucide-react';

type SummarySectionProps = {
  text: string;
};

const SummarySection = ({ text }: SummarySectionProps) => {
  return (
    <div className="flex items-start gap-3 rounded-[6px] py-2">
      <span className="mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center text-text-secondary">
        <Loader2 aria-hidden className="size-4" strokeWidth={2} />
      </span>

      <div className="flex flex-col gap-2">
        <span
          className="text-sm font-medium"
          style={{
            color: 'var(--grayscale-950, #0A0A0A)',
            fontFamily: 'var(--Body-fontFamily, Inter)',
            fontSize: 'var(--Body-fontSize, 14px)',
            fontStyle: 'normal',
            fontWeight: 'var(--Weights-Medium, 500)',
            lineHeight: 'var(--Body-lineHeight, 20px)',
            letterSpacing: 'var(--Body-letterSpacing, 0)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          Summary
        </span>
        <p
          style={{
            color: 'var(--grayscale-500, #737373)',
            fontFamily: 'var(--Body-fontFamily, Inter)',
            fontSize: 'var(--Body-fontSize, 14px)',
            fontStyle: 'normal',
            fontWeight: 'var(--Weights-Regular, 400)',
            lineHeight: 'var(--Body-lineHeight, 20px)',
            letterSpacing: 'var(--Body-letterSpacing, 0)',
          }}
        >
          {text}
        </p>
      </div>
    </div>
  );
};

export default SummarySection;

