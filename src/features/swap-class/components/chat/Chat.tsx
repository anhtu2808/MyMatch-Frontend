// import React, { useState } from 'react'
// import './Chat.css'

// interface ChatUser {
//   id: string
//   name: string
//   status: string
//   avatar: string
//   lastMessage: string
//   time: string
//   unread?: number
//   studentId: string
//   wantedClass: string
// }

// interface Message {
//   id: string
//   senderId: string
//   content: string
//   time: string
//   isOwn: boolean
// }

// const Chat = () => {
//   const [selectedUser, setSelectedUser] = useState<ChatUser | null>(null)
//   const [activeTab, setActiveTab] = useState('all')
//   const [searchTerm, setSearchTerm] = useState('')
//   const [newMessage, setNewMessage] = useState('')

//   const chatUsers: ChatUser[] = [
//     {
//       id: '1',
//       name: 'Nguyễn Văn A',
//       status: 'Đang hoạt động',
//       avatar: '/api/placeholder/40/40',
//       lastMessage: 'Mình muốn đổi lớp với bạn',
//       time: '2 phút',
//       unread: 2,
//       studentId: 'SE5678',
//       wantedClass: 'SE1234'
//     },
//     {
//       id: '2', 
//       name: 'Trần Thị B',
//       status: 'Cảm ơn bạn đã quan tâm!',
//       avatar: '/api/placeholder/40/40',
//       lastMessage: 'Cảm ơn bạn đã quan tâm!',
//       time: '10 phút',
//       studentId: 'MAR1234',
//       wantedClass: 'MAR2345'
//     },
//     {
//       id: '3',
//       name: 'Lê Văn C', 
//       status: 'Bạn có thể gặp vào thứ 2 không?',
//       avatar: '/api/placeholder/40/40',
//       lastMessage: 'Bạn có thể gặp vào thứ 2 không?',
//       time: '1 giờ',
//       unread: 1,
//       studentId: 'BUS7345',
//       wantedClass: 'BUS3456'
//     },
//     {
//       id: '4',
//       name: 'Phạm Thị D',
//       status: 'Mình đồng ý đổi lớp',
//       avatar: '/api/placeholder/40/40', 
//       lastMessage: 'Mình đồng ý đổi lớp',
//       time: '3 giờ',
//       studentId: 'IT3456',
//       wantedClass: 'IT4567'
//     }
//   ]

//   const messages: Message[] = [
//     {
//       id: '1',
//       senderId: '1',
//       content: 'Chào bạn! Mình thấy bạn đang muốn đổi lớp SE1234 - Nhóm 2',
//       time: '14:30',
//       isOwn: false
//     },
//     {
//       id: '2', 
//       senderId: 'me',
//       content: 'Chào bạn! Đúng rồi, mình đang cần đổi sang nhóm 1. Bạn có sẵn sàng đổi không?',
//       time: '14:32',
//       isOwn: true
//     },
//     {
//       id: '3',
//       senderId: '1', 
//       content: 'Mình muốn đổi lớp với bạn. Lịch học của nhóm 1 như thế nào?',
//       time: '14:35',
//       isOwn: false
//     },
//     {
//       id: '4',
//       senderId: 'me',
//       content: 'Nhóm 1 học thứ 2, 4, 6 từ 7h-9h30. Còn nhóm 2 của bạn học khi nào?',
//       time: '14:37', 
//       isOwn: true
//     }
//   ]

//   const filteredUsers = chatUsers.filter(user => 
//     user.name.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   const handleSendMessage = () => {
//     if (newMessage.trim()) {
//       // Logic to send message
//       setNewMessage('')
//     }
//   }

//   return (
//     <div className='chat-container'>
//       {/* Left Sidebar - Chat List */}
//       <div className='chat-sidebar'>
//         <div className='chat-header'>
//           <h2>Tin nhắn</h2>
//           <div className='chat-actions'>
//             <button className='action-btn'>📞</button>
//             <button className='action-btn'>📹</button>
//           </div>
//         </div>

//         <div className='chat-tabs'>
//           <button 
//             className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
//             onClick={() => setActiveTab('all')}
//           >
//             Tất cả
//           </button>
//           <button 
//             className={`tab-btn ${activeTab === 'swap' ? 'active' : ''}`}
//             onClick={() => setActiveTab('swap')}
//           >
//             Đổi lớp
//           </button>
//           <button 
//             className={`tab-btn ${activeTab === 'group' ? 'active' : ''}`}
//             onClick={() => setActiveTab('group')}
//           >
//             Chép nhóm
//           </button>
//         </div>

//         <div className='search-box'>
//           <input 
//             type="text"
//             placeholder="Tìm kiếm tin nhắn..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>

//         <div className='chat-list'>
//           {filteredUsers.map(user => (
//             <div 
//               key={user.id}
//               className={`chat-item ${selectedUser?.id === user.id ? 'active' : ''}`}
//               onClick={() => setSelectedUser(user)}
//             >
//               <div className='chat-avatar'>
//                 <img src={user.avatar} alt={user.name} />
//                 {user.unread && <span className='unread-badge'>{user.unread}</span>}
//               </div>
//               <div className='chat-info'>
//                 <div className='chat-name'>{user.name}</div>
//                 <div className='chat-message'>{user.lastMessage}</div>
//                 <div className='chat-details'>
//                   <span className='student-id'>Họ có: {user.studentId}</span>
//                   <span className='wanted-class'>Họ muốn: {user.wantedClass}</span>
//                 </div>
//               </div>
//               <div className='chat-time'>{user.time}</div>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Right Side - Chat Window */}
//       <div className='chat-window'>
//         {selectedUser ? (
//           <>
//             <div className='chat-window-header'>
//               <div className='user-info'>
//                 <img src={selectedUser.avatar} alt={selectedUser.name} />
//                 <div>
//                   <h3>{selectedUser.name}</h3>
//                   <span className='status'>{selectedUser.status}</span>
//                 </div>
//               </div>
//               <div className='swap-info'>
//                 <span className='swap-detail'>Họ có: {selectedUser.studentId}</span>
//                 <span className='swap-arrow'>⇄</span>
//                 <span className='swap-detail'>Họ muốn: {selectedUser.wantedClass}</span>
//               </div>
//             </div>

//             <div className='messages-container'>
//               {messages.map(message => (
//                 <div 
//                   key={message.id}
//                   className={`message ${message.isOwn ? 'own' : 'other'}`}
//                 >
//                   <div className='message-content'>
//                     {message.content}
//                   </div>
//                   <div className='message-time'>{message.time}</div>
//                 </div>
//               ))}
//             </div>

//             <div className='message-input'>
//               <button className='attach-btn'>📎</button>
//               <input 
//                 type="text"
//                 placeholder="Nhập tin nhắn..."
//                 value={newMessage}
//                 onChange={(e) => setNewMessage(e.target.value)}
//                 onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
//               />
//               <button className='emoji-btn'>😊</button>
//               <button className='send-btn' onClick={handleSendMessage}>
//                 <span>▲</span>
//               </button>
//             </div>
//           </>
//         ) : (
//           <div className='no-chat-selected'>
//             <h3>Chọn một cuộc trò chuyện để bắt đầu</h3>
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Chat

import React from 'react'

function Chat() {
  return (
    <div>Chat</div>
  )
}

export default Chat