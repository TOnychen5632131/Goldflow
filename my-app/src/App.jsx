import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import TradePage from './pages/TradePage';
import RewardPage from './pages/RewardPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/trade" element={<TradePage />} />
      <Route path="/reward" element={<RewardPage />} />
      <Route path="/admin" element={<AdminPage />} />
      {/* 如果访问未定义的路径，重定向到首页 */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App; 