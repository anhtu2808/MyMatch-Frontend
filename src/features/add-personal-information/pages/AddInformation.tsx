import React, { useEffect, useState } from 'react'
import './AddInformation.css'
import { getCampusesAPI, updateStudentAPI } from '../apis'
import { useAppSelector } from '../../../store/hooks'

interface UserInformation {
  campusId: number
  studentCode: string
}

interface AddInformationProps {
  isOpen: boolean
  onClose: () => void
  onSuccess: () => void
  forceOpen?: boolean
}

function AddInformation({ isOpen, onClose, onSuccess, forceOpen = false }: AddInformationProps) {
  const [formData, setFormData] = useState<UserInformation>({
    campusId: 0,
    studentCode: ''
  })

  const [campuses, setCampuses] = useState<any[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const user = useAppSelector((state) => state.user)
  const userId = user?.studentId
  useEffect(() => {
    const fetchCampuses = async () => {
      try {
        const response = await getCampusesAPI(1)
        setCampuses(response?.result?.data || [])
        console.log("campussssss get", response?.result?.data);
      } catch (error) {
        console.error('Error fetching campuses:', error)
      }
    }
    fetchCampuses()
  }, [])

  const handleChange = (field: keyof UserInformation, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'campusId' ? Number(value) : value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.campusId || !formData.studentCode) {
      alert("Vui lòng điền đầy đủ thông tin")
      return
    }

    try {
      setIsSubmitting(true)
      if (!userId) throw new Error("User ID not found")

      await updateStudentAPI(
        { campusId: formData.campusId, studentCode: formData.studentCode },
        userId
      )

      alert("Lưu thông tin thành công!")
      onSuccess() // chỉ khi lưu mới đóng
    } catch (error) {
      console.error("Error saving user information:", error)
      alert("Có lỗi xảy ra khi lưu thông tin")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className="add-info-overlay"
      onClick={(e) => {
        if (!forceOpen && e.target === e.currentTarget) onClose()
      }}
    >
      <div className="add-info-popup">
        <h2 className='h2-addInformation'>Thông tin cá nhân</h2>

        <form className="add-info-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Cơ sở</label>
            <select
              value={formData.campusId || ''}
              onChange={(e) => handleChange('campusId', e.target.value)}
            >
              <option value="">Chọn cơ sở</option>
              {campuses.map((campus) => (
                <option key={campus.id} value={campus.id}>
                  {campus?.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label>StudentID</label>
            <input
              type="text"
              value={formData.studentCode}
              onChange={(e) => handleChange('studentCode', e.target.value)}
              placeholder="VD: SE172181"
            />
          </div>

          <div className="form-actions">
            {!forceOpen && (
              <button type="button" onClick={onClose} disabled={isSubmitting}>
                Hủy
              </button>
            )}
            <button type="submit" disabled={isSubmitting} className='save-button-add-info'>
              {isSubmitting ? "Đang lưu..." : "Lưu"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddInformation
