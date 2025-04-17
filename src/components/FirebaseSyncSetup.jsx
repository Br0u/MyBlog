import React, { useState, useEffect } from 'react';
import { isFirebaseAvailable, importFromLocalStorage, initializeFirebaseData } from '../services/firebasePostService';
import { checkFirebaseConnection } from '../firebase';
import Button from './ui/Button';

const FirebaseSyncSetup = ({ onSyncModeChange }) => {
  const [firebaseStatus, setFirebaseStatus] = useState('checking'); // 'checking', 'available', 'unavailable'
  const [importStatus, setImportStatus] = useState(null);
  const [syncMode, setSyncMode] = useState(localStorage.getItem('syncMode') || 'local');

  // 检查 Firebase 可用性
  useEffect(() => {
    const checkFirebase = async () => {
      try {
        if (isFirebaseAvailable()) {
          const connectionTest = await checkFirebaseConnection();
          if (connectionTest.success) {
            setFirebaseStatus('available');
          } else {
            setFirebaseStatus('unavailable');
          }
        } else {
          setFirebaseStatus('unavailable');
        }
      } catch (error) {
        console.error('检查Firebase可用性时出错:', error);
        setFirebaseStatus('unavailable');
      }
    };

    checkFirebase();
  }, []);

  // 处理同步模式变更
  const handleSyncModeChange = async (mode) => {
    try {
      if (mode === 'firebase' && firebaseStatus === 'available') {
        // 初始化 Firebase 数据
        await initializeFirebaseData();
        
        // 从本地存储导入到 Firebase
        const importResult = await importFromLocalStorage();
        setImportStatus(importResult);
        
        // 更新同步模式
        localStorage.setItem('syncMode', 'firebase');
        setSyncMode('firebase');
        
        // 通知父组件
        if (onSyncModeChange) {
          onSyncModeChange('firebase');
        }
      } else if (mode === 'local') {
        // 更新同步模式
        localStorage.setItem('syncMode', 'local');
        setSyncMode('local');
        
        // 通知父组件
        if (onSyncModeChange) {
          onSyncModeChange('local');
        }
      }
    } catch (error) {
      console.error('切换同步模式时出错:', error);
      setImportStatus({ 
        success: false, 
        message: `切换同步模式失败: ${error.message}` 
      });
    }
  };

  return (
    <div className="bg-sepia-lightest/50 p-4 rounded-lg border border-sepia-light/20 mb-6">
      <h3 className="text-sm font-medium text-sepia-dark mb-2">数据同步设置</h3>
      
      {/* Firebase 状态指示器 */}
      <div className="flex items-center mb-4">
        <div className={`w-3 h-3 rounded-full mr-2 ${
          firebaseStatus === 'available' ? 'bg-green-500' : 
          firebaseStatus === 'unavailable' ? 'bg-red-500' : 
          'bg-yellow-500'
        }`}></div>
        <span className="text-xs text-sepia-muted">
          {firebaseStatus === 'available' ? 'Firebase连接正常' : 
           firebaseStatus === 'unavailable' ? 'Firebase未连接' : 
           '正在检查Firebase连接...'}
        </span>
      </div>
      
      {/* 同步模式选择 */}
      <div className="flex flex-wrap items-center gap-3 mb-4">
        <span className="text-xs text-sepia-dark">同步模式:</span>
        <div className="flex rounded-md overflow-hidden border border-sepia-light/30">
          <button
            onClick={() => handleSyncModeChange('local')}
            className={`px-3 py-1 text-xs ${
              syncMode === 'local' 
                ? 'bg-amber-100 text-amber-800' 
                : 'bg-sepia-lightest/80 text-sepia-muted hover:bg-sepia-lightest'
            }`}
          >
            本地存储
          </button>
          <button
            onClick={() => handleSyncModeChange('firebase')}
            disabled={firebaseStatus !== 'available'}
            className={`px-3 py-1 text-xs ${
              syncMode === 'firebase' 
                ? 'bg-amber-100 text-amber-800' 
                : firebaseStatus !== 'available'
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-sepia-lightest/80 text-sepia-muted hover:bg-sepia-lightest'
            }`}
          >
            Firebase云同步
          </button>
        </div>
      </div>
      
      {/* Firebase配置指南 */}
      {firebaseStatus === 'unavailable' && (
        <div className="bg-amber-50 p-3 rounded-md text-xs text-amber-800 mb-4">
          <p className="font-medium mb-1">Firebase未连接</p>
          <p className="mb-2">请按照以下步骤设置Firebase:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>在 <a href="https://console.firebase.google.com/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">Firebase控制台</a> 创建一个新项目</li>
            <li>在Firebase项目中添加一个Web应用</li>
            <li>复制Firebase配置对象</li>
            <li>更新项目中的 <code className="bg-amber-100 px-1 rounded">src/firebase.js</code> 文件</li>
            <li>刷新页面并尝试重新连接</li>
          </ol>
        </div>
      )}
      
      {/* 导入状态信息 */}
      {importStatus && (
        <div className={`mt-2 p-2 text-xs rounded ${
          importStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
        }`}>
          {importStatus.message}
        </div>
      )}
    </div>
  );
};

export default FirebaseSyncSetup; 