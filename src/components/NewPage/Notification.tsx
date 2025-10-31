import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import baseURL from "@/config/config";

// Single-file React + TypeScript component converted from provided HTML/JS
// Usage: place this file in your React app (e.g. src/components/SocketTest.tsx)
// Make sure to `npm install socket.io-client` and if using Vite/CRA adjust base URL as needed.

type AppNotification = {
  id: number;
  message: string;
  is_read: boolean;
  message_type?: string; // 'chat' | 'other'
  timestamp: string; // ISO string expected
};

type ChatMessage = {
  id?: number;
  sender_id: number;
  receiver_id: number;
  message: string;
  timestamp: string; // ISO
};

// const BACKEND_BASE = process.env.REACT_APP_API_URL ?? "http://127.0.0.1:5000";

const SocketTest=()=> {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [currentUserId, setCurrentUserId] = useState<number>(1);
  const [partnerId, setPartnerId] = useState<number>(5);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [quickMessage, setQuickMessage] = useState<string>("Hello from Socket.IO!");
  const [messageInput, setMessageInput] = useState<string>("");
  const [connected, setConnected] = useState<boolean>(false);
  const [logs, setLogs] = useState<{ text: string; type?: string; ts: string }[]>([]);
  const eventLogRef = useRef<HTMLDivElement | null>(null);

  // Utilities
  function log(text: string, type: string = "info") {
    const ts = new Date().toLocaleTimeString();
    setLogs((l) => [...l, { text, type, ts }]);
    // auto-scroll
    setTimeout(() => {
      eventLogRef.current?.scrollTo({ top: eventLogRef.current.scrollHeight });
    }, 50);
  }

  function formatTime(timestamp: string) {
    try {
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);

      if (diffMins < 1) return "Just now";
      if (diffMins < 60) return `${diffMins}m ago`;
      if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
      return date.toLocaleDateString() + " " + date.toLocaleTimeString();
    } catch (e) {
      return timestamp;
    }
  }

  // Browser Notification wrapper
  function showBrowserNotification(title: string, body: string) {
    if ("Notification" in window && Notification.permission === "granted") {
      try {
        // icon can be replaced with an URL
        // eslint-disable-next-line no-new
        new Notification(title, { body, icon: undefined as any });
      } catch (e) {
        // ignore
      }
    }
  }

  // Socket setup
  useEffect(() => {
    // Ask permission for notifications once
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Auto connect on mount
    initializeConnection();

    // cleanup on unmount
    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Keep socket listeners in a single effect whenever socket changes
  useEffect(() => {
    if (!socket) return;

    function onConnect() {
      log("✅ Connected to server", "success");
      setConnected(true);

      // Join notification room
      socket?.emit("join_room", {
        user_id: currentUserId,
        room: `user_${currentUserId}`,
      });

      // Get initial data
      getNotifications();
      getMessages();
    }

    function onDisconnect() {
      log("❌ Disconnected from server", "error");
      setConnected(false);
    }

    function onConnectError(error: any) {
      const message = error?.message ?? String(error);
      log(`⚠️ Connection error: ${message}`, "error");
      setConnected(false);
    }

    function onStatus(data: any) {
      log(`📢 ${data.msg}`, "info");
    }

    function onNotifications(data: AppNotification[]) {
      log(`🔔 Received ${data.length} notifications`, "info");
      setNotifications(data);
    }

    function onNotification(data: AppNotification) {
      log(`🆕 New notification: ${data.message}`, "success");
      setNotifications((prev) => [data, ...prev]);
      showBrowserNotification("New Notification", data.message);
    }

    function onNewMessage(data: ChatMessage) {
      log(`💬 New message from User ${data.sender_id}`, "success");

      if (
        (data.sender_id === partnerId && data.receiver_id === currentUserId) ||
        (data.sender_id === currentUserId && data.receiver_id === partnerId)
      ) {
        setMessages((m) => [...m, data]);
        if (data.sender_id !== currentUserId) {
          showBrowserNotification("New Message", data.message);
        }
      }
    }

    function onMessageSent() {
      log(`✉️ Message sent successfully`, "success");
    }

    function onNotificationMarkedRead() {
      log(`✔️ Notification marked as read`, "info");
    }

    function onError(data: any) {
      log(`⚠️ Error: ${data?.message ?? JSON.stringify(data)}`, "error");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("connect_error", onConnectError);
    socket.on("status", onStatus);
    socket.on("notifications", onNotifications);
    socket.on("notification", onNotification);
    socket.on("new_message", onNewMessage);
    socket.on("message_sent", onMessageSent);
    socket.on("notification_marked_read", onNotificationMarkedRead);
    socket.on("error", onError);

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("connect_error", onConnectError);
      socket.off("status", onStatus);
      socket.off("notifications", onNotifications);
      socket.off("notification", onNotification);
      socket.off("new_message", onNewMessage);
      socket.off("message_sent", onMessageSent);
      socket.off("notification_marked_read", onNotificationMarkedRead);
      socket.off("error", onError);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, partnerId, currentUserId]);

  // Initialize / (re)connect socket
  function initializeConnection() {
    // disconnect previous if exists
    if (socket) {
      socket.disconnect();
      setSocket(null);
    }

    const s = io(baseURL, {
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    setSocket(s);
    updateChatHeader();
  }

  // REST: get notifications
  async function getNotifications() {
    try {
      const res = await fetch(`${baseURL}/get_notifications/${currentUserId}`);
      const data = await res.json();
      if (data?.success) {
        setNotifications(data.notifications ?? []);
        log(`📥 Fetched ${data.total_count ?? data.notifications?.length ?? 0} notifications via REST`, "info");
      }
    } catch (err: any) {
      log(`❌ Error fetching notifications: ${err.message ?? String(err)}`, "error");
    }
  }

  // REST: get messages between users
  async function getMessages() {
    try {
      const res = await fetch(`${baseURL}/get_messages/${currentUserId}/${partnerId}`);
      const data = await res.json();
      if (data?.success) {
        setMessages(data.messages ?? []);
        log(`📥 Fetched ${data.total_count ?? data.messages?.length ?? 0} messages via REST`, "info");
      }
    } catch (err: any) {
      log(`❌ Error fetching messages: ${err.message ?? String(err)}`, "error");
    }
  }

  // REST: send message
  async function sendMessageREST() {
    const message = quickMessage.trim();
    if (!message) return;

    try {
      const res = await fetch(`${baseURL}/send_message`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sender_id: currentUserId, receiver_id: partnerId, message, mentor_id: partnerId }),
      });
      const data = await res.json();
      if (data?.success) {
        log("✉️ Message sent via REST API", "success");
        setQuickMessage("");
        // message will be added by socket event
      } else {
        log(`❌ Failed to send message: ${data?.message ?? "unknown"}`, "error");
      }
    } catch (err: any) {
      log(`❌ Error sending message: ${err.message ?? String(err)}`, "error");
    }
  }

  // Socket: send message
  function sendMessageSocket() {
    const message = quickMessage.trim();
    if (!message || !socket) return;

    socket.emit("send_message_socket", { user_id: currentUserId, receiver_id: partnerId, message, mentor_id: partnerId });
    log("📤 Message sent via Socket.IO", "info");
    setQuickMessage("");
  }

  // Chat send from input
  function sendMessage() {
    const message = messageInput.trim();
    if (!message || !socket) return;

    socket.emit("send_message_socket", { user_id: currentUserId, receiver_id: partnerId, message, mentor_id: partnerId });
    setMessageInput("");
    log(`📤 Sent: "${message}"`, "info");
  }

  // mark single notification as read
  async function markAsRead(notificationId: number) {
    try {
      const res = await fetch(`${baseURL}/user_notification_read/${currentUserId}/${notificationId}`, { method: "PUT" });
      const data = await res.json();
      if (data?.success) {
        setNotifications((prev) => prev.map((n) => (n.id === notificationId ? { ...n, is_read: true } : n)));
        log(`✔️ Notification ${notificationId} marked as read`, "info");
      }
    } catch (err: any) {
      log(`❌ Error marking as read: ${err.message ?? String(err)}`, "error");
    }
  }

  // mark all read
  async function markAllAsRead() {
    try {
      const res = await fetch(`${baseURL}/user_notifications_mark_all_read/${currentUserId}`, { method: "PUT" });
      const data = await res.json();
      if (data?.success) {
        setNotifications((prev) => prev.map((n) => ({ ...n, is_read: true })));
        log("✔️ All notifications marked as read", "success");
      }
    } catch (err: any) {
      log(`❌ Error marking all as read: ${err.message ?? String(err)}`, "error");
    }
  }

  // UI helpers
  function unreadCount() {
    return notifications.filter((n) => !n.is_read).length;
  }

  function updateChatHeader() {
    // left for compatibility; UI derived from partnerId
  }

  function clearLog() {
    setLogs([]);
  }

  return (
    <div style={{ padding: 20, minHeight: "100vh", background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ background: "white", padding: 20, borderRadius: 12, marginBottom: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
          <h1 style={{ color: "#333", marginBottom: 10 }}>🚀 Socket.IO Chat & Notifications Test</h1>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: connected ? "#44ff44" : "#ff4444", animation: "pulse 2s infinite" }} />
            <span style={{ color: connected ? "#44ff44" : "#ff4444" }}>{connected ? "Connected" : "Disconnected"}</span>
            <span>{socket ? `(ID: ${socket.id})` : null}</span>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20 }}>
          {/* Sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ color: "#333", marginBottom: 15, fontSize: 18, borderBottom: "2px solid #667eea", paddingBottom: 10 }}>👤 User Configuration</h2>
              <div style={{ marginBottom: 15 }}>
                <label style={{ display: "block", marginBottom: 5, color: "#666", fontSize: 14, fontWeight: 500 }}>Your User ID</label>
                <input type="number" value={currentUserId} onChange={(e) => setCurrentUserId(Number(e.target.value))} style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6, fontSize: 14 }} />
              </div>
              <div style={{ marginBottom: 15 }}>
                <label style={{ display: "block", marginBottom: 5, color: "#666", fontSize: 14, fontWeight: 500 }}>Partner User ID (for chat)</label>
                <input type="number" value={partnerId} onChange={(e) => setPartnerId(Number(e.target.value))} style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6, fontSize: 14 }} />
              </div>
              <button onClick={initializeConnection} style={{ width: "100%", padding: 12, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Connect & Join Room</button>
            </div>

            <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ color: "#333", marginBottom: 15, fontSize: 18, borderBottom: "2px solid #667eea", paddingBottom: 10 }}>🔔 Notification Actions</h2>
              <button onClick={getNotifications} style={{ width: "100%", padding: 12, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Get All Notifications</button>
              <button onClick={markAllAsRead} style={{ width: "100%", padding: 12, marginTop: 10, background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", border: "none", borderRadius: 6, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Mark All as Read</button>
            </div>

            <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ color: "#333", marginBottom: 15, fontSize: 18, borderBottom: "2px solid #667eea", paddingBottom: 10 }}>💬 Quick Send Message</h2>
              <div style={{ marginBottom: 15 }}>
                <label style={{ display: "block", marginBottom: 5, color: "#666", fontSize: 14, fontWeight: 500 }}>Test Message</label>
                <input type="text" value={quickMessage} onChange={(e) => setQuickMessage(e.target.value)} style={{ width: "100%", padding: 10, border: "1px solid #ddd", borderRadius: 6, fontSize: 14 }} />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <button onClick={sendMessageREST} style={{ padding: 12 }}>Send via REST</button>
                <button onClick={sendMessageSocket} style={{ padding: 12 }}>Send via Socket</button>
              </div>
            </div>

            <div style={{ background: "white", borderRadius: 12, padding: 20, boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
              <h2 style={{ color: "#333", marginBottom: 15, fontSize: 18, borderBottom: "2px solid #667eea", paddingBottom: 10 }}>📋 Event Log</h2>
              <div ref={eventLogRef} style={{ height: 300, overflowY: "auto", background: "#1e1e1e", color: "#00ff00", padding: 15, borderRadius: 8, fontFamily: "Courier New, monospace", fontSize: 12, lineHeight: 1.6 }}>
                {logs.length === 0 ? <div style={{ color: '#999' }}>No logs yet</div> : logs.map((l, idx) => (
                  <div key={idx} style={{ marginBottom: 6, color: l.type === 'error' ? '#ff4444' : l.type === 'success' ? '#00ff00' : l.type === 'info' ? '#00bfff' : '#aaa' }}>
                    <span style={{ color: '#888', marginRight: 8 }}>[{l.ts}]</span>{l.text}
                  </div>
                ))}
              </div>
              <button onClick={clearLog} style={{ marginTop: 10 }}>Clear Log</button>
            </div>
          </div>

          {/* Main area: Notifications + Chat */}
          <div>
            <div style={{ background: 'white', borderRadius: 12, padding: 20, boxShadow: '0 4px 12px rgba(0,0,0,0.1)', marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, borderBottom: 'none' }}>🔔 Notifications <span style={{ background: '#ff4444', color: 'white', padding: '2px 8px', borderRadius: 12, fontSize: 12, fontWeight: 'bold', marginLeft: 10 }}>{unreadCount()}</span></h2>
              <div style={{ height: 400, overflowY: 'auto', marginTop: 10 }}>
                {notifications.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: 40, color: '#999' }}>No notifications yet</div>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} onClick={() => markAsRead(n.id)} style={{ padding: 12, marginBottom: 10, borderRadius: 8, borderLeft: '4px solid #667eea', background: n.is_read ? '#f8f9fa' : '#e3f2fd', cursor: 'pointer', fontWeight: n.is_read ? 'normal' : 600 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                        <span style={{ fontSize: 12, padding: '2px 8px', borderRadius: 12, background: '#667eea', color: 'white' }}>{n.message_type === 'chat' ? '💬 Chat' : '🔔 Notification'}</span>
                        <span style={{ fontSize: 11, color: '#999' }}>{formatTime(n.timestamp)}</span>
                      </div>
                      <div style={{ fontSize: 13, color: '#333', marginTop: 5 }}>{n.message} {n.is_read ? null : <strong>(Unread)</strong>}</div>
                    </div>
                  ))
                )}
              </div>
            </div>

            <div style={{ background: 'white', borderRadius: 12, padding: 0, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
              <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '15px 20px', borderRadius: '12px 12px 0 0', color: 'white', display: 'flex', gap: 10, alignItems: 'center' }}>
                <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'white', color: '#667eea', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: 18 }}>{partnerId}</div>
                <div>
                  <h3 style={{ margin: 0, fontSize: 16 }}>User {partnerId}</h3>
                  <p style={{ margin: 0, fontSize: 12, opacity: 0.9 }}>Chat with User {partnerId}</p>
                </div>
              </div>

              <div style={{ padding: 20, height: 400, overflowY: 'auto', background: '#f5f5f5' }}>
                {messages.length === 0 ? (
                  <div style={{ textAlign: 'center', color: '#999' }}>No messages yet. Send a message to start chatting!</div>
                ) : (
                  messages.map((m, idx) => (
                    <div key={idx} style={{ display: 'flex', marginBottom: 15, justifyContent: m.sender_id === currentUserId ? 'flex-end' : 'flex-start' }}>
                      <div style={{ maxWidth: '70%', padding: '10px 15px', borderRadius: 18, wordWrap: 'break-word', background: m.sender_id === currentUserId ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white', color: m.sender_id === currentUserId ? 'white' : '#333' }}>
                        <div style={{ fontSize: 14, lineHeight: 1.4, marginBottom: 5 }}>{m.message}</div>
                        <div style={{ fontSize: 11, opacity: 0.7, display: 'flex', gap: 10, alignItems: 'center' }}>
                          <span>{formatTime(m.timestamp)}</span>
                          {m.sender_id === currentUserId ? <span>✓</span> : null}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div style={{ padding: '15px 20px', background: 'white', borderRadius: '0 0 12px 12px', display: 'flex', gap: 10 }}>
                <input value={messageInput} onChange={(e) => setMessageInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && sendMessage()} placeholder="Type a message..." style={{ flex: 1, padding: 12, border: '1px solid #ddd', borderRadius: 24 }} />
                <button onClick={sendMessage} style={{ padding: '12px 30px', borderRadius: 24 }}>Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Small style for pulse animation */}
      <style>{`@keyframes pulse { 0%,100%{opacity:1}50%{opacity:0.5} }`}</style>
    </div>
  );
}
export default SocketTest;