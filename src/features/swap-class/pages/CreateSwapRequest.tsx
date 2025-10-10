import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Sidebar from '../../../components/sidebar/Sidebar'
import Header from '../../../components/header/Header'
import './CreateSwapRequest.css'
import Select from "react-select";
import { createSwapRequestAPI, getSwapRequestByIdAPI, updateSwapRequestAPI } from '../apis'
import Notification from '../../../components/notification/Notification'
import { useResponsive } from '../../../useResponsive'

interface SwapRequestData {
  codeCourse: string
  fromClass: string
  targetClass: string
  codeLecturerFrom: string
  codeLecturerTo: string
  slotFrom: string
  slotTo: string
  fromDays: string[]
  toDays: string[]
  reason: string
  visibility: string
  expiresAt: Date
  status: string
}

const CreateSwapRequest: React.FC = () => {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const isEdit = Boolean(id)
  const [errors, setErrors] = useState<Partial<SwapRequestData>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const mapDay = (day: string) => day.toUpperCase()
  const [noti, setNoti] = useState<{ message: string; type: any } | null>(null);
  const isMobile = useResponsive(1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  useEffect(() => {
  if (isEdit) {
    const fetchData = async () => {
      try {
        const response = await getSwapRequestByIdAPI(Number(id))
        const data = response?.result
        setFormData({
          codeCourse: data.course.code,
          fromClass: data.fromClass,
          targetClass: data.targetClass,
          codeLecturerFrom: data.lecturerFrom.code,
          codeLecturerTo: data.lecturerTo.code,
          slotFrom: mapSlot(data.slotFrom),
          slotTo: mapSlot(data.slotTo),
          fromDays: data.fromDays.map((d: string) => d.toLowerCase()),
          toDays: data.toDays.map((d: string) => d.toLowerCase()),
          reason: data.reason || '',
          status: data.status,
          visibility: data.visibility,
          expiresAt: new Date(data.expiresAt),
        })
      } catch (error) {
        console.error("Error fetching request:", error)
      }
    }
    fetchData()
  }
}, [id])

  const [formData, setFormData] = useState<SwapRequestData>({
    codeCourse: '',
    fromClass: '',
    targetClass: '',
    codeLecturerFrom: '',
    codeLecturerTo: '',
    fromDays: [],
    toDays: [],
    slotFrom: '',
    slotTo: '',
    status: "SENT",
    visibility: "PUBLIC",
    expiresAt: new Date(),
    reason: ''
  })

  

  const dayOptions = [
    { value: 'monday', label: 'Thứ 2' },
    { value: 'tuesday', label: 'Thứ 3' },
    { value: 'wednesday', label: 'Thứ 4' },
    { value: 'thursday', label: 'Thứ 5' },
    { value: 'friday', label: 'Thứ 6' },
    { value: 'saturday', label: 'Thứ 7' },
    { value: 'sunday', label: 'Chủ nhật' }
  ]

  const slotOptions = [
    { value: 'slot1', label: 'Slot 1 (7:00 - 9:15)' },
    { value: 'slot2', label: 'Slot 2 (9:30 - 11:45)' },
    { value: 'slot3', label: 'Slot 3 (12:30 - 14:45)' },
    { value: 'slot4', label: 'Slot 4 (15:00 - 17:15)' },
  ]
  
  const handleInputChange = (field: keyof SwapRequestData, value: string | string[]) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))

    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  const mapSlot = (slot: string) => {
  switch (slot) {
    case "SLOT_1": return "slot1"
    case "SLOT_2": return "slot2"
    case "SLOT_3": return "slot3"
    case "SLOT_4": return "slot4"
    default: return ""
  }
}

