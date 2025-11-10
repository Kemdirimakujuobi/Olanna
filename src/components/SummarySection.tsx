import { Sparkles } from 'lucide-react';

type SummarySectionProps = {
  text: string;
};

const SummarySection = ({ text }: SummarySectionProps) => {
  return (
    <section className="mx-6 rounded-xl bg-[#f6f6f6] px-4 py-5">
      <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
        <span className="flex size-6 items-center justify-center rounded-full bg-accent-blue/10 text-accent-blue">
          <Sparkles className="size-3.5" strokeWidth={2} />
        </span>
        Summary
      </div>
      <p className="mt-3 text-sm leading-6 text-text-secondary">{text}</p>
    </section>
  );
};

export default SummarySection;

