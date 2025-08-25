import React from 'react'
import Sidebar from '../../../components/sidebar/Sidebar';
import Header from '../../../components/header/Header';
import TeacherPageComponents from '../components/TeacherCard/TeacherPageComponents';
import '../components/TeacherCard/TeacherPageComponents';
import TeacherFilter from '../components/TeacherFilter/filter';
import Pagination from '../components/Pagination/Pagination';
import './TeachersPage.css';

function TeachersPage() {
    // For now, keep it simple without search integration
    // When you integrate with API later, you can add search functionality

    return (
        <> <div className ="teachers-page-container">
                <Sidebar />
                <Header title="Review giảng viên" script="Chia sẻ review và tìm hiểu về giảng viên" />
                <div className="teachers-page">
                    <TeacherFilter />
                    <h1 className='h1'>Danh sách giảng viên</h1>
                    <div className="teachers-page-components">
                    <TeacherPageComponents />
                    </div>
                    <Pagination currentPage={1} totalPages={10} />
                </div>
            </div>
        </>
    )
    }

export default TeachersPage;