import { MessageItem } from "./MessageItem";

type Message = {
  id: string;
  content: string;
  senderId: string;
};

type Props = {
  messages: Message[];
  currentUserId: string;
};

export function MessageThread({ messages, currentUserId }: Props) {
  
  return (
    <div className="flex flex-col gap-2 p-4 h-[400px] overflow-y-auto bg-white">
      {messages.map((msg) => (
        <MessageItem
          key={msg.id}
          message={msg.content}
          isSender={msg.senderId === currentUserId}
        />
      ))}
    </div>
  );
}
