import React, { useState } from 'react'

interface FilterProps {
  onFilter: (filters: {
    courseCode: string
    skill: string
  }) => void
  onReset: () => void
}

const FindingFilter: React.FC<FilterProps> = ({ onFilter, onReset }) => {
  const [filters, setFilters] = useState({
    courseCode: '',
    skill: ''
  })

  // xử lý cho input text
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    onFilter(filters)
  }

  const handleReset = () => {
    setFilters({
      courseCode: '',
      skill: '',
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
            <label>Kĩ Năng</label>
            <input
              className='input-filter'
              name='skill'
              type='text'
              value={filters.skill}
              onChange={handleInputChange}
              placeholder='e.g. SE1305'
            />
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

export default FindingFilter
