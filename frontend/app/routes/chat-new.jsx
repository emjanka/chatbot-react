import { redirect, useActionData } from "react-router";
import { ChatInput } from "../components/Chat";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const headers = {
  apikey: supabaseKey,
  Authorization: `Bearer ${supabaseKey}`,
  "Content-Type": "application/json",
};

export async function clientAction({ request }) {
  const formData = await request.formData();
  const content = formData.get("message");

  if (!content || !content.trim()) {
    return { error: "Message cannot be empty" };
  }

  const text = content.trim();

  // 1. Create the thread, and ask Supabase to send the new row back
  const threadResponse = await fetch(`${supabaseUrl}/rest/v1/threads`, {
    method: "POST",
    headers: {
      ...headers,
      Prefer: "return=representation",
    },
    body: JSON.stringify({ title: text.slice(0, 50) }),
  });

  if (!threadResponse.ok) {
    return { error: "Could not create the thread. Please try again." };
  }

  const [thread] = await threadResponse.json();

  // 2. Create the first message in the new thread
  const messageResponse = await fetch(`${supabaseUrl}/rest/v1/messages`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      thread_id: thread.id,
      type: "user",
      content: text,
    }),
  });

  if (!messageResponse.ok) {
    return { error: "Could not save the message. Please try again." };
  }

  // 3. Go to the new thread
  return redirect(`/chat/${thread.id}`);
}

export default function ChatNew() {
  const actionData = useActionData();

  return (
    <div className="chat-container">
      <h2>New chat</h2>
      <div className="chat-messages" />
      {actionData?.error && (
        <div className="error-message">{actionData.error}</div>
      )}
      <ChatInput />
    </div>
  );
}