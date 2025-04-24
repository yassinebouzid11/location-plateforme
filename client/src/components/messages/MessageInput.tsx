import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type Props = {
  onSend: (msg: string) => void;
};

export function MessageInput({ onSend }: Props) {
  const [value, setValue] = useState("");

  const send = () => {
    if (!value.trim()) return;
    onSend(value);
    setValue("");
  };

  return (
    <div className="flex items-center gap-2 border-t p-4">
      <Input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && send()}
        placeholder="Type a message..."
      />
      <Button onClick={send}>Send</Button>
    </div>
  );
}