const mapSlotToApi = (slot: string) => {
  switch (slot) {
    case "slot1": return "SLOT_1"
    case "slot2": return "SLOT_2"
    case "slot3": return "SLOT_3"
    case "slot4": return "SLOT_4"
    default: return ""
  }
}

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)

  try {
    const payload = {
      codeCourse: formData.codeCourse,
      fromClass: formData.fromClass,
      targetClass: formData.targetClass,
      codeLecturerFrom: formData.codeLecturerFrom,
      codeLecturerTo: formData.codeLecturerTo,
      slotFrom: mapSlotToApi(formData.slotFrom),
      slotTo: mapSlotToApi(formData.slotTo),
      reason: formData.reason || '',
      status: formData.status,
      visibility: formData.visibility,
      fromDays: formData.fromDays.map(mapDay),
      toDays: formData.toDays.map(mapDay),
      xpiresAt: formData.expiresAt instanceof Date && !isNaN(formData.expiresAt.getTime())
        ? formData.expiresAt.toISOString()
        : null,  // ✅ tránh lỗi
    }

    if (isEdit) {
      await updateSwapRequestAPI(payload, Number(id))
      showNotification("Cập nhật thành công", "success")
    } else {
      await createSwapRequestAPI(payload)
      showNotification("Tạo thành công", "success")
    }
    setTimeout (() => {navigate("/swap_class")}, 2000)
    
  } catch (err: any) {
    showNotification(err?.response?.data?.message || "Thất bại", "error")
  } finally {
    setIsSubmitting(false)
  }
}

  const handleCancel = () => navigate('/swap_class')

  const showNotification = (msg: string, type: any) => {
    setNoti({ message: msg, type });
  };

  return (
    <>
    <div className="create-swap-page">
      {!isMobile && <Sidebar />}
      <Header title="Tạo yêu cầu đổi lớp" script="Nhập thông tin lớp học bạn muốn trao đổi" onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile}/>
        {isMobile && (
        <>
          <div className={`sidebar-drawer ${sidebarOpen ? "open" : ""}`}>
            <Sidebar isMobile={true} />
          </div>
          {sidebarOpen && (
            <div className="overlay" onClick={() => setSidebarOpen(false)} />
          )}
        </>
      )}
      <div className="create-swap-main-content">
        <form className="swap-form" onSubmit={handleSubmit}>
          {/* Subject Section */}
          <div className="form-section subject-section">
            <div className="section-header-create">
              <div className="section-icon-wrapper blue"><span className="section-icon">📚</span></div>
              <h3 className="section-title">Môn học</h3>
            </div>
            <div className="form-group full-width">
              <label className="form-label">Mã môn học <span className="required">*</span></label>
              <input
                type="text"
                className={`form-input ${errors.codeCourse ? 'error' : ''}`}
                placeholder="VD: EXE201"
                value={formData.codeCourse}
                onChange={(e) => handleInputChange('codeCourse', e.target.value)}
              />
              {errors.codeCourse && <span className="error-message">{errors.codeCourse}</span>}
            </div>
          </div>

          {/* Current and Desired Class Sections */}
          <div className="two-column-layout">
            {/* Current Class */}
            <div className="form-section current-class-section">
              <div className="section-header-create">
                <div className="section-icon-wrapper blue"><span className="section-icon">📋</span></div>
                <h3 className="section-title">Lớp hiện tại của bạn</h3>
              </div>
              <div className="form-group">
                <label className="form-label">Mã lớp <span className="required">*</span></label>
                <input type="text" className={`form-input ${errors.fromClass ? 'error' : ''}`}
                  placeholder="VD: SE1704" value={formData.fromClass}
                  onChange={(e) => handleInputChange('fromClass', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Thứ <span className="required">*</span> (tối đa 2 thứ)</label>
                <Select
                  isMulti
                  options={dayOptions}
                  value={dayOptions.filter(opt => formData.fromDays.includes(opt.value))}
                  onChange={(selected) => {
                    const values = selected.map((s) => s.value);
                    if (values.length <= 2) handleInputChange("fromDays", values);
                  }}
                  placeholder="Chọn thứ (tối đa 2)" closeMenuOnSelect={false}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Slot <span className="required">*</span></label>
                <select className={`form-select ${errors.slotFrom ? 'error' : ''}`}
                  value={formData.slotFrom} onChange={(e) => handleInputChange('slotFrom', e.target.value)}>
                  <option value="">Chọn slot</option>
                  {slotOptions.map(slot => <option key={slot.value} value={slot.value}>{slot.label}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Mã giảng viên</label>
                <input type="text" className="form-input" placeholder='VD: HoangNT2' value={formData.codeLecturerFrom} 
                  onChange={(e) => handleInputChange('codeLecturerFrom', (e.target.value))} />
              </div>
            </div>

            {/* Desired Class */}
            <div className="form-section desired-class-section">
              <div className="section-header-create">
                <div className="section-icon-wrapper green"><span className="section-icon">✅</span></div>
                <h3 className="section-title">Lớp muốn đổi</h3>
              </div>
              <div className="form-group">
                <label className="form-label">Mã lớp <span className="required">*</span></label>
                <input type="text" className="form-input" placeholder='VD: SE1705' value={formData.targetClass} 
                  onChange={(e) => handleInputChange('targetClass', e.target.value)} />
              </div>
              <div className="form-group">
                <label className="form-label">Thứ <span className="required">*</span> (tối đa 2 thứ)</label>
                <Select isMulti options={dayOptions}
                  value={dayOptions.filter(opt => formData.toDays.includes(opt.value))}
                  onChange={(selected) => {
                    const values = selected.map((s) => s.value);
                    if (values.length <= 2) handleInputChange("toDays", values);
                  }}
                  placeholder="Chọn thứ (tối đa 2)" closeMenuOnSelect={false}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Slot <span className="required">*</span></label>
                <select className={`form-select ${errors.slotTo ? 'error' : ''}`}
                  value={formData.slotTo} onChange={(e) => handleInputChange('slotTo', e.target.value)}>
                  <option value="">Chọn slot</option>
                  {slotOptions.map(slot => <option key={slot.value} value={slot.value}>{slot.label}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Mã giảng viên</label>
                <input type="text" className="form-input" placeholder='VD: LamNN15' value={formData.codeLecturerTo} 
                  onChange={(e) => handleInputChange('codeLecturerTo', (e.target.value))} />
              </div>
            </div>
          </div>

          {/* Reason */}
          <div className="form-section">
            <div className="form-group">
              <label className="form-label">Lý do muốn đổi lớp</label>
              <textarea className="form-textarea" placeholder="Mô tả lý do" rows={4}
                value={formData.reason} onChange={(e) => handleInputChange('reason', e.target.value)} />
            </div>
          </div>

          {/* Actions */}
          <div className="form-actions">
            <div className='button-form-actions'>
            <button type="button" className="cancel-btn-create-swap" onClick={handleCancel} disabled={isSubmitting}>Hủy</button>
            <button type="submit" className="submit-btn-create-swap" disabled={isSubmitting}>
              {isSubmitting ? 'Đang xử lý...' : isEdit ? 'Cập nhật yêu cầu' : 'Gửi yêu cầu'}
            </button>
            </div>          
          </div>
        </form>
      </div>
    </div>
    {noti && (
        <Notification
          message={noti.message}
          type={noti.type}
          onClose={() => setNoti(null)}
        />
      )}
      </>
  )
}

export default CreateSwapRequest
