import React, { useEffect, useState } from 'react'
import './RequestToMe.css'
import { getSwapMatchingAPI, updateConfirmSwapRequestAPI } from '../../apis'
import Filter from '../filter/Filter'
import { useNavigate } from 'react-router-dom'

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
  const navigation = useNavigate()
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

  const handleAcceptSwap = (id: number) => {
    const data = {
      decision: "ACCEPTED",
      reason: "accept"
    }
    try{
      if(!id){
        console.log("no id to confirm swap request");
      }
      updateConfirmSwapRequestAPI(data, id)
    }
    catch(err){
      console.log(err);
    }
  }

  const handleRejectSwap = (id: number) => {
    const data = {
      decision: "REJECTED",
      reason: "reject"
    }
    try{
      if(!id){
        console.log("no id to confirm swap request");
      }
      updateConfirmSwapRequestAPI(data, id)
    }
    catch(err){
      console.log(err);
    }
  }


  return (
    <div className='my-request-container'>
      <Filter onFilter={handleFilter} onReset={handleReset} />
      <div className='section-header'>
        <h2>Yêu cầu gửi tới tôi</h2>
        <span className='view-all'>Hiển thị {filteredFeeds.length} yêu cầu</span>
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
              <h4>Lớp của bạn</h4>
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
              <h4>Lớp của họ</h4>
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
          <div className='action-buttons-matching'>
            <button className='btn-message-matching' onClick={() => navigation(`/message/${request.requestTo?.student?.id}`)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mails-icon lucide-mails"><path d="M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732"/><path d="m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5"/><rect x="7" y="3" width="15" height="12" rx="2"/></svg>
              Nhắn tin
              </button>
            <button className='btn-message-matching-reject' onClick={() => handleRejectSwap(request.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-copy-x-icon lucide-copy-x"><line x1="12" x2="18" y1="12" y2="18"/><line x1="12" x2="18" y1="18" y2="12"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              Từ chối
              </button>
            <button className='btn-message-matching-accept' onClick={() => handleAcceptSwap(request.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-copy-check-icon lucide-copy-check"><path d="m12 15 2 2 4-4"/><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
              Chấp nhận
              </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default RequestToMe
