import React, { useEffect, useState } from 'react'
import './RequestToMe.css'
import { getSwapMatchingAPI } from '../../apis'
import Filter from '../filter/Filter'

interface User {
  id: number
  username: string
  email: string
  avatarUrl?: string
}

interface Lecturer {
  id: number
  name: string
  code: string
  campus: {
    id: number
    name: string
    university: {
      id: number
      name: string
    }
  }
}

interface Course {
  id: number
  code: string
  name: string
}

interface Student {
  id: number
  studentCode: string
  user: User
}

interface SwapRequest {
  id: number
  student: Student
  status: string
  course: Course
  reason: string
  lecturerFrom: Lecturer
  lecturerTo: Lecturer
  createAt: string
  updateAt: string
  fromClass: string
  targetClass: string
  fromDays: string[]
  toDays: string[]
  slotFrom: string
  slotTo: string
}

export interface RequestToMe {
  id: number
  requestFrom: SwapRequest
  requestTo: SwapRequest
  status: string
  reason: string
  createAt: string
  updateAt: string
  fromDecision: string
  toDecision: string
}


function RequestToMe() {
  const [requests, setRequests] = useState<RequestToMe[]>([])
  const [filteredFeeds, setFilteredFeeds] = useState<RequestToMe[]>([])
  useEffect(() => {
    const fetchRequestsMatching = async () => {
      try {
        const response = await getSwapMatchingAPI({
        page: 0,
        size: 10,
        status: "PENDING",
      })
        setRequests(response?.result?.data || [])
        setFilteredFeeds(response?.result?.data || [])
        console.log("matchinggggggggggggggg", response?.result?.data);
      } catch (error) {
        console.error('Error fetching requests:', error)
      }
    }
    fetchRequestsMatching()
  }, [])

  const handleFilter = (filters: {
  courseCode: string
  className: string
  lecturer: string
  slot: string
  day: string
}) => {
  let filtered = requests

  if (filters.courseCode) {
    filtered = filtered.filter(r => 
      r.requestFrom.course.code.toLowerCase().includes(filters.courseCode.toLowerCase()) ||
      r.requestTo.course.code.toLowerCase().includes(filters.courseCode.toLowerCase())
    )
  }

  if (filters.className) {
    filtered = filtered.filter(r =>
      r.requestFrom.fromClass.toLowerCase().includes(filters.className.toLowerCase()) ||
      r.requestFrom.targetClass.toLowerCase().includes(filters.className.toLowerCase()) ||
      r.requestTo.fromClass.toLowerCase().includes(filters.className.toLowerCase()) ||
      r.requestTo.targetClass.toLowerCase().includes(filters.className.toLowerCase())
    )
  }

  if (filters.lecturer) {
    filtered = filtered.filter(r =>
      r.requestFrom.lecturerFrom.name.toLowerCase().includes(filters.lecturer.toLowerCase()) ||
      r.requestFrom.lecturerTo.name.toLowerCase().includes(filters.lecturer.toLowerCase()) ||
      r.requestTo.lecturerFrom.name.toLowerCase().includes(filters.lecturer.toLowerCase()) ||
      r.requestTo.lecturerTo.name.toLowerCase().includes(filters.lecturer.toLowerCase())
    )
  }

  if (filters.slot) {
    filtered = filtered.filter(r =>
      r.requestFrom.slotFrom === filters.slot ||
      r.requestFrom.slotTo === filters.slot ||
      r.requestTo.slotFrom === filters.slot ||
      r.requestTo.slotTo === filters.slot
    )
  }

  if (filters.day) {
    filtered = filtered.filter(r =>
      r.requestFrom.fromDays.includes(filters.day) ||
      r.requestFrom.toDays.includes(filters.day) ||
      r.requestTo.fromDays.includes(filters.day) ||
      r.requestTo.toDays.includes(filters.day)
    )
  }

  setFilteredFeeds(filtered)
}


  const handleReset = () => {
    setFilteredFeeds(requests)
  }


  return (
    <div className='my-request-container'>
      <Filter onFilter={handleFilter} onReset={handleReset} />
      <div className='section-header'>
        <h2>Yêu cầu gửi tới tôi</h2>
        <span className='view-all'>Hiển thị {requests.length} yêu cầu</span>
      </div>

            {filteredFeeds.map((request) => (
        <div key={request.id} className='request-card'>
          <div className='card-header'>
            <div className='user-info'>
              <div className='avatar'>
                <img
                  src={request.requestFrom.student.user?.avatarUrl || "/api/placeholder/40/40"}
                  alt="User"
                />
              </div>
              <div className='user-details'>
                <h3>{request.requestFrom.student.user?.username}</h3>
                <p>{request.requestFrom.student.user?.email}</p>
                <p>Lý do: {request.reason || "Không có lý do"}</p>
                <span className='time'>
                  {new Date(request.createAt).toLocaleString('vi-VN')}
                </span>
              </div>
            </div>
            <div className='status-badges'>
              <span className='status-badge pending'>{request.status}</span>
              <div className='subject-info'>
                <span className='subject-label'>Môn học</span>
                <span className='subject-code'>
                  {request.requestFrom.course.name} ({request.requestFrom.course.code})
                </span>
              </div>
            </div>
          </div>

          <div className='swap-details'>
            <div className='swap-section'>
              <h4>Lớp của họ</h4>
              <div className='class-card want-swap'>
                <div className='class-code'>{request.requestFrom.fromClass}</div>
                <div className='subject-small'>{request.requestFrom.course.code}</div>
                <div className='class-info'>
                  <div>
                    {request.requestFrom.lecturerFrom.name} - {request.requestFrom.lecturerFrom.code}
                  </div>
                  <div className='schedule'>
                    {request.requestFrom.fromDays.join(' _ ')} _ {request.requestFrom.slotFrom}
                  </div>
                </div>
              </div>
            </div>

            <div className='swap-arrow'>
              <div className='arrow-icon'>⇄</div>
            </div>

            <div className='swap-section'>
              <h4>Lớp của bạn</h4>
              <div className='class-card your-class'>
                <div className='class-code'>{request.requestTo.fromClass}</div>
                <div className='subject-small'>{request.requestTo.course.name}</div>
                <div className='class-info'>
                  <div>
                    {request.requestTo.lecturerTo.name} - {request.requestTo.lecturerTo.code}
                  </div>
                  <div className='schedule'>
                    {request.requestTo.toDays.join(' _ ')} _ {request.requestTo.slotTo}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className='action-buttons'>
            <button className='btn-message'>💬 Nhắn tin</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RequestToMe
