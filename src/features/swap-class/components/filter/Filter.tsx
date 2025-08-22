import React from 'react'
import './Filter.css'

const Filter = () => {
  return (
    <div className='filter-section'>
      <div className='filter-header'>
        <span className='filter-icon'>🔽</span>
        <span className='filter-title'>Bộ lọc nâng cao</span>
        <span className='reset-filter'>Đặt lại bộ lọc</span>
      </div>
      <div className='filter-form'>
        <div className='form-row'>
          <div className='form-group'>
            <label>Mã môn học</label>
            <input type='text' placeholder='e.g. EXE201' />
          </div>
          <div className='form-group'>
            <label>Tên lớp</label>
            <input type='text' placeholder='e.g. SE1305' />
          </div>
          <div className='form-group'>
            <label>Giảng viên</label>
            <input type='text' placeholder='e.g. Thanhln2' />
          </div>
          <div className='form-group'>
            <label>Slot *</label>
            <select>
              <option>Chọn slot</option>
              <option>Slot 1 (7:00 - 9:15)</option>
              <option>Slot 2 (9:30 - 11:45)</option>
              <option>Slot 3 (12:30 - 14:45)</option>
              <option>Slot 4 (15:00 - 17:15)</option>
            </select>
          </div>
          <div className='form-group'>
            <label>Thứ trong tuần</label>
            <select>
              <option>Chọn ngày</option>
              <option>Thứ 2</option>
              <option>Thứ 3</option>
              <option>Thứ 4</option>
              <option>Thứ 5</option>
              <option>Thứ 6</option>
              <option>Thứ 7</option>
            </select>
          </div>
        </div>
        <div className='form-actions'>
          <span>Sắp xếp theo:</span>
          <select>
            <option>Mới nhất</option>
          </select>
          <button className='search-btn'>🔍 Tìm kiếm</button>
        </div>
      </div>
    </div>
  )
}

export default Filter