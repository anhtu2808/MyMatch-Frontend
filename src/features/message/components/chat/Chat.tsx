import type React from "react";
import { useEffect, useRef, useState, useCallback } from "react";
import "./Chat.css";
import {
  createConversationAPI,
  createMessageAPI,
  getConversationAPI,
  getMessageAPI,
} from "../../apis";
import { getToken } from "../../../login/services/localStorageService";
import { io, Socket } from "socket.io-client";
import { useUnreadMessages } from "../UnreadMessagesContext";
import EmojiPicker, { EmojiClickData } from "emoji-picker-react";
import Notification from "../../../../components/notification/Notification";

// --- Interfaces ---
interface Participant {
  id: number;
  studentCode: string;
  user: {
    id: number;
    username: string;
    email: string;
    firstName: string;
    lastName: string;
    phone: string;
    avatarUrl: string;
    address: string;
    role: string;
    permissions: string[];
    deleted: number;
    student: string;
  };
}

interface Conversation {
  id: number;
  type: string;
  participantsHash: string;
  conversationAvatar: string;
  conversationName: string;
  participants: Participant[];
  me: boolean;
}

interface Message {
  id: number;
  message: string;
  sender: Participant;
  conversation: Conversation;
  createAt: string;
  me?: boolean;
}

interface ChatProps {
  id?: string;
}

