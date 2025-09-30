import React, { useEffect, useState } from 'react'
import './MyRequest.css'
import { useAppSelector } from '../../../../store/hooks'
import { deleteSwapRequestAPI, getSwapRequestAPI } from '../../apis'
import Filter from '../filter/Filter'
import { useNavigate } from 'react-router-dom'
import Notification from '../../../../components/notification/Notification'
import ConfirmDelete from '../../../../components/confirm-delete/ConfirmDelete'
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
  const [filteredFeeds, setFilteredFeeds] = useState<MyRequest[]>([])
  const navigate = useNavigate();
  const [noti, setNoti] = useState<{ message: string; type: any } | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const pageSize = 10;

  const fetchMyRequests = async () => {
      try {
        if (!user?.studentId) return
        const response = await getSwapRequestAPI({ studentId: user.studentId ?? undefined, page: currentPage, size: pageSize})
        setMyRequests(response?.result?.data || [])
        setFilteredFeeds(response?.result?.data || [])
        setTotalElements(response.result.totalElements)
      } catch (error) {
        console.error('Error fetching my requests:', error)
      }
    }

  useEffect(() => {
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


const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteSwapRequestAPI(deleteId);
      fetchMyRequests()
      showNotification("Xóa thành công", "success");
    } catch (err: any) {
      showNotification(err?.response?.data?.message || "Xóa thất bại", "error");
    } finally {
      setDeleteId(null);
    }
  };


const showNotification = (msg: string, type: any) => {
    setNoti({ message: msg, type });
  };

  return (
    <>
    <div className='my-request-container'>
      <Filter onFilter={handleFilter} onReset={handleReset} />

      <div className='section-header'>
        <h3>Yêu cầu chuyển của tôi</h3>
        <span className='view-all'>Hiển thị {filteredFeeds.length} yêu cầu</span>
      </div>

      {filteredFeeds.map((request) => (
        <div key={request.id} className='request-card'>
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

          <div className='action-buttons-my-request'>
            <button className='btn-message-my-request' onClick={() => navigate(`/swap_class/edit/${request.id}`)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-square-pen-icon lucide-square-pen"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a1 1 0 0 1 3 3l-9.013 9.014a2 2 0 0 1-.853.505l-2.873.84a.5.5 0 0 1-.62-.62l.84-2.873a2 2 0 0 1 .506-.852z"/></svg>
                Chỉnh sửa
              </button>
            <button className='delete-request' onClick={() => setDeleteId(request.id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash-icon lucide-trash"><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/><path d="M3 6h18"/><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/></svg>
              Xóa</button>
          </div>
        </div>
      ))}
    </div>
    <Pagination
          currentPage={currentPage}
          totalPages={totalElements}
          onPageChange={(p) => setCurrentPage(p)}
        />
    {noti && (
        <Notification
          message={noti.message}
          type={noti.type}
          onClose={() => setNoti(null)}
        />
      )}
      <ConfirmDelete
        open={!!deleteId}
        onConfirm={confirmDelete}
        onCancel={() => setDeleteId(null)}
        title="Xóa yêu cầu"
        content="Bạn có chắc chắn muốn xóa yêu cầu này không?"
      />
      </>
  )
}

export default MyRequest
