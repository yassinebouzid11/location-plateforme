import { Message } from "./ConversationPanel";
import { MessageItem } from "./MessageItem";



type Props = {
  messages: Message[]
  currentUserId: string | undefined
};

export function MessageThread({ messages, currentUserId }: Props) {
  
  return (
    <div className="flex flex-col gap-2 p-4 h-screen bg-white">
      {messages.map((msg) => (
        <MessageItem
          key={msg._id}
          message={msg.content}
          isSender={msg.senderId === currentUserId}
        />
      ))}
    </div>
  );
}
