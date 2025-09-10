import type React from "react"
import { useEffect, useRef, useState } from "react"
import "./Chat.css"
import ViewRequestPopup from "../view-request-popup/ViewRequestPopup"
import {
  createConversationAPI,
  createMessageAPI,
  getConversationAPI,
  getMessageAPI,
} from "../../apis"
import { getToken } from "../../../login/services/localStorageService"
import { io } from "socket.io-client"

interface Participant {
  id: number
  studentCode: string
  user: {
    id: number
    username: string
    email: string
    firstName: string
    lastName: string
    phone: string
    avatarUrl: string
    address: string
    role: string
    permissions: string[]
    deleted: number
    student: string
  }
}

interface Conversation {
  id: number
  type: string
  participantsHash: string
  conversationAvatar: string
  conversationName: string
  participants: Participant[]
  me: boolean
}

interface Message {
  id: number
  message: string
  sender: Participant
  conversation: Conversation
  createAt: string
  me?: boolean
}

interface ChatProps {
  id?: string
  requestId?: string
}

const Chat: React.FC<ChatProps> = ({ id, requestId }) => {
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] =
    useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [showRequestPopup, setShowRequestPopup] = useState(false)

  const token = getToken()
  const socketRef = useRef<any>(null)
  const selectedConvRef = useRef<Conversation | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  console.log("studentId", id);
  console.log("requestId", requestId);
//lướt xuống tin nhắn dưới cùng  
  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
}, [messages])

  // luôn sync ref với state
  useEffect(() => {
    selectedConvRef.current = selectedConversation
  }, [selectedConversation])

  // tạo conversation nếu có id truyền vào
  useEffect(() => {
    if (!id) return
    const createConv = async () => {
      try {
        await createConversationAPI({
          type: "DIRECT",
          participantIds: [Number(id)],
        })
        fetchConversations()
      } catch (err) {
        console.error("Create conversation error:", err)
      }
    }
    createConv()
  }, [id])

  const fetchConversations = async () => {
    try {
      const res = await getConversationAPI()
      setConversations(res.result || [])
    } catch (err) {
      console.error("Fetch conversations error:", err)
    }
  }

  useEffect(() => {
    fetchConversations()
  }, [])

  const fetchMessages = async (conversationId: number) => {
    try {
      const res = await getMessageAPI(conversationId)
      setMessages(res.result || [])
    } catch (err) {
      console.error("Fetch messages error:", err)
    }
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return
    try {
      const res = await createMessageAPI({
        conversationId: selectedConversation.id,
        message: newMessage.trim(),
      })

      const msg: Message = {
        ...res.result,
        me: true,
      }

      setMessages((prev) =>
        prev.some((m) => m.id === msg.id) ? prev : [...prev, msg]
      )
      setNewMessage("")
    } catch (err) {
      console.error("Send message error:", err)
    }
  }

  // =========================
  // Socket.IO realtime
  // =========================
  useEffect(() => {
    if (!token) return

    const socket = io("https://mymatch.social", {
      transports: ["websocket"],
      query: { token },  // ở đây là query vì truyền token theo kiểu param, ko phải truyền theo token auth
    })
    socketRef.current = socket

    const handleMessage = (raw: any) => {
    let data: Message

    try {
      // nếu socket trả string → parse, nếu đã object thì giữ nguyên
      data = typeof raw === "string" ? JSON.parse(raw) : raw
    } catch (err) {
      console.error("❌ Parse socket message error:", err, raw)
      return
    }

    console.log("📨 Received message:", data)
    console.log("👉 data.id:", data.id)

    const currentId = selectedConvRef.current?.id ?? 0
    const incomingConvId = data.conversation?.id ?? 0

    console.log("data.conversation?.id", data.conversation?.id)

    if (incomingConvId !== currentId) {
      console.log("❌ Message not for current conversation", {
        currentId,
        incomingConvId,
      })
      return
    }

    setMessages((prev) =>
      prev.some((m) => m.id === data.id) ? prev : [...prev, data]
    )
  }


    socket.on("connect", () => console.log("✅ Socket.IO connected"))
    socket.on("disconnect", () => console.log("❌ Socket.IO disconnected"))
    socket.on("connect_error", (err) =>
      console.error("Socket connection error:", err)
    )
    socket.on("message", handleMessage)

    return () => {
      socket.off("message", handleMessage)
      socket.disconnect()
    }
  }, [token])

  return (
    <div className="chat-container">
      {/* Sidebar */}
      <div className="chat-sidebar">
        <h2 className="title-message">Tin nhắn</h2>
        <div className="chat-list">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className={`chat-item ${
                selectedConversation?.id === conv.id ? "active" : ""
              }`}
              onClick={() => {
                setSelectedConversation(conv)
                fetchMessages(conv.id)
              }}
            >
              <div className="items-conversation">
                <img
                  className="conversationAvatar"
                  src={conv.conversationAvatar || "/placeholder.svg"}
                  alt={conv.conversationName}
                />
                <div className="conversationName">
                  {conv.conversationName || conv.id}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className="chat-window">
        {selectedConversation ? (
          <>
            <div className="chat-conversation-header">
              <h3>{selectedConversation.conversationName || "Cuộc trò chuyện"}</h3>
              <button onClick={() => setShowRequestPopup(true)}>
                Xem yêu cầu
              </button>
            </div>

            <div className="messages-container">
              {messages.map((m) => (
                <div key={m.id} className={`message ${m.me ? "own" : "other"}`}>
                  <div className="message-content">{m.message}</div>
                  <div className="message-time">
                    {new Date(m.createAt).toLocaleTimeString("vi-VN")}
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
              <button className="send-btn" onClick={handleSendMessage}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-corner-right-up-icon"
                >
                  <path d="m10 9 5-5 5 5" />
                  <path d="M4 20h7a4 4 0 0 0 4-4V4" />
                </svg>
              </button>
            </div>
          </>
        ) : (
          <h3 className="note">Chọn một cuộc trò chuyện để bắt đầu</h3>
        )}
      </div>

      {/* Popup */}
      {selectedConversation && (
        <ViewRequestPopup
          isOpen={showRequestPopup}
          onClose={() => setShowRequestPopup(false)}
          userInfo={{
            id: selectedConversation.id,
            name: selectedConversation.conversationName,
            email: "",
            studentId: "",
            wantedClass: "TODO",
            currentClass: "TODO",
            subject: "TODO",
            teacher: "TODO",
            schedule: "TODO",
            wantedSchedule: "TODO",
            time: new Date().toLocaleString("vi-VN"),
          }}
        />
      )}
    </div>
  )
}

export default Chat
