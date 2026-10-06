import { useParams } from "react-router";

export default function ChatThread() {
  const { threadId } = useParams();

  return (
    <div className="chat-container">
      <h2>Thread #{threadId}</h2>
    </div>
  );
}