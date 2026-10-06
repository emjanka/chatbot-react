import { useLoaderData } from "react-router";
import { ChatMessages, ChatInput } from "../components/Chat";

const mockMessages = [
  { id: 1, type: "user", content: "Hello! Can you help me understand React Router v7?" },
  { id: 2, type: "bot", content: "Of course! React Router v7 is the latest version that introduces several improvements including better data loading, enhanced nested routing, and improved TypeScript support. What specific aspect would you like to learn about?" },
  { id: 3, type: "user", content: "How do nested routes work in v7?" },
  { id: 4, type: "bot", content: "Nested routes in React Router v7 allow you to create hierarchical UI structures. You define parent routes that contain child routes, and use the <Outlet /> component to render child components. The parent route acts as a layout component that wraps its children." },
  { id: 5, type: "user", content: "How do I handle data loading in React Router v7?" },
  { id: 6, type: "bot", content: "React Router v7 provides excellent data loading capabilities through loader functions. You can define a loader for each route, which fetches data before the component renders." },
];

export async function clientLoader({ params }) {
  // Fake delay, to simulate a slow database
  await new Promise((resolve) => setTimeout(resolve, 500));

  // Today: mock data. Next time: Supabase, using params.threadId
  return { threadId: params.threadId, messages: mockMessages };
}

export default function ChatThread() {
  const { threadId, messages } = useLoaderData();

  function addMessage(text) {
    // Saving messages comes in DOB 8
    console.log("Add message (not saved yet):", text);
  }

  return (
    <div className="chat-container">
      <h2>Thread #{threadId}</h2>
      <ChatMessages messages={messages} />
      <ChatInput onAddMessage={addMessage} />
    </div>
  );
}