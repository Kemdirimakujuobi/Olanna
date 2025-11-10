const ThinkingIndicator = () => {
  return (
    <div className="flex items-center gap-3 rounded-full bg-white/5 px-4 py-2">
      <span className="relative flex h-4 w-4 items-center justify-center">
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-transparent border-l-[#71717a] border-t-[#52525b]" />
      </span>
      <span className="text-sm font-medium text-shimmer">Thinking of an answer</span>
    </div>
  );
};

export default ThinkingIndicator;
