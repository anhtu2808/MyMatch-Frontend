import React, { createContext, useContext, useState, useEffect } from "react"
import { getToken } from "../../login/services/localStorageService"
import { io, Socket } from "socket.io-client"
import { useAppSelector } from "../../../store/hooks"

interface UnreadMessagesContextType {
  hasUnread: boolean
  unreadConversations: Set<number>
  markConversationAsRead: (conversationId: number) => void
  markAllAsRead: () => void
}

const UnreadMessagesContext = createContext<UnreadMessagesContextType | undefined>(undefined)

export const useUnreadMessages = () => {
  const context = useContext(UnreadMessagesContext)
  if (!context) {
    throw new Error("useUnreadMessages must be used within UnreadMessagesProvider")
  }
  return context
}

const STORAGE_KEY = "unread_conversations"

export const UnreadMessagesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unreadConversations, setUnreadConversations] = useState<Set<number>>(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? new Set(JSON.parse(stored)) : new Set()
  })

  const hasUnread = unreadConversations.size > 0
  const token = getToken()
  const currentUser = useAppSelector((state) => state.user)

  // Lưu vào localStorage mỗi khi thay đổi
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(unreadConversations)))
  }, [unreadConversations])

  // Socket listener
  useEffect(() => {
    if (!token) return

    const socket: Socket = io("https://mymatch.social", {
      transports: ["websocket"],
      query: { token },
    })

    socket.on("message", (data: any) => {
      const messageData = typeof data === "string" ? JSON.parse(data) : data
      const conversationId = messageData.conversation?.id
      const senderId = messageData.sender?.id

      if (!conversationId) return

      // Bỏ qua nếu tin nhắn là do mình gửi
      if (senderId === currentUser?.id) return

      // Nếu user đang KHÔNG mở conversation này → thêm vào unread
      const currentPath = window.location.pathname
      const isOnMessagePage = currentPath.startsWith("/message")
      const isViewingThisConversation =
        isOnMessagePage && currentPath.includes(`/message/${conversationId}`)

      if (!isViewingThisConversation) {
        setUnreadConversations((prev) => {
          const next = new Set(prev)
          next.add(conversationId)
          return next
        })
        console.log("📬 New unread message in conversation:", conversationId)
      }
    })

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err)
    })

    return () => {
      socket.disconnect()
    }
  }, [token, currentUser])

  const markConversationAsRead = (conversationId: number) => {
    setUnreadConversations((prev) => {
      const newSet = new Set(prev)
      newSet.delete(conversationId)
      return newSet
    })
  }

  const markAllAsRead = () => {
    setUnreadConversations(new Set())
  }

  return (
    <UnreadMessagesContext.Provider
      value={{
        hasUnread,
        unreadConversations,
        markConversationAsRead,
        markAllAsRead,
      }}
    >
      {children}
    </UnreadMessagesContext.Provider>
  )
}
