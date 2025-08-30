import React, { useEffect, useState } from 'react'
import './Chat.css'
import ViewRequestPopup from '../view-request-popup/ViewRequestPopup'
import { useParams } from 'react-router-dom'
import { createConversationAPI, createMessageAPI, getConversationAPI } from '../../api.ts'

interface Participant {
  id: number
  createAt: string
  updateAt: string
  deleted: number
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

interface MessageResponse {
  id: number
  conversationResponse: Conversation
  me: boolean
  message: string
  sender: {
    id: number
    studentCode: string
    user: {
      id: number
      username: string
      email: string
      avatarUrl: string
    }
  }
  createdDate: string
}

interface Message {
  id: number
  content: string
  createdDate: string
  me: boolean
}

const Chat = () => {
  const { id } = useParams<{ id: string }>()
  const [conversations, setConversations] = useState<Conversation[]>([]) // chỉ là list Conversation
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [showRequestPopup, setShowRequestPopup] = useState(false)

  console.log("iddd student", id);

  // Tạo conversation khi vào chat với 1 user cụ thể
  useEffect(() => {
    const handleCreateConversation = async () => {
      if (!id) return
      try {
        const response = await createConversationAPI({
          type: 'DIRECT',
          participantIds: [Number(id)]
        })
        console.log('Created conversation:', response.result)
        fetchConversations()
      } catch (err) {
        console.error('Error creating conversation:', err)
      }
    }
    handleCreateConversation()
  }, [id])

  // Fetch danh sách conversation
  const fetchConversations = async () => {
    try {
      const response = await getConversationAPI()
      setConversations(response.result || [])
      console.log('getConversationAPI', response.result)
    } catch (err) {
      console.error('Error fetching conversations:', err)
    }
  }

  useEffect(() => {
    fetchConversations()
  }, [])

  // Gửi tin nhắn
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return
    try {
      const response = await createMessageAPI({
        conversationId: selectedConversation.id,
        message: newMessage
      })

      const result: MessageResponse = response.result
      console.log('createMessageAPI', result)

      const newMsg: Message = {
        id: result.id,
        content: result.message,
        createdDate: result.createdDate,
        me: result.me
      }

      setMessages(prev => [...prev, newMsg])
      setNewMessage('')
    } catch (err) {
      console.error('Error sending message:', err)
    }
  }

  const handleViewRequest = () => setShowRequestPopup(true)
  const handleClosePopup = () => setShowRequestPopup(false)

  const filteredConversations = conversations.filter(conv =>
    conv.conversationName?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className='chat-container'>
      {/* Sidebar */}
      <div className='chat-sidebar'>
        <div className='chat-sidebar-header'>
          <h2>Tin nhắn</h2>
        </div>

        <div className='search-box'>
          <input
            type='text'
            placeholder='Tìm kiếm tin nhắn...'
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='chat-list'>
          {filteredConversations.map(conv => (
            <div
              key={conv.id}
              className={`chat-item ${selectedConversation?.id === conv.id ? 'active' : ''}`}
              onClick={() => {
                setSelectedConversation(conv)
                setMessages([]) // TODO: call API get messages theo conv.id
              }}
            >
              <div className='chat-avatar'>
                <img
                  src={conv.conversationAvatar || '/api/placeholder/40/40'}
                  alt={conv.conversationName}
                />
              </div>
               <div>{conv.id}</div>
              <div className='chat-info'>
              <div className='chat-name'>
                {conv.conversationName || conv.id}
              </div>
              <div className='chat-message'>Tin nhắn gần nhất...</div>
            </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat window */}
      <div className='chat-window'>
        {selectedConversation ? (
          <>
            <div className='chat-conversation-header'>
              <div className='user-info'>
                <img
                  src={selectedConversation.conversationAvatar || '/api/placeholder/40/40'}
                  alt={selectedConversation.conversationName}
                />
                <div>
                  <h3>{selectedConversation.conversationName}</h3>
                </div>
              </div>
              <button className='view-request-btn' onClick={handleViewRequest}>
                Xem yêu cầu
              </button>
            </div>

            <div className='messages-container'>
              {messages.map(message => (
                <div
                  key={message.id}
                  className={`message ${message.me ? 'own' : 'other'}`}
                >
                  <div className='message-content'>{message.content}</div>
                  <div className='message-time'>
                    {new Date(message.createdDate).toLocaleTimeString('vi-VN')}
                  </div>
                </div>
              ))}
            </div>

            <div className='message-input'>
              <input
                type='text'
                placeholder='Nhập tin nhắn...'
                value={newMessage}
                onChange={e => setNewMessage(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendMessage()}
              />
              <button className='send-btn' onClick={handleSendMessage}>
                Gửi
              </button>
            </div>
          </>
        ) : (
          <div className='no-chat-selected'>
            <h3>Chọn một cuộc trò chuyện để bắt đầu</h3>
          </div>
        )}
      </div>

      {/* Popup xem yêu cầu */}
      {selectedConversation && (
        <ViewRequestPopup
          isOpen={showRequestPopup}
          onClose={handleClosePopup}
          userInfo={{
            id: selectedConversation.id,
            name: selectedConversation.conversationName,
            email: '', // cần lấy từ API message hoặc participant
            studentId: '',
            wantedClass: 'TODO',
            currentClass: 'TODO',
            subject: 'TODO',
            teacher: 'TODO',
            schedule: 'TODO',
            wantedSchedule: 'TODO',
            time: new Date().toLocaleString('vi-VN')
          }}
        />
      )}
    </div>
  )
}

export default Chat
