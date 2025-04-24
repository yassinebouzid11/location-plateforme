import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input"; // ShadCN Input

const allConversations = [
  { id: "1", name: "Alice", lastMessage: "Hey!", time: "9:00 AM" },
  { id: "2", name: "Bob", lastMessage: "Let’s meet.", time: "Yesterday" },
  { id: "3", name: "Charlie", lastMessage: "See you soon!", time: "Monday" },
];

export function SidebarConversation() {
  const { conversationId } = useParams();
  const [search, setSearch] = useState("");

  const filteredConversations = allConversations.filter((conv) =>
    conv.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-72 bg-white border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <div className="text-lg font-bold mb-2">Conversations</div>
        <Input
          placeholder="Search by name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="text-sm"
        />
      </div>
      <div className="flex-1 overflow-y-auto">
        {filteredConversations.length > 0 ? (
          filteredConversations.map((c) => (
            <Link
              to={`/messages/conversation/${c.id}`}
              key={c.id}
              className={`block px-4 py-3 hover:bg-gray-100 ${
                c.id === conversationId ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              <div>{c.name}</div>
              <div className="text-sm text-gray-500 truncate">{c.lastMessage}</div>
            </Link>
          ))
        ) : (
          <div className="p-4 text-gray-500 text-sm">No results found.</div>
        )}
      </div>
    </div>
  );
}
