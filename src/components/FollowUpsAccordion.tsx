import * as Accordion from '@radix-ui/react-accordion';
import { HelpCircle, Plus } from 'lucide-react';

import type { InsightFollowUp } from '../types/insights';

type FollowUpsAccordionProps = {
  items: InsightFollowUp[];
  onSelect: (question: string) => void;
};

const FollowUpsAccordion = ({ items, onSelect }: FollowUpsAccordionProps) => {
  return (
    <div className="flex items-start gap-3 rounded-[6px] py-2">
      <span className="mt-[2px] flex h-4 w-4 shrink-0 items-center justify-center text-text-secondary">
        <HelpCircle aria-hidden className="size-4" strokeWidth={2} />
      </span>

      <div className="flex flex-1 flex-col">
        <span
          className="pb-2"
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
          Follow ups
        </span>

        <Accordion.Root className="flex flex-col" collapsible type="single">
          {items.map((item, index) => (
            <Accordion.Item
              className={`flex flex-col ${index !== items.length - 1 ? 'border-b border-[#ececec]' : ''}`}
              key={item.id}
              value={item.id}
            >
              <Accordion.Trigger
                className="group flex h-10 w-full items-center justify-between text-left"
                onClick={() => onSelect(item.question)}
              >
                <span
                  className="truncate"
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
                  {item.question}
                </span>
                <span className="flex h-6 w-6 items-center justify-center text-text-secondary transition group-data-[state=open]:rotate-45">
                  <Plus aria-hidden className="size-4" strokeWidth={2} />
                </span>
              </Accordion.Trigger>

              <Accordion.Content className="overflow-hidden text-sm text-text-secondary data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down" />
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    </div>
  );
};

export default FollowUpsAccordion;
