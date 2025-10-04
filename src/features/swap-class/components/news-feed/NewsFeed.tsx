import React, { useEffect, useState } from 'react'
import './NewsFeed.css'
import { getSwapRequestAPI } from '../../apis'
import Filter from '../filter/Filter'
import { useNavigate } from 'react-router-dom'
import Pagination from '../../../review/components/Pagination/Pagination'

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

interface User {
  id: number
  username: string
  email: string
  avatarUrl?: string
}

interface Student {
  id: number
  studentCode: string
  skill?: string
  goals?: number
  description?: string
  user: User
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

function NewsFeed() {
  const [newsFeeds, setNewsFeeds] = useState<MyRequest[]>([])
  const [filteredFeeds, setFilteredFeeds] = useState<MyRequest[]>([])
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  useEffect(() => {
    const fetchNewsFeed = async () => {
      try {
        const response = await getSwapRequestAPI({page: currentPage, size: pageSize})
        setNewsFeeds(response?.result?.data || [])
        setFilteredFeeds(response?.result?.data || [])
        setTotalElements(response.result.totalElements)
      } catch (error) {
        console.error('Error fetching news feed:', error)
      }
    }
    fetchNewsFeed()
  }, [])

  const handleFilter = (filters: {
    courseCode: string
    className: string
    lecturer: string
    slot: string
    day: string
  }) => {
    let filtered = newsFeeds

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
    setFilteredFeeds(newsFeeds)
  }

  return (
    <>
    <div className='my-request-container'>
      <Filter onFilter={handleFilter} onReset={handleReset} />

      <div className='section-header'>
        <h3>Bản tin chuyển lớp</h3>
        <span className='view-all'>Hiển thị {filteredFeeds.length} yêu cầu</span>
      </div>

      {filteredFeeds.map((request) => (
        <div className='request-card' key={request.id}>
          <div className='card-header'>
            <div className='user-info'>
              <div className='avatar'>
                <img src={request?.student?.user?.avatarUrl} alt={request?.student?.user?.username} />
              </div>
              <div className='user-details'>
                <h3>{request.student.user.username}</h3>
                <p>{request.student.user.email || 'Chưa có email'}</p>
                <p>reason: {request.reason || "Không có lý do"}</p>
                <span className='time'>
                  {new Date(request.createAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className='status-badges'>
              <span className={`status-badge ${request.status.toLowerCase()}`}>
                {request.status === 'SENT' ? 'Đang chờ phản hồi' : request.status}
              </span>

              <div className='subject-info'>
                <span className='subject-label'>Môn học</span>
                <span className='subject-code'>
                  {request.course.code} - {request.course.name}
                </span>
              </div>
            </div>
          </div>

          <div className='swap-details'>
            <div className='swap-section'>
              <h4>Lớp của họ</h4>
              <div className='class-card your-class'>
                <div className='class-header'>
                  <div className='class-code'>{request.fromClass}</div>
                  <span className='subject-small'>
                    {request.course.code}
                  </span>
                </div>
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
              <div className='arrow-icon'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-arrow-right-left-icon lucide-arrow-right-left"><path d="m16 3 4 4-4 4"/><path d="M20 7H4"/><path d="m8 21-4-4 4-4"/><path d="M4 17h16"/></svg>
              </div>
            </div>

            <div className='swap-section'>
              <h4>Họ muốn đổi</h4>
              <div className='class-card want-swap'>
                <div className='class-code'>{request.targetClass}</div>
                <span className='subject-small'>{request.course.code}</span>
                <div className='class-info'>
                  <div>{request.lecturerTo.name} - {request.lecturerTo.code}</div>
                  <div className='schedule'>
                    {request.lecturerFrom.campus.name}, {typeof request.lecturerFrom.campus.university === 'string' ? request.lecturerFrom.campus.university : request.lecturerFrom.campus.university?.name || 'N/A'}
                  </div>
                  <div className='schedule'>{request?.toDays.join(' - ')} _ {request.slotTo}</div>
                </div>
              </div>
            </div>
          </div>
          <div className='action-buttons-request-news-feed'>
            <button
              className="btn-message-news-feed"
              onClick={() => navigate(`/message/${request.student.id}`)}
            >
             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-mails-icon lucide-mails"><path d="M17 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 1-1.732"/><path d="m22 5.5-6.419 4.179a2 2 0 0 1-2.162 0L7 5.5"/><rect x="7" y="3" width="15" height="12" rx="2"/></svg>
              Nhắn tin
            </button>
          </div>
        </div>
      ))}
    </div>
    <Pagination
          currentPage={currentPage}
          totalPages={totalElements}
          onPageChange={(p) => setCurrentPage(p)}
        />
        </>
  )
}

export default NewsFeed
