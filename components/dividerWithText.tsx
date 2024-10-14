export default function DividerWithText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center ${className}`}>
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-2 text-sm font-coustard bg-alternate py-2 px-3 rounded-full">
        {text}
      </span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
}
