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

  return (
    <div className='filter-section'>
      <div className='filter-header'>
        <span className='filter-icon'>⚙️</span>
        <span className='filter-title'>Bộ lọc nâng cao</span>
        <span className='reset-filter' onClick={onReset}>Đặt lại bộ lọc</span>
      </div>
      <div className='filter-form'>
        <div className='form-row'>
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
            <label>Giảng viên</label>
            <input
              name="lecturer"
              type='text'
              value={filters.lecturer}
              onChange={handleChange}
              placeholder='e.g. Thanhln2'
            />
          </div>
          <div className='form-group'>
            <label>Slot *</label>
            <select name="slot" value={filters.slot} onChange={handleChange}>
              <option value="">Chọn slot</option>
              <option value="SLOT_1">Slot 1 (7:00 - 9:15)</option>
              <option value="SLOT_2">Slot 2 (9:30 - 11:45)</option>
              <option value="SLOT_3">Slot 3 (12:30 - 14:45)</option>
              <option value="SLOT_4">Slot 4 (15:00 - 17:15)</option>
            </select>
          </div>
          <div className='form-group'>
            <label>Thứ trong tuần</label>
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
          <span>Sắp xếp theo:</span>
          <select>
            <option>Mới nhất</option>
          </select>
          <button className='search-btn' onClick={handleSubmit}>🔍 Tìm kiếm</button>
        </div>
      </div>
    </div>
  )
}

export default Filter
