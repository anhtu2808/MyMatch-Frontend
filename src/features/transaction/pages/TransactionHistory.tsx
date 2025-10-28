import React, { useState, useEffect } from 'react';
import './TransactionHistory.css';
import { getTransactionAPI } from '../apis';
import { useResponsive } from '../../../useResponsive';
import Sidebar from '../../../components/sidebar/Sidebar';
import Header from '../../../components/header/Header';

interface Transaction {
  id: number;
  transactionCode: string;
  coin: number;
  amount: number;
  type: 'IN' | 'OUT';
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  source: string;
  description: string;
}

const TransactionHistory: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const isMobile = useResponsive(1024);
  const [sidebarOpen, setSidebarOpen] = useState(false);
    const fetchTransaction = async () => {
        try {
            const response = await getTransactionAPI(1, 100);
            setTransactions(response?.result?.data)
        } catch (error: any) {
        console.error("Lỗi fetch Transaction", error);
        }
    }

    useEffect(() => {
      fetchTransaction()
    }, [])

  const getTypeLabel = (type: string): string => {
    return type === 'IN' ? 'Nạp tiền' : 'Chi tiêu';
  };

  const getTypeColor = (type: string): string => {
    return type === 'IN' ? '#10b981' : '#ef4444';
  };

  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'COMPLETED': return '#10b981';
      case 'PENDING': return '#f59e0b';
      case 'FAILED': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat('vi-VN').format(amount);
  };

    return (
  <div className="transaction-page-container">
    {!isMobile && <Sidebar />}
        <Header title="Lịch sử giao dịch" script="Quản lý các giao dịch trên hệ thống" onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} isMobile={isMobile}/>
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
    
    <div className="transaction-main-content">
    {/* Transaction List */}
    <div className="transaction-card">
      <h2 className="transaction-section-title">Danh sách giao dịch</h2>

      {loading ? (
        <div className="transaction-loading-text">Đang tải...</div>
      ) : transactions.length === 0 ? (
        <div className="transaction-empty-text">Không có giao dịch nào</div>
      ) : (
        <>
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="transaction-item"
            >
              <div className="transaction-item-content">
                {/* Left Side */}
                <div className="transaction-item-left">
                  <div className="transaction-item-header">
                    <div
                      className="transaction-item-icon"
                      style={{
                        backgroundColor:
                          transaction.type === 'IN' ? '#d1fae5' : '#fee2e2',
                      }}
                    >
                      {transaction.type === 'IN' ? (
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-banknote-arrow-up-icon lucide-banknote-arrow-up"><path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/><path d="M18 12h.01"/><path d="M19 22v-6"/><path d="m22 19-3-3-3 3"/><path d="M6 12h.01"/><circle cx="12" cy="12" r="2"/></svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-banknote-arrow-down-icon lucide-banknote-arrow-down"><path d="M12 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5"/><path d="m16 19 3 3 3-3"/><path d="M18 12h.01"/><path d="M19 16v6"/><path d="M6 12h.01"/><circle cx="12" cy="12" r="2"/></svg>
                      )}
                    </div>
                    <div className="transaction-item-info">
                      <h3>{transaction.source}</h3>
                      <p>{transaction.description}</p>
                    </div>
                  </div>

                  <div className="transaction-meta">
                    <div>Mã GD: {transaction.transactionCode}</div>
                  </div>
                </div>

                {/* Right Side */}
                <div className="transaction-item-right">
                  <div
                    className="transaction-amount"
                    style={{ color: getTypeColor(transaction.type) }}
                  >
                    {transaction.type === 'IN' ? '+' : '-'}
                    {formatCurrency(transaction.coin)} Xu
                  </div>
                  <div className="transaction-badge-group">
                    <span
                      className="transaction-badge-type"
                      style={{
                        backgroundColor: getTypeColor(transaction.type) + '20',
                        color: getTypeColor(transaction.type),
                      }}
                    >
                      {getTypeLabel(transaction.type)}
                    </span>
                    <span
                      className="transaction-badge-status"
                      style={{
                        backgroundColor:
                          getStatusColor(transaction.status) + '20',
                        color: getStatusColor(transaction.status),
                      }}
                    >
                      {transaction.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
    </div>
  </div>
);
}

export default TransactionHistory