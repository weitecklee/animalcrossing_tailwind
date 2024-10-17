import { ReactNode } from 'react';

export default function DividerWithText({
  text,
  className,
  content,
}: {
  text: string;
  className?: string;
  content?: ReactNode;
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-2 text-sm font-coustard bg-alternate py-2 px-3 rounded-full flex items-center gap-2">
        {text}
        {content}
      </span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
}

export interface DividerWithTextProps {
  text: string;
  className?: string;
  content?: ReactNode;
}
