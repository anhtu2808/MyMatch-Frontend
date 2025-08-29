import React, { useState } from 'react'
import './Chat.css'
import ViewRequestPopup from '../view-request-popup/ViewRequestPopup'

interface ChatUser {
  id: string
  name: string
  status: string
  avatar: string
  lastMessage: string
  time: string
  unread?: number
  studentId: string
  wantedClass: string
}

interface Message {
  id: string
  senderId: string
  content: string
  time: string
  isOwn: boolean
}

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null)
  const [activeTab, setActiveTab] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [showRequestPopup, setShowRequestPopup] = useState(false)

  const chatUsers: ChatUser[] = [
    {
      id: '1',
      name: 'Nguyễn Văn A',
      status: 'Đang hoạt động',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'Có thể đổi lớp không bạn?',
      time: '2 phút',
      unread: 2,
      studentId: 'SE5678',
      wantedClass: 'SE1234'
    },
    {
      id: '2',
      name: 'Trần Thị B',
      status: 'Vừa mới online',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'Cảm ơn bạn nhé!',
      time: '10 phút',
      studentId: 'MAR1234',
      wantedClass: 'MAR2345'
    },
    {
      id: '3',
      name: 'Lê Văn C',
      status: 'Đang hoạt động',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'Gặp thứ 2 được không?',
      time: '1 giờ',
      unread: 1,
      studentId: 'BUS7345',
      wantedClass: 'BUS3456'
    },
    {
      id: '4',
      name: 'Phạm Thị D',
      status: 'Hoạt động 30 phút trước',
      avatar: '/api/placeholder/40/40',
      lastMessage: 'OK, mình đồng ý!',
      time: '3 giờ',
      studentId: 'IT3456',
      wantedClass: 'IT4567'
    }
  ]

  const messages: Message[] = [
    {
      id: '1',
      senderId: '1',
      content: 'Chào bạn! Mình muốn đổi lớp SE1234 - Nhóm 2',
      time: '14:30',
      isOwn: false
    },
    {
      id: '2',
      senderId: 'me',
      content: 'Chào bạn! Đúng rồi, mình cần đổi sang nhóm 1. Bạn có đồng ý không?',
      time: '14:32',
      isOwn: true
    },
    {
      id: '3',
      senderId: '1',
      content: 'Lịch học nhóm 1 như thế nào?',
      time: '14:35',
      isOwn: false
    },
    {
      id: '4',
      senderId: 'me',
      content: 'Nhóm 1 học thứ 2, 4, 6 từ 7h-9h30. Còn nhóm 2 của bạn?',
      time: '14:37',
      isOwn: true
    },
    {
      id: '5',
      senderId: '1',
      content: 'Nhóm 2 học thứ 3, 5, 7 từ 12h30-15h. Mình OK!',
      time: '14:40',
      isOwn: false
    },
    {
      id: '6',
      senderId: 'me',
      content: 'Tuyệt! Vậy mình gặp nhau để làm thủ tục nhé 👍',
      time: '14:42',
      isOwn: true
    }
  ]

  const filteredUsers = chatUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Logic to send message
      setNewMessage('')
    }
  }

  const handleViewRequest = () => {
    setShowRequestPopup(true)
  }

  const handleClosePopup = () => {
    setShowRequestPopup(false)
  }

  return (
    <div className='chat-container'>
      {/* Left Sidebar - Chat List */}
      <div className='chat-sidebar'>
        <div className='chat-sidebar-header'>
          <h2>Tin nhắn</h2>
        </div>

        <div className='chat-tabs'>
          <button 
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Tất cả
          </button>
          {/* <button 
            className={`tab-btn ${activeTab === 'swap' ? 'active' : ''}`}
            onClick={() => setActiveTab('swap')}
          >
            Đổi lớp
          </button>
          <button 
            className={`tab-btn ${activeTab === 'group' ? 'active' : ''}`}
            onClick={() => setActiveTab('group')}
          >
            Chép nhóm
          </button> */}
        </div>

        <div className='search-box'>
          <input 
            type="text"
            placeholder="Tìm kiếm tin nhắn..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className='chat-list'>
          {filteredUsers.map(user => (
            <div 
              key={user.id}
              className={`chat-item ${selectedUser?.id === user.id ? 'active' : ''}`}
              onClick={() => setSelectedUser(user)}
            >
              <div className='chat-avatar'>
                <img src={user.avatar} alt={user.name} />
                {user.unread && <span className='unread-badge'>{user.unread}</span>}
              </div>
              <div className='chat-info'>
                <div className='chat-name'>{user.name}</div>
                <div className='chat-message'>{user.lastMessage}</div>
              </div>
              <div className='chat-time'>{user.time}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Chat Window */}
      <div className='chat-window'>
        {selectedUser ? (
          <>
            <div className='chat-conversation-header'>
              <div className='user-info'>
                <img src={selectedUser.avatar} alt={selectedUser.name} />
                <div>
                  <h3>{selectedUser.name}</h3>
                  <span className='status'>{selectedUser.status}</span>
                </div>
              </div>
              <button className='view-request-btn' onClick={handleViewRequest}>Xem yêu cầu</button>
            </div>

            <div className='messages-container'>
              {messages.map(message => (
                <div 
                  key={message.id}
                  className={`message ${message.isOwn ? 'own' : 'other'}`}
                >
                  <div className='message-content'>
                    {message.content}
                  </div>
                  <div className='message-time'>{message.time}</div>
                </div>
              ))}
            </div>

            <div className='message-input'>
              <button className='attach-btn'>📎</button>
              <input 
                type="text"
                placeholder="Nhập tin nhắn..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              />
              <button className='emoji-btn'>😊</button>
              <button className='send-btn' onClick={handleSendMessage}>
                <span>▲</span>
              </button>
            </div>
          </>
        ) : (
          <div className='no-chat-selected'>
            <h3>Chọn một cuộc trò chuyện để bắt đầu</h3>
          </div>
        )}
      </div>

      {/* View Request Popup */}
      {selectedUser && (
        <ViewRequestPopup
          isOpen={showRequestPopup}
          onClose={handleClosePopup}
          userInfo={{
            id: selectedUser.id,
            name: selectedUser.name,
            email: `${selectedUser.name.toLowerCase().replace(/\s+/g, '')}@fpt.edu.vn`,
            studentId: selectedUser.studentId,
            wantedClass: selectedUser.wantedClass,
            currentClass: selectedUser.studentId.includes('SE') ? 'SE1234-02' :
                         selectedUser.studentId.includes('MAR') ? 'MAR1234-01' :
                         selectedUser.studentId.includes('BUS') ? 'BUS7345-03' : 'IT3456-01',
            subject: selectedUser.studentId.includes('SE') ? 'SE1234 - Software Engineering' :
                    selectedUser.studentId.includes('MAR') ? 'MAR1234 - Marketing Management' :
                    selectedUser.studentId.includes('BUS') ? 'BUS7345 - Business Strategy' : 'IT3456 - Information Technology',
            teacher: selectedUser.studentId.includes('SE') ? 'Nguyễn Văn Hùng - HungNV24' :
                    selectedUser.studentId.includes('MAR') ? 'Trần Thị Lan - LanTT23' :
                    selectedUser.studentId.includes('BUS') ? 'Lê Minh Tuấn - TuanLM25' : 'Phạm Văn Nam - NamPV22',
            schedule: selectedUser.studentId.includes('SE') ? 'Thứ 2 - Slot 1 (7:00 - 9:30)' :
                     selectedUser.studentId.includes('MAR') ? 'Thứ 3 - Slot 2 (9:30 - 12:00)' :
                     selectedUser.studentId.includes('BUS') ? 'Thứ 4 - Slot 3 (12:30 - 15:00)' : 'Thứ 5 - Slot 4 (15:15 - 17:45)',
            wantedSchedule: selectedUser.studentId.includes('SE') ? 'Thứ 6 - Slot 3 (12:30 - 15:00)' :
                           selectedUser.studentId.includes('MAR') ? 'Thứ 7 - Slot 1 (7:00 - 9:30)' :
                           selectedUser.studentId.includes('BUS') ? 'Thứ 2 - Slot 2 (9:30 - 12:00)' : 'Thứ 3 - Slot 4 (15:15 - 17:45)',
            time: selectedUser.time
          }}
        />
      )}
    </div>
  )
}

export default Chat
