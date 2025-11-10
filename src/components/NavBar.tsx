import { NotebookPen, Shuffle } from 'lucide-react';

import IconButton from './IconButton';

const NavBar = () => {
  return (
    <div className="flex w-full items-center justify-between border-b border-border px-4 py-4">
      <span className="text-[16px] font-medium leading-[24px] text-text-primary">Agent</span>
      <div className="flex items-center gap-2">
        <IconButton aria-label="Shuffle insights">
          <Shuffle className="h-4 w-4" strokeWidth={2} />
        </IconButton>
        <button
          className="flex h-8 items-center gap-2 rounded-md border border-border bg-background-primary px-4 text-[14px] font-medium text-text-secondary transition hover:bg-alpha-soft focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-blue/40"
          type="button"
        >
          <NotebookPen className="size-[16px]" strokeWidth={2} />
          Hide history
        </button>
      </div>
    </div>
  );
};

export default NavBar;

