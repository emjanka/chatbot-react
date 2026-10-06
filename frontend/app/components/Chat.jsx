import { useState } from "react";

export function Message({ type = "bot", children }) {
  return (
    <div className={`message ${type}-message`}>
      <div className="message-content">{children}</div>
    </div>
  );
}

export function ChatMessages({ messages = [] }) {
  return (
    <div className="chat-messages">
      {messages.map((message) => (
        <Message key={message.id} type={message.type}>
          {message.content}
        </Message>
      ))}
    </div>
  );
}

export function ChatInput({ onAddMessage }) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(event) {
    event.preventDefault();

    const form = event.target;
    const formData = new FormData(form);
    const text = formData.get("message").trim();

    if (!text) {
      return;
    }

    onAddMessage(text);
    form.reset();

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
    }, 1000);
  }

  return (
    <form className="chat-input-container" onSubmit={handleSubmit}>
      <div className="chat-input-wrapper">
        <textarea
          className="chat-input"
          name="message"
          placeholder="Type your message here..."
          rows="1"
        />
        <button className="send-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </div>
    </form>
  );
}