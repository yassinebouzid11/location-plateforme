import { Link } from "react-router-dom";

const mockConversations = [
  { id: "1", name: "Alice", lastMessage: "Hi there!", time: "10:00 AM" },
  { id: "2", name: "Bob", lastMessage: "Are you free?", time: "Yesterday" },
];

export function ConversationList() {
  return (
    <div className="p-4 space-y-4">
      {mockConversations.map((conv) => (
        <Link
          key={conv.id}
          to={`/messages/${conv.id}`}
          className="block p-4 rounded-xl bg-white shadow hover:bg-gray-50"
        >
          <div className="font-semibold">{conv.name}</div>
          <div className="text-sm text-gray-500">{conv.lastMessage}</div>
          <div className="text-xs text-gray-400">{conv.time}</div>
        </Link>
      ))}
    </div>
  );
}
