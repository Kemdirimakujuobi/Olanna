type UserMessageBubbleProps = {
  text: string;
};

const UserMessageBubble = ({ text }: UserMessageBubbleProps) => {
  return (
    <div className="flex justify-end">
      <p className="relative max-w-[328px] rounded-[20px] bg-grayscale-200 px-4 py-3 text-sm font-normal leading-5 text-text-primary shadow-[0_1px_2px_rgba(15,23,42,0.08)] after:absolute after:-bottom-[10px] after:right-10 after:block after:h-3 after:w-3 after:rotate-45 after:rounded-br-[4px] after:bg-grayscale-200 after:content-['']">
        {text}
      </p>
    </div>
  );
};

export default UserMessageBubble;

