import React, { useEffect, useState } from 'react'
import './MyRequest.css'
import { useAppSelector } from '../../../../store/hooks'
import { deleteSwapRequestAPI, getSwapRequestAPI } from '../../apis'
import Filter from '../filter/Filter'
import { useNavigate } from 'react-router-dom'

interface Course {
  id: number
  code: string
  name: string
}

interface University {
  id: number
  name: string
  imgUrl?: string
  courses: Course[]
}

interface Campus {
  id: number
  name: string
  address: string
  imgUrl?: string
  university: University
}

interface Lecturer {
  id: number
  name: string
  code: string
  campus: Campus
}

interface Student {
  id: number
  studentCode: string
  skill?: string
  goals?: number
  description?: string
   user: User
}

interface User {
  id: number
  username: string
  email: string
  avatarUrl?: string
}

interface MyRequest {
  id: number
  student: Student
  status: string
  reason: string
  course: Course
  lecturerFrom: Lecturer
  lecturerTo: Lecturer
  createAt: string
  fromClass: string
  targetClass: string
  slotFrom: string
  slotTo: string
  fromDays: string[]
  toDays: string[]
}

function MyRequest() {
  const [myRequests, setMyRequests] = useState<MyRequest[]>([])
  const user = useAppSelector((state) => state.user)
  console.log("My requestttttttttttttttttttttttttttt", myRequests);
  console.log("User ID:", user?.id);
  const [filteredFeeds, setFilteredFeeds] = useState<MyRequest[]>([])
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyRequests = async () => {
      try {
        if (!user?.studentId) return
        // truyền đúng studentId từ redux user
        const response = await getSwapRequestAPI({ studentId: user.studentId ?? undefined})
        console.log('MyRequest API response:', response)
        console.log('MyRequest data:', response?.result?.data)
        setMyRequests(response?.result?.data || [])
        setFilteredFeeds(response?.result?.data || [])
      } catch (error) {
        console.error('Error fetching my requests:', error)
      }
    }
    fetchMyRequests()
  }, [user?.studentId])

  const handleFilter = (filters: {
    courseCode: string
    className: string
    lecturer: string
    slot: string
    day: string
  }) => {
    let filtered = myRequests

    if (filters.courseCode) {
      filtered = filtered.filter(r => 
        r.course.code.toLowerCase().includes(filters.courseCode.toLowerCase())
      )
    }
    if (filters.className) {
      filtered = filtered.filter(r =>
        r.fromClass.toLowerCase().includes(filters.className.toLowerCase()) ||
        r.targetClass.toLowerCase().includes(filters.className.toLowerCase())
      )
    }
    if (filters.lecturer) {
      filtered = filtered.filter(r =>
        r.lecturerFrom.name.toLowerCase().includes(filters.lecturer.toLowerCase()) ||
        r.lecturerTo.name.toLowerCase().includes(filters.lecturer.toLowerCase())
      )
    }
    if (filters.slot) {
      filtered = filtered.filter(r =>
        r.slotFrom === filters.slot || r.slotTo === filters.slot
      )
    }
    if (filters.day) {
      filtered = filtered.filter(r =>
        r.fromDays.includes(filters.day) || r.toDays.includes(filters.day)
      )
    }

    setFilteredFeeds(filtered)
  }

  const handleReset = () => {
    setFilteredFeeds(myRequests)
  }

  const handleDeleteRequest = async (id: number) => {
  const confirmDelete = window.confirm("Bạn có chắc chắn muốn xóa yêu cầu này không?");
  if (confirmDelete) {
    try {
      await deleteSwapRequestAPI(id);
      alert("Xóa thành công!");
    } catch (error) {
      console.error(error);
      alert("Có lỗi xảy ra khi xóa!");
    }
  }
};

  return (
    <div className='my-request-container'>
      <Filter onFilter={handleFilter} onReset={handleReset} />

      <div className='section-header'>
        <h2>Yêu cầu chuyển của tôi</h2>
        <span className='view-all'>Hiển thị {myRequests.length} yêu cầu</span>
      </div>

      {filteredFeeds.map((request) => (
        <div key={request.id} className='request-card'>
          <div className='card-header'>
            <div className='user-info'>
              <div className='avatar'>
                {/* <img src="/api/placeholder/40/40" alt="User" /> */}
              </div>
              <div className='user-details'>
                <h3>{request.student.user.username}</h3>
                <p>{request.student.user.email || 'Chưa có email'}</p>
                <p>reason: {request.reason || "Không có lý do"}</p>
                <span className='time'>
                  {new Date(request.createAt).toLocaleString('vi-VN')}
                </span>
              </div>
            </div>
            <div className='status-badges'>
              <span className={`status-badge ${request.status.toLowerCase()}`}>
                {request.status}
              </span>
              <div className='subject-info'>
                <span className='subject-label'>Môn học</span>
                <span className='subject-code'>
                  {request.course.name} ({request.course.code})
                </span>
              </div>
            </div>
          </div>

          <div className='swap-details'>
            <div className='swap-section'>
              <h4>Lớp hiện tại</h4>
              <div className='class-card your-class'>
                <div className='class-header'>
                  <span className='class-code'>{request.fromClass}</span>
                </div>
                <div className='subject-small'>{request.course.code}</div>
                <div className='class-info'>
                  <div>{request.lecturerFrom.name} - {request.lecturerFrom.code}</div>
                  <div className='schedule'>
                    {request.lecturerFrom.campus.name}, {typeof request.lecturerFrom.campus.university === 'string' ? request.lecturerFrom.campus.university : request.lecturerFrom.campus.university?.name || 'N/A'}
                  </div>
                  <div className='schedule'>{request?.fromDays.join(' _ ')} _ {request.slotFrom}</div>
                </div>
              </div>
            </div>

            <div className='swap-arrow'>
              <div className='arrow-icon'>⇄</div>
            </div>

            <div className='swap-section'>
              <h4>Lớp muốn đổi</h4>
              <div className='class-card want-swap'>
                 <div className='class-header'>
                  <span className='class-code'>{request.targetClass}</span>
                </div>
                <div className='subject-small'>{request.course.code}</div>
                <div className='class-info'>
                  <div>{request.lecturerTo.name} - {request.lecturerTo.code}</div>
                  <div className='schedule'>
                    {request.lecturerTo.campus.name}, {typeof request.lecturerTo.campus.university === 'string' ? request.lecturerTo.campus.university : request.lecturerTo.campus.university?.name || 'N/A'}
                  </div>
                  <div className='schedule'>{request?.toDays.join(' - ')} _ {request.slotTo}</div>
                </div>
              </div>
            </div>
          </div>

          <div className='action-buttons-request'>
            <button className='btn-message' onClick={() => navigate(`/swap_class/edit/${request.id}`)}>✏️ Chỉnh sửa</button>
            <button className='delete-request' onClick={() => handleDeleteRequest(request.id)}>Xóa</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default MyRequest
