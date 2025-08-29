import React, { useState, useEffect } from 'react'
import AddInformation from '../pages/AddInformation'
import './AddInformationModal.css'

interface AddInformationModalProps {
  forceOpen?: boolean
}

const AddInformationModal: React.FC<AddInformationModalProps> = ({ forceOpen = false }) => {
  const [isOpen, setIsOpen] = useState(false)
  useEffect(() => {
    if (forceOpen) {
      setIsOpen(true)
    }
  }, [forceOpen])

  const handleSuccess = () => {
    setIsOpen(false) // chỉ đóng khi lưu thành công
  }

  return (
    <>
      {!forceOpen && (
        <button className="open-modal-btn" onClick={() => setIsOpen(true)}>
          📝 Thêm thông tin cá nhân
        </button>
      )}

      <AddInformation
        isOpen={isOpen}
        onClose={() => !forceOpen && setIsOpen(false)} 
        onSuccess={handleSuccess}
        forceOpen={forceOpen}
      />
    </>
  )
}

export default AddInformationModal
