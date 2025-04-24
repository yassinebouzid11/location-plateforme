import { cn } from "@/lib/utils";

type Props = {
  message: string;
  isSender: boolean;
};

export function MessageItem({ message, isSender }: Props) {
  return (
    <div className={cn("flex", isSender ? "justify-end" : "justify-start")}>
      <div className={cn(
        "rounded-2xl px-4 py-2 max-w-xs shadow",
        isSender ? "bg-blue-500 text-white" : "bg-gray-100 text-black"
      )}>
        {message}
      </div>
    </div>
  );
}
