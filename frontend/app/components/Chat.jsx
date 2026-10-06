import { useEffect, useRef } from "react";
import { Form, useNavigation } from "react-router";

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

export function ChatInput() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const formRef = useRef(null);
  const wasSubmitting = useRef(false);

  // Clear the textarea once the message has been sent
  useEffect(() => {
    if (isSubmitting) {
      wasSubmitting.current = true;
    } else if (wasSubmitting.current) {
      formRef.current?.reset();
      wasSubmitting.current = false;
    }
  }, [isSubmitting]);

  return (
    <Form
      method="post"
      className="chat-input-container"
      ref={formRef}
    >
      <div className="chat-input-wrapper">
        <textarea
          className="chat-input"
          name="message"
          placeholder="Type your message here..."
          rows="1"
          required
        />
        <button className="send-button" type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Sending..." : "Send"}
        </button>
      </div>
    </Form>
  );
}