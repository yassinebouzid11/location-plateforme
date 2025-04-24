import { useParams } from "react-router-dom";
import { useState } from "react";
import { MessageThread } from "./MessageThread";
import { MessageInput } from "./MessageInput";

const mockMessages = [
  { id: "1", content: "Hello!", senderId: "user1" },
  { id: "2", content: "Hi, how are you?", senderId: "user2" },
];

export function ConversationPanel() {
  const { conversationId } = useParams();
  const currentUserId = "user1";
  const [messages, setMessages] = useState(mockMessages);

  const handleSend = (msg: string) => {
    setMessages((prev) => [
      ...prev,
      { id: Date.now().toString(), content: msg, senderId: currentUserId },
    ]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <MessageThread messages={messages} currentUserId={currentUserId} />
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}
