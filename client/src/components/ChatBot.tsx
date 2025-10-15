// components/ChatBot.tsx
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ChatBot({ open, onClose }: Props) {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMessage = { sender: "bot", text: data.reply };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => !val && onClose()}>
      <DialogContent className="max-w-md h-[500px] flex flex-col">
        <div className="flex-1 overflow-y-auto space-y-2 p-2">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`p-2 rounded-xl max-w-[80%] ${
                msg.sender === "user" ? "bg-blue-500 text-white ml-auto" : "bg-gray-200 text-black"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>
        <div className="flex gap-2 p-2 border-t">
          <Input value={input} onChange={(e) => setInput(e.target.value)} placeholder="Ask something..." />
          <Button onClick={sendMessage}>Send</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
