/**
 * 存储切换工具
 * 该工具用于在本地存储（localStorage）和Firebase存储之间切换
 */

import { promises as fs } from 'fs';
import path from 'path';

/**
 * 切换到Firebase存储
 * 将当前的postService.js备份为postService.js.local
 * 并将postService.js.firebase重命名为postService.js
 */
export async function switchToFirebase() {
  try {
    // 获取当前工作目录
    const servicesDir = path.resolve(process.cwd(), 'src/services');
    
    // 检查文件是否存在
    const postServicePath = path.join(servicesDir, 'postService.js');
    const firebaseServicePath = path.join(servicesDir, 'postService.js.firebase');
    
    // 检查Firebase版本是否存在
    const firebaseExists = await fileExists(firebaseServicePath);
    if (!firebaseExists) {
      throw new Error('Firebase实现版本不存在: postService.js.firebase');
    }
    
    // 备份当前的本地存储版本
    await fs.rename(postServicePath, path.join(servicesDir, 'postService.js.local'));
    console.log('✓ 已将本地存储实现备份为: postService.js.local');
    
    // 复制Firebase版本为当前使用的版本
    await fs.copyFile(firebaseServicePath, postServicePath);
    console.log('✓ 已切换到Firebase实现');
    
    return { success: true, message: '已成功切换到Firebase存储实现' };
  } catch (error) {
    console.error('切换存储失败:', error);
    return { success: false, message: `切换失败: ${error.message}` };
  }
}

/**
 * 切换到本地存储
 * 将当前的postService.js备份为postService.js.firebase
 * 并将postService.js.local重命名为postService.js
 */
export async function switchToLocal() {
  try {
    // 获取当前工作目录
    const servicesDir = path.resolve(process.cwd(), 'src/services');
    
    // 检查文件是否存在
    const postServicePath = path.join(servicesDir, 'postService.js');
    const localServicePath = path.join(servicesDir, 'postService.js.local');
    
    // 检查本地版本是否存在
    const localExists = await fileExists(localServicePath);
    if (!localExists) {
      throw new Error('本地存储实现版本不存在: postService.js.local');
    }
    
    // 备份当前的Firebase版本
    await fs.rename(postServicePath, path.join(servicesDir, 'postService.js.firebase'));
    console.log('✓ 已将Firebase实现备份为: postService.js.firebase');
    
    // 复制本地存储版本为当前使用的版本
    await fs.copyFile(localServicePath, postServicePath);
    console.log('✓ 已切换到本地存储实现');
    
    return { success: true, message: '已成功切换到本地存储实现' };
  } catch (error) {
    console.error('切换存储失败:', error);
    return { success: false, message: `切换失败: ${error.message}` };
  }
}

/**
 * 获取当前存储状态
 * @returns {'local'|'firebase'|'unknown'} 当前使用的存储类型
 */
export async function getCurrentStorageType() {
  try {
    // 获取当前工作目录
    const servicesDir = path.resolve(process.cwd(), 'src/services');
    const postServicePath = path.join(servicesDir, 'postService.js');
    
    // 读取文件内容并检查关键特征
    const content = await fs.readFile(postServicePath, 'utf8');
    
    if (content.includes('localStorage.getItem') && content.includes('localStorage.setItem')) {
      return 'local';
    } else if (content.includes('firebase') && content.includes('Firestore')) {
      return 'firebase';
    }
    
    return 'unknown';
  } catch (error) {
    console.error('获取存储类型失败:', error);
    return 'unknown';
  }
}

/**
 * 备份数据
 * 将本地存储中的数据导出到JSON文件
 */
export async function backupData() {
  try {
    // 获取当前存储类型
    const storageType = await getCurrentStorageType();
    
    if (storageType === 'local') {
      console.log('当前使用本地存储，请使用浏览器中的导出功能进行备份');
      return { success: false, message: '使用浏览器中的导出功能进行备份' };
    } else if (storageType === 'firebase') {
      console.log('当前使用Firebase存储，请使用Firebase控制台进行备份');
      return { success: false, message: '使用Firebase控制台进行备份' };
    }
    
    return { success: false, message: '无法确定当前存储类型' };
  } catch (error) {
    console.error('备份数据失败:', error);
    return { success: false, message: `备份失败: ${error.message}` };
  }
}

/**
 * 辅助函数：检查文件是否存在
 */
async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

// CLI命令行工具
if (typeof require !== 'undefined' && require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0];
  
  (async () => {
    switch (command) {
      case 'firebase':
        console.log('正在切换到Firebase存储...');
        const fbResult = await switchToFirebase();
        console.log(fbResult.message);
        break;
      case 'local':
        console.log('正在切换到本地存储...');
        const localResult = await switchToLocal();
        console.log(localResult.message);
        break;
      case 'status':
        console.log('正在检查当前存储类型...');
        const type = await getCurrentStorageType();
        console.log(`当前使用的是: ${type}存储`);
        break;
      default:
        console.log(`
存储切换工具
用法:
  node switchStorage.js [命令]

命令:
  firebase   切换到Firebase存储实现
  local      切换到本地存储实现
  status     查看当前使用的存储类型
        `);
    }
  })();
}

export default {
  switchToFirebase,
  switchToLocal,
  getCurrentStorageType,
  backupData
}; 