import React, { useState, useEffect } from 'react';
import { switchToFirebase, switchToLocal, getCurrentStorageType } from '../../services/switchStorage';
import { FaDatabase, FaExchangeAlt, FaFireAlt, FaDesktop, FaInfoCircle } from 'react-icons/fa';

/**
 * 存储切换组件
 * 用于在本地存储和Firebase存储之间进行切换
 */
const StorageSwitcher = () => {
  const [storageType, setStorageType] = useState('checking');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    checkStorageType();
  }, []);

  // 检查当前存储类型
  const checkStorageType = async () => {
    try {
      setStorageType('checking');
      const type = await getCurrentStorageType();
      setStorageType(type);
    } catch (error) {
      setMessage(`检查存储类型失败: ${error.message}`);
      setShowMessage(true);
    }
  };

  // 切换到Firebase存储
  const handleSwitchToFirebase = async () => {
    if (storageType === 'firebase') {
      setMessage('已经是Firebase存储了');
      setShowMessage(true);
      return;
    }

    try {
      setIsLoading(true);
      setMessage('正在切换到Firebase存储...');
      setShowMessage(true);
      
      const result = await switchToFirebase();
      
      if (result.success) {
        setStorageType('firebase');
        setMessage('已成功切换到Firebase存储，请刷新页面以应用更改');
      } else {
        setMessage(`切换失败: ${result.message}`);
      }
    } catch (error) {
      setMessage(`切换失败: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  // 切换到本地存储
  const handleSwitchToLocal = async () => {
    if (storageType === 'local') {
      setMessage('已经是本地存储了');
      setShowMessage(true);
      return;
    }

    try {
      setIsLoading(true);
      setMessage('正在切换到本地存储...');
      setShowMessage(true);
      
      const result = await switchToLocal();
      
      if (result.success) {
        setStorageType('local');
        setMessage('已成功切换到本地存储，请刷新页面以应用更改');
      } else {
        setMessage(`切换失败: ${result.message}`);
      }
    } catch (error) {
      setMessage(`切换失败: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-4 mb-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <FaDatabase className="mr-2" /> 存储设置
      </h2>
      
      <div className="mb-4">
        <p className="mb-2 flex items-center">
          <FaInfoCircle className="mr-2 text-blue-500" />
          当前存储类型: 
          <span className={`ml-2 font-medium ${
            storageType === 'local' ? 'text-green-600 dark:text-green-400' : 
            storageType === 'firebase' ? 'text-orange-500 dark:text-orange-400' : 
            'text-gray-500'
          }`}>
            {storageType === 'local' && '本地存储 (LocalStorage)'}
            {storageType === 'firebase' && 'Firebase 存储'}
            {storageType === 'unknown' && '未知存储类型'}
            {storageType === 'checking' && '正在检查...'}
          </span>
        </p>
        
        <div className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          {storageType === 'local' && 
            <p>本地存储将数据保存在浏览器中，适合开发和测试。数据可能会被浏览器清除。</p>
          }
          {storageType === 'firebase' && 
            <p>Firebase存储将数据保存在云端，适合生产环境。需要Firebase配置。</p>
          }
          {storageType === 'unknown' && 
            <p>无法确定当前存储类型，请手动检查代码实现。</p>
          }
        </div>
      </div>
      
      <div className="flex flex-wrap gap-3">
        <button
          onClick={handleSwitchToLocal}
          disabled={isLoading || storageType === 'local' || storageType === 'checking'}
          className={`flex items-center px-4 py-2 rounded-md ${
            isLoading || storageType === 'local' || storageType === 'checking'
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700 text-white'
          }`}
        >
          <FaDesktop className="mr-2" /> 切换到本地存储
        </button>
        
        <button
          onClick={handleSwitchToFirebase}
          disabled={isLoading || storageType === 'firebase' || storageType === 'checking'}
          className={`flex items-center px-4 py-2 rounded-md ${
            isLoading || storageType === 'firebase' || storageType === 'checking'
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600 text-white'
          }`}
        >
          <FaFireAlt className="mr-2" /> 切换到Firebase存储
        </button>
        
        <button
          onClick={checkStorageType}
          disabled={isLoading}
          className={`flex items-center px-4 py-2 rounded-md ${
            isLoading 
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          <FaExchangeAlt className="mr-2" /> 刷新状态
        </button>
      </div>
      
      {showMessage && (
        <div className={`mt-4 p-3 rounded-md ${
          message.includes('失败') 
            ? 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200' 
            : 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-200'
        }`}>
          {message}
          {message.includes('刷新页面') && (
            <button 
              onClick={() => window.location.reload()}
              className="ml-2 underline font-medium"
            >
              立即刷新
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default StorageSwitcher; 