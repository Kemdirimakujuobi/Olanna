import * as Accordion from '@radix-ui/react-accordion';
import { HelpCircle, Minus, Plus } from 'lucide-react';

type FollowUpItem = {
  id: string;
  question: string;
};

type FollowUpsAccordionProps = {
  items: FollowUpItem[];
  onSelect: (question: string) => void;
};

const FollowUpsAccordion = ({ items, onSelect }: FollowUpsAccordionProps) => {
  return (
    <section className="px-6 pb-3">
      <div className="mb-3 flex items-center gap-2 text-sm font-medium text-text-primary">
        <span className="flex size-6 items-center justify-center rounded-full bg-alpha-soft text-text-secondary">
          <HelpCircle className="size-3.5" strokeWidth={2} />
        </span>
        Follow ups
      </div>
      <Accordion.Root collapsible type="single">
        {items.map((item) => (
          <Accordion.Item
            className="rounded-[12px] px-2 transition hover:bg-alpha-soft data-[state=open]:bg-alpha-soft"
            key={item.id}
            value={item.id}
          >
            <Accordion.Trigger
              className="group flex w-full items-center justify-between gap-3 py-3 text-left text-[14px] leading-[20px] text-text-secondary transition hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue/40 data-[state=open]:text-text-primary"
              onClick={() => onSelect(item.question)}
            >
              <span className="pr-2">{item.question}</span>
              <span className="flex size-6 items-center justify-center rounded-md border border-border bg-background-primary text-text-secondary">
                <Plus aria-hidden className="size-3 transition group-data-[state=open]:hidden" />
                <Minus aria-hidden className="hidden size-3 group-data-[state=open]:block" />
              </span>
            </Accordion.Trigger>
            <Accordion.Content className="overflow-hidden text-sm text-text-secondary data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" />
          </Accordion.Item>
        ))}
      </Accordion.Root>
    </section>
  );
};

export default FollowUpsAccordion;

