// import React from 'react'
// import AddInformationModal from '../components/AddInformationModal'

// interface UserInformation {
//   school: string
//   campus: string
//   course: string
//   major: string
//   semester: string
//   username: string
// }

// const DemoPage: React.FC = () => {
//   const handleSuccess = (data: UserInformation) => {
//     console.log('User information saved:', data)
//     // You can handle the success here, e.g., update user state, redirect, etc.
//   }

//   return (
//     <div style={{ 
//       padding: '40px', 
//       display: 'flex', 
//       flexDirection: 'column', 
//       alignItems: 'center', 
//       gap: '20px',
//       minHeight: '100vh',
//       backgroundColor: '#f8f9fa'
//     }}>
//       <h1>Add Information Popup Demo</h1>
      
//       <p>Click the button below to open the Add Information popup:</p>
      
//       {/* Default trigger button */}
//       <AddInformationModal onSuccess={handleSuccess} />
      
//       {/* Custom trigger */}
//       <AddInformationModal
//         trigger={
//           <button style={{
//             padding: '10px 20px',
//             backgroundColor: '#28a745',
//             color: 'white',
//             border: 'none',
//             borderRadius: '8px',
//             cursor: 'pointer'
//           }}>
//             Custom Trigger Button
//           </button>
//         }
//         onSuccess={handleSuccess}
//       />
      
//       {/* Another custom trigger */}
//       <AddInformationModal
//         trigger={
//           <div style={{
//             padding: '20px',
//             backgroundColor: 'white',
//             border: '2px dashed #ccc',
//             borderRadius: '12px',
//             cursor: 'pointer',
//             textAlign: 'center',
//             transition: 'all 0.3s ease'
//           }}>
//             <div style={{ fontSize: '24px', marginBottom: '8px' }}>📝</div>
//             <div>Click here to add your information</div>
//           </div>
//         }
//         onSuccess={handleSuccess}
//       />
//     </div>
//   )
// }

// export default DemoPage

import React from 'react'

function DemoPage() {
  return (
    <div>DemoPage</div>
  )
}

export default DemoPage