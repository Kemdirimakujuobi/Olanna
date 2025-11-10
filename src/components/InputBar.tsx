import { useEffect, useRef, useState } from 'react';

import { ArrowUp, Mic, Paperclip, Plus } from 'lucide-react';

import IconButton from './IconButton';

type InputBarProps = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  isLoading?: boolean;
};

const InputBar = ({ value, onChange, onSubmit, isLoading = false }: InputBarProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const isTyping = isFocused || value.length > 0;

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
  }, [value]);

  const handleSubmit = () => {
    if (!value.trim() || isLoading) return;
    onSubmit(value.trim());
  };

  return (
    <div
      className={`flex w-[640px] flex-col items-start gap-3 rounded-[16px] p-3 transition-all duration-200 ${
        isTyping
          ? 'bg-background-primary shadow-[0_0_0_1px_rgba(0,0,0,0.06),0_3px_3px_rgba(0,0,0,0.04),0_8px_16px_rgba(0,0,0,0.04)]'
          : 'border border-border bg-background-primary'
      }`}
    >
      <textarea
        ref={textareaRef}
        aria-label="Ask a follow up"
        className="w-full resize-none bg-transparent text-[16px] font-normal text-text-primary placeholder:text-text-secondary focus:outline-none"
        placeholder="Ask a follow up"
        rows={1}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onKeyDown={(event) => {
          if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault();
            handleSubmit();
          }
        }}
      />
      <div className="flex w-full items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <IconButton aria-label="Add attachment">
            <Plus className="size-4" strokeWidth={2} />
          </IconButton>
          <IconButton aria-label="Attach file">
            <Paperclip className="size-4" strokeWidth={2} />
          </IconButton>
        </div>
        <IconButton
          aria-label={isTyping ? 'Send message' : 'Record audio'}
          variant={isTyping ? 'primary' : 'secondary'}
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isTyping ? <ArrowUp className="size-4" strokeWidth={2} /> : <Mic className="size-4" strokeWidth={2} />}
        </IconButton>
      </div>
    </div>
  );
};

export default InputBar;

