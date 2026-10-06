import { useActionData, useLoaderData } from "react-router";
import { ChatMessages, ChatInput } from "../components/Chat";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const headers = {
  apikey: supabaseKey,
  Authorization: `Bearer ${supabaseKey}`,
};

export async function clientLoader({ params }) {
  // 1. The thread itself (a GET always returns an array)
  const threadResponse = await fetch(
    `${supabaseUrl}/rest/v1/threads?select=*&id=eq.${params.threadId}`,
    { headers },
  );

  if (!threadResponse.ok) {
    throw new Error("Could not load thread");
  }

  const threads = await threadResponse.json();
  const thread = threads[0];

  if (!thread) {
    throw new Response("Thread not found", { status: 404 });
  }

  // 2. The thread's messages, oldest first
  const messagesResponse = await fetch(
    `${supabaseUrl}/rest/v1/messages?select=*&thread_id=eq.${params.threadId}&order=created_at.asc`,
    { headers },
  );

  if (!messagesResponse.ok) {
    throw new Error("Could not load messages");
  }

  const messages = await messagesResponse.json();

  return { thread, messages };
}

export async function clientAction({ params, request }) {
  const formData = await request.formData();
  const content = formData.get("message");

  // Expected error: return it, so the user can fix it
  if (!content || !content.trim()) {
    return { error: "Message cannot be empty" };
  }

  const response = await fetch(`${supabaseUrl}/rest/v1/messages`, {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      thread_id: params.threadId,
      type: "user",
      content: content.trim(),
    }),
  });

  if (!response.ok) {
    return { error: "Could not send the message. Please try again." };
  }

  return { success: true };
}

export default function ChatThread() {
  const actionData = useActionData();
  const { thread, messages } = useLoaderData();

  return (
    <div className="chat-container">
      <h2>{thread.title}</h2>
      <ChatMessages messages={messages} />
      {actionData?.error && (
        <div className="error-message">{actionData.error}</div>
      )}
      <ChatInput />
    </div>
  );
}