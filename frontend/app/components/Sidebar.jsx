import { Link, NavLink } from "react-router";

function SidebarHeader() {
  return (
    <div className="sidebar-header">
      <h2 className="chatbot-title">Chatbot</h2>
      <Link to="/chat/new" className="new-chat-btn">
        + New
      </Link>
    </div>
  );
}

function ChatThreadItem({ id, title = "Untitled chat", onDeleteThread }) {
  function handleDeleteClick(event) {
    event.stopPropagation();
    console.log("Delete clicked", {
      id,
      title,
      timestamp: new Date().toISOString(),
    });
    onDeleteThread(id);
  }

  return (
    <li className="chat-thread-item">
      <div className="chat-thread-item-content">
                <NavLink
          to={`/chat/${id}`}
          className={({ isActive }) =>
            isActive
              ? "chat-thread-link chat-thread-link-active"
              : "chat-thread-link"
          }
        >
          {title}
        </NavLink>
        <button
          type="button"
          className="delete-thread-btn"
          aria-label={`Delete chat: ${title}`}
          onClick={handleDeleteClick}
        >
          &times;
        </button>
      </div>
    </li>
  );
}

function ChatThreadsList({ threads = [], onDeleteThread }) {
  return (
    <nav className="chat-threads-list" aria-label="Chat threads">
      <ul>
        {threads.map((thread) => (
          <ChatThreadItem
            key={thread.id}
            id={thread.id}
            title={thread.title}
            onDeleteThread={onDeleteThread}
          />
        ))}
      </ul>
    </nav>
  );
}

function SidebarFooter() {
  return (
    <div className="sidebar-footer">
      <Link to="/profile" className="user-profile">
        <img
          src="https://ui-avatars.com/api/?name=Batman&background=0D0D0D&color=fff&size=40"
          alt="User avatar"
          className="user-avatar"
          width={30}
          height={30}
        />
        <span className="user-name">Batman</span>
      </Link>
    </div>
  );
}

export default function Sidebar({ threads = [], onDeleteThread }) {
  return (
    <aside className="sidebar">
      <SidebarHeader />
      <ChatThreadsList threads={threads} onDeleteThread={onDeleteThread} />
      <SidebarFooter />
    </aside>
  );
}