// --- Component ---
const Chat: React.FC<ChatProps> = ({ id }) => {
  // --- State Management ---
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  
  // State cho UI
  const [isLoading, setIsLoading] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  // --- Contexts & Refs ---
  const { unreadConversations, markConversationAsRead } = useUnreadMessages();
  const token = getToken();
  const socketRef = useRef<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [noti, setNoti] = useState<{ message: string; type: any } | null>(null);
  
  const showNotification = (msg: string, type: any) => {
    setNoti({ message: msg, type });
  };

  // --- Logic Helpers & Callbacks ---

  // Kiểm tra kích thước màn hình
  useEffect(() => {
    const checkMobileView = () => {
      setIsMobileView(window.innerWidth <= 768);
    };
    
    checkMobileView();
    window.addEventListener('resize', checkMobileView);
    
    return () => window.removeEventListener('resize', checkMobileView);
  }, []);

  // Lấy tin nhắn cho một conversation
  const fetchMessages = useCallback(async (conversationId: number) => {
    try {
      const res = await getMessageAPI(conversationId);
      setMessages(res.result || []);
    } catch (err: any) {
      console.error("Fetch messages error:", err);
      showNotification(err?.response?.data?.message || "Không thể tải tin nhắn.", "error")
    }
  }, []);

  // Hàm xử lý khi chọn một conversation
  const handleSelectConversation = useCallback((conv: Conversation) => {
    setSelectedConversation(conv);
    fetchMessages(conv.id);
    markConversationAsRead(conv.id);
  }, [fetchMessages, markConversationAsRead]);

  // Gửi tin nhắn
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const res = await createMessageAPI({
        conversationId: selectedConversation.id,
        message: newMessage.trim(),
      });

      const msg: Message = { ...res.result, me: true };
      
      setMessages((prev) => [...prev, msg]);
      setNewMessage("");
      setShowEmojiPicker(false);
    } catch (err) {
      console.error("Send message error:", err);
    }
  };
  
  // Quay lại sidebar trên mobile
  const handleBackToSidebar = () => {
    setSelectedConversation(null);
  };

  // --- Effects ---
  useEffect(() => {
    const initializeChat = async () => {
      setIsLoading(true);
      try {
        const listResponse = await getConversationAPI();
        let allConversations = listResponse.result || [];

        if (id) {
          const createResponse = await createConversationAPI({
            type: "DIRECT",
            participantIds: [Number(id)],
          });
          const targetConv = createResponse?.result;

          if (targetConv) {
            handleSelectConversation(targetConv);

            const isTargetInList = allConversations.some(
              (c: Conversation) => c.id === targetConv.id
            );
            if (!isTargetInList) {
              allConversations = [targetConv, ...allConversations];
            }
          }
        }
        
        setConversations(allConversations);

      } catch (err: any) {
        console.error("Lỗi khi khởi tạo cuộc trò chuyện:", err);
        showNotification(err?.response?.data?.message || "Không thể tải danh sách cuộc trò chuyện.", "error")
      } finally {
        setIsLoading(false);
      }
    };

    initializeChat();
  }, [id]);

  // Effect cho Socket.IO
  useEffect(() => {
    if (!token) return;

    const socket = io("https://mymatch.social", {
      transports: ["websocket"],
      query: { token },
    });
    socketRef.current = socket;

    const handleMessage = (data: Message) => {
      if (data.conversation?.id === selectedConversation?.id) {
        setMessages((prev) => 
          prev.some((m) => m.id === data.id) ? prev : [...prev, data]
        );
      }
    };

    socket.on("message", handleMessage);
    socket.on("connect_error", (err) => console.error("Socket connection error:", err));

    return () => {
      socket.off("message", handleMessage);
      socket.disconnect();
    };
  }, [token, selectedConversation]);

  // Effect tự cuộn xuống tin nhắn cuối
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // --- Rendering Logic ---
  const filteredConversations = conversations.filter((conv) =>
    conv.conversationName?.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  if (isLoading) {
    return <div className="chat-container-status">Đang tải dữ liệu...</div>;
  }

  return (
    <>
    <div className="chat-container">
      {/* Sidebar - Ẩn trên mobile khi có conversation được chọn */}
      <div className={`chat-sidebar ${isMobileView && selectedConversation ? "hide-on-mobile" : ""}`}>
        <h2 className="title-message">Tin nhắn</h2>
        <div className="search-box-message">
          <input
            type="text"
            placeholder="Tìm kiếm tên..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="chat-list">
          {filteredConversations.map((conv) => (
            <div
              key={conv.id}
              className={`chat-item ${selectedConversation?.id === conv.id ? "active" : ""}`}
              onClick={() => handleSelectConversation(conv)}
            >
              <div className="items-conversation">
                <img
                  className="conversationAvatar"
                  src={conv.conversationAvatar || "/placeholder.svg"}
                  alt={conv.conversationName}
                />
                <div className="conversationName">
                  {conv.conversationName || `ID: ${conv.id}`}
                  {unreadConversations.has(conv.id) && <span className="conversation-unread-badge"></span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat window - Hiện trên mobile khi có conversation được chọn */}
      <div className={`chat-window ${isMobileView && selectedConversation ? "show-on-mobile" : ""}`}>
        {selectedConversation ? (
          <>
            <div className="chat-conversation-header">
              {isMobileView && (
                <button className="mobile-back-btn" onClick={handleBackToSidebar}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
                </button>
              )}
              <img
                className="conversationAvatar"
                src={selectedConversation.conversationAvatar || "/placeholder.svg"}
                alt={selectedConversation.conversationName}
              />
              <h3>{selectedConversation.conversationName || "Cuộc trò chuyện"}</h3>
            </div>

            <div className="messages-container">
              {messages.map((m) => (
                <div key={m.id} className={`message ${m.me ? "own" : "other"}`}>
                  <div className="message-content">{m.message}</div>
                  <div className="message-time">
                    {new Date(m.createAt).toLocaleTimeString("vi-VN", { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <div className="message-input">
              <input
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Nhập tin nhắn..."
              />
              <button 
                type="button" 
                className="emoji-btn" 
                onClick={() => setShowEmojiPicker((prev) => !prev)}
                aria-label="Chọn emoji"
              >
                😊
              </button>
              {showEmojiPicker && (
                <div className="emoji-picker-container">
                  <EmojiPicker
                    onEmojiClick={(emojiData: EmojiClickData) => {
                      setNewMessage((prev) => prev + emojiData.emoji);
                      setShowEmojiPicker(false);
                    }}
                    width={300}
                    height={400}
                  />
                </div>
              )}
              <button className="send-btn" onClick={handleSendMessage} aria-label="Gửi tin nhắn">
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24" 
                  width={20} 
                  height={20}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth="2" 
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <div className="note">
            <h3>Chọn một cuộc trò chuyện để bắt đầu</h3>
          </div>
        )}
      </div>
    </div>
    {noti && (
        <Notification
          message={noti.message}
          type={noti.type}
          onClose={() => setNoti(null)}
        />
      )}
    </>
  );
};

export default Chat;