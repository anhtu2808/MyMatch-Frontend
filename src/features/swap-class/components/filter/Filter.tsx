import React, { useState } from 'react'
import { Select } from 'antd'
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

const { Option } = Select

const Filter: React.FC<FilterProps> = ({ onFilter, onReset }) => {
  const [filters, setFilters] = useState({
    courseCode: '',
    className: '',
    lecturer: '',
    slot: '',
    day: ''
  })

  // xử lý cho input text
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  // xử lý cho select antd
  const handleSelectChange = (name: string, value: string) => {
    setFilters({ ...filters, [name]: value })
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
        <div className='filter-form-row'>
          <div className='form-group-filter'>
            <label>Mã môn học</label>
            <input
              className='input-filter'
              name='courseCode'
              type='text'
              value={filters.courseCode}
              onChange={handleInputChange}
              placeholder='e.g. EXE201'
            />
          </div>
          <div className='form-group-filter'>
            <label>Tên lớp</label>
            <input
              className='input-filter'
              name='className'
              type='text'
              value={filters.className}
              onChange={handleInputChange}
              placeholder='e.g. SE1305'
            />
          </div>
          <div className='form-group-filter'>
            <label>Tên giảng viên</label>
            <input
              className='input-filter'
              name='lecturer'
              type='text'
              value={filters.lecturer}
              onChange={handleInputChange}
              placeholder='e.g. Nguyễn Thế Hoàng'
            />
          </div>

          {/* Slot Select */}
          <div className='form-group-filter'>
            <label>Slot</label>
            <Select
              className='input-filter'
              value={filters.slot || undefined}
              onChange={(value) => handleSelectChange('slot', value)}
              placeholder='Chọn slot'
              style={{ width: '100%' }}
            >
              <Option value='SLOT_1'>Slot 1 (7:00 - 9:15)</Option>
              <Option value='SLOT_2'>Slot 2 (9:30 - 11:45)</Option>
              <Option value='SLOT_3'>Slot 3 (12:30 - 14:45)</Option>
              <Option value='SLOT_4'>Slot 4 (15:00 - 17:15)</Option>
            </Select>
          </div>

          {/* Day Select */}
          <div className='form-group-filter'>
            <label>Ngày</label>
            <Select
              className='input-filter'
              value={filters.day || undefined}
              onChange={(value) => handleSelectChange('day', value)}
              placeholder='Chọn ngày'
              style={{ width: '100%' }}
            >
              <Option value='2'>Thứ 2</Option>
              <Option value='3'>Thứ 3</Option>
              <Option value='4'>Thứ 4</Option>
              <Option value='5'>Thứ 5</Option>
              <Option value='6'>Thứ 6</Option>
              <Option value='7'>Thứ 7</Option>
            </Select>
          </div>
        </div>
          <div className='button-form-actions-filter'>
            <button className='delete-btn' onClick={handleReset}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21' />
                <path d='M22 21H7' />
                <path d='m5 11 9 9' />
              </svg>
              Xóa bộ lọc
            </button>
            <button className='search-btn' onClick={handleSubmit}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                viewBox='0 0 24 24'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'
              >
                <path d='m21 21-4.34-4.34' /> <circle cx='11' cy='11' r='8' />
              </svg>
              Tìm kiếm
            </button>
          </div>
    </div>
  )
}

export default Filter
