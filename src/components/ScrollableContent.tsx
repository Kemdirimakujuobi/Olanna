import clsx from 'clsx';
import type { PropsWithChildren } from 'react';
import { useEffect, useRef, useState } from 'react';

const ScrollableContent = ({ children }: PropsWithChildren<unknown>) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [showFade, setShowFade] = useState(false);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;

    const handleScroll = () => {
      const { scrollTop, clientHeight, scrollHeight } = element;
      const atBottom = Math.ceil(scrollTop + clientHeight) >= scrollHeight - 1;
      setShowFade(!atBottom);
    };

    handleScroll();
    element.addEventListener('scroll', handleScroll);
    return () => element.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const element = scrollRef.current;
    if (!element) return;
    element.scrollTo({ top: element.scrollHeight, behavior: 'smooth' });
  }, [children]);

  return (
    <div className="relative flex w-full flex-1 min-h-0">
      <div ref={scrollRef} className="flex w-full flex-1 overflow-y-auto min-h-0">
        <div className="mx-auto flex w-full max-w-[640px] flex-col gap-6 pb-16 pt-2 min-h-0">
          {children}
          <div className="h-4" aria-hidden="true" />
        </div>
      </div>
      <div
        className={clsx(
          'pointer-events-none absolute inset-x-0 bottom-0 h-16 rounded-b-lg-plus bg-gradient-to-t from-white via-white/80 to-transparent transition-opacity duration-200',
          showFade ? 'opacity-100' : 'opacity-0'
        )}
      />
    </div>
  );
};

export default ScrollableContent;

