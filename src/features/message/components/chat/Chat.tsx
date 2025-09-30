import type React from "react"
import { useEffect, useRef, useState } from "react"
import "./Chat.css"
import {
  createConversationAPI,
  createMessageAPI,
  getConversationAPI,
  getMessageAPI,
} from "../../apis"
import { getToken } from "../../../login/services/localStorageService"
import { io } from "socket.io-client"
import { useUnreadMessages } from "../UnreadMessagesContext"
import EmojiPicker, { EmojiClickData } from "emoji-picker-react"

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
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const token = getToken()
  const socketRef = useRef<any>(null)
  const selectedConvRef = useRef<Conversation | null>(null)
  const messagesEndRef = useRef<HTMLDivElement | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const { unreadConversations, markConversationAsRead } = useUnreadMessages() // chấm đỏ ở message
  const [showEmojiPicker, setShowEmojiPicker] = useState(false)

  // thanh search tên user
  const filteredConversations = conversations.filter((conv) =>
  conv.conversationName?.toLowerCase().includes(searchTerm.toLowerCase())
)

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
      markConversationAsRead(selectedConversation.id)
      setNewMessage("")
    } catch (err) {
      console.error("Send message error:", err)
    }
  }

  // khi click vào conversation
const handleSelectConversation = (conv: Conversation) => {
  setSelectedConversation(conv)
  fetchMessages(conv.id)
  markConversationAsRead(conv.id) // ✅ xóa unread
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

    const currentId = selectedConvRef.current?.id ?? 0
    const incomingConvId = data.conversation?.id ?? 0

    // if (incomingConvId !== currentId) {
    //   console.log("❌ Message not for current conversation", {
    //     currentId,
    //     incomingConvId,
    //   })
    //   return
    // }

    setMessages((prev) =>
      prev.some((m) => m.id === data.id) ? prev : [...prev, data]
    )
  }


    // socket.on("connect", () => console.log("✅ Socket.IO connected"))
    // socket.on("disconnect", () => console.log("❌ Socket.IO disconnected"))
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

        {/* Search box */}
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
              className={`chat-item ${
                selectedConversation?.id === conv.id ? "active" : ""
              }`}
              onClick={() => {
                setSelectedConversation(conv)
                fetchMessages(conv.id)
                markConversationAsRead(conv.id)
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

                  {/* ✅ hiển thị chấm đỏ nếu unread */}
                  {unreadConversations.has(conv.id) && (
                    <span className="conversation-unread-badge"></span>
                  )}
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

              {/* nút emoji */}
              <button
                type="button"
                className="emoji-btn"
                onClick={() => setShowEmojiPicker((prev) => !prev)}
              >
                😊
              </button>

              {/* emoji picker popup */}
              {showEmojiPicker && (
                <div className="emoji-picker-container">
                  <EmojiPicker
                    onEmojiClick={(emojiData: EmojiClickData) => {
                      setNewMessage((prev) => prev + emojiData.emoji)
                      setShowEmojiPicker(false) // đóng sau khi chọn
                    }}
                    width={300}
                    height={400}
                  />
                </div>
              )}

              <button className="send-btn" onClick={handleSendMessage}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" width={20} height={20}><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
              </button>
            </div>
          </>
        ) : (
          <div className="note">
            <h3 >Chọn một cuộc trò chuyện để bắt đầu</h3>
          </div>
        )}
      </div>
    </div>
  )
}

export default Chat
