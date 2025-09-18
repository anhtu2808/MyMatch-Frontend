import React, { useState } from 'react'
import './Filter.css'

interface FilterProps {
  onFilter: (filters: {
    courseCode: string
    className: string
    lecturer: string
    slot: string
    day: string
  }) => void
  onReset: () => void
}

const Filter: React.FC<FilterProps> = ({ onFilter, onReset }) => {
  const [filters, setFilters] = useState({
    courseCode: '',
    className: '',
    lecturer: '',
    slot: '',
    day: ''
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    onFilter(filters)
  }

  const handleReset = () => {
  setFilters({
    courseCode: '',
    className: '',
    lecturer: '',
    slot: '',
    day: ''
  })
  onReset()
}


  return (
    <div className='filter-section'>
      <div className='filter-header'>
        <span className='filter-icon'>⚙️</span>
        <span className='filter-title'>Bộ lọc nâng cao</span>
      </div>
      <div className='filter-form'>
        <div className='filter-form-row'>
          <div className='form-group'>
            <label>Mã môn học</label>
            <input
              name="courseCode"
              type='text'
              value={filters.courseCode}
              onChange={handleChange}
              placeholder='e.g. EXE201'
            />
          </div>
          <div className='form-group'>
            <label>Tên lớp</label>
            <input
              name="className"
              type='text'
              value={filters.className}
              onChange={handleChange}
              placeholder='e.g. SE1305'
            />
          </div>
          <div className='form-group'>
            <label>Mã giảng viên</label>
            <input
              name="lecturer"
              type='text'
              value={filters.lecturer}
              onChange={handleChange}
              placeholder='e.g. Thanhln2'
            />
          </div>
          <div className='form-group'>
            <label>Slot </label>
            <select name="slot" value={filters.slot} onChange={handleChange}>
              <option value="">Chọn slot</option>
              <option value="SLOT_1">Slot 1 (7:00 - 9:15)</option>
              <option value="SLOT_2">Slot 2 (9:30 - 11:45)</option>
              <option value="SLOT_3">Slot 3 (12:30 - 14:45)</option>
              <option value="SLOT_4">Slot 4 (15:00 - 17:15)</option>
            </select>
          </div>
          <div className='form-group'>
            <label>Ngày</label>
            <select name="day" value={filters.day} onChange={handleChange}>
              <option value="">Chọn ngày</option>
              <option value="2">Thứ 2</option>
              <option value="3">Thứ 3</option>
              <option value="4">Thứ 4</option>
              <option value="5">Thứ 5</option>
              <option value="6">Thứ 6</option>
              <option value="7">Thứ 7</option>
            </select>
          </div>
        </div>
        <div className='form-actions'>
          <div className='button-form-actions'>
          <button className='delete-btn' onClick={handleReset}>
            <svg xmlns="http://www.w3.org/2000/svg"width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"  strokeLinejoin="round">
              <path d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21" /><path d="M22 21H7" /><path d="m5 11 9 9" />
            </svg>
            Xóa bộ lọc
          </button>
          <button className='search-btn' onClick={handleSubmit}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m21 21-4.34-4.34" /> <circle cx="11" cy="11" r="8" />
            </svg>
            Tìm kiếm
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filter
