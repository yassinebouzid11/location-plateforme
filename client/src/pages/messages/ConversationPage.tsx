import { useParams } from "react-router-dom";
import { useState } from "react";
import { MessageThread } from "@/components/messages/MessageThread";
import { MessageInput } from "@/components/messages/MessageInput";

const mockMessages = [
  { id: "1", content: "Hey!", senderId: "user1" },
  { id: "2", content: "Hello!", senderId: "user2" },
];

export function ConversationPage() {
  const { conversationId } = useParams();
  const currentUserId = "user1";

  const [messages, setMessages] = useState(mockMessages);

  const handleSend = (msg: string) => {
    const newMessage = {
      id: Date.now().toString(),
      content: msg,
      senderId: currentUserId,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="max-w-md mx-auto flex flex-col h-screen">
      <div className="flex-1 overflow-hidden">
        <MessageThread messages={messages} currentUserId={currentUserId} />
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}
