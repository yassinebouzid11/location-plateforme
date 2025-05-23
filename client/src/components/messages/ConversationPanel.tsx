import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { MessageThread } from "./MessageThread";
import { MessageInput } from "./MessageInput";
import { getMessages, sendMessage } from "../../apiMessages/messageApi";
import { sendSocketMessage } from "../../apiMessages/socketMessage";
import { useSocketMessages } from "../../hooks/useSocketMessages";

// const mockMessages = [
//   { id: "1", content: "Hello!", senderId: "user1" },
//   { id: "2", content: "Hi, how are you?", senderId: "user2" },
// ];

export interface Message {
  _id: string;
  conversationId: string;
  senderId: string;
  content: string;
  timestamp: string;
}

interface currentUser{
  email:string
  id: string
}
export function ConversationPanel() {
  const { conversationId } = useParams();
  const [currentUser, setCurrentUser]= useState<currentUser>();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
  const storedUser = localStorage.getItem("user");
  if (storedUser) {
    setCurrentUser(JSON.parse(storedUser));
  }
}, []);

  useEffect(() => {
    getMessages(conversationId).then(setMessages);
    }, [conversationId]);

    useSocketMessages(conversationId, (message) => {
      setMessages((prev) => [...prev, message]);
  });

  // const handleSend = (msg : string) => {

  //   const storedUser = localStorage.getItem("user");
  //   if (!storedUser) {
  //     console.log("User not found in localStorage");
  //     return;
  //   }
  //   setCurrentUser(JSON.parse(storedUser))
    
  //   console.log(currentUser.id)
  //   console.log("msg :"+ msg)
  //   if (!msg.trim()) return;
  //   sendSocketMessage({
  //     conversationId,
  //     senderId: currentUser.id,
  //     content: msg,
  //   });
  // };
const handleSend = (msg: string) => {
  if (!msg.trim()) return;

  if (!currentUser || !currentUser.id) {
    console.log("Current user not loaded yet");
    return;
  }

  if (!conversationId) {
    console.log("No conversation ID");
    return;
  }

  sendSocketMessage({
    conversationId,
    senderId: currentUser.id,
    content: msg,
  });
};


  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto">
        <MessageThread messages={messages} currentUserId={currentUser?.id} />
      </div>
      <MessageInput onSend={handleSend} />
    </div>
  );
}
