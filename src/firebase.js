// Firebase配置
import { initializeApp } from "firebase/app";
import { getFirestore, collection, doc, setDoc, deleteDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Firebase配置
// 注意: 请用您自己的Firebase项目配置替换以下内容
// 您可以从Firebase控制台 -> 项目设置 -> 您的应用 -> Firebase SDK snippet -> 配置 获取这些值
const firebaseConfig = {
  apiKey: "AIzaSyCYY18DOwKsWN9l7p3rreMi6puKm7phKMc",
  authDomain: "brulog-669ec.firebaseapp.com",
  projectId: "brulog-669ec",
  storageBucket: "brulog-669ec.firebasestorage.app",
  messagingSenderId: "149253914879",
  appId: "1:149253914879:web:8d83f4c4f8cc77ab0bccca",
  measurementId: "G-EQG76X7CKN"
};

// 初始化Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);
const analytics = getAnalytics(app);

// 提供一个检查Firebase连接的函数
export const checkFirebaseConnection = async () => {
  try {
    // 尝试连接到Firestore，使用v9 API
    const testCollection = collection(db, '_connection_test');
    const testDoc = doc(testCollection, 'test');
    await setDoc(testDoc, { timestamp: new Date() });
    await deleteDoc(testDoc);
    return { success: true, message: 'Firebase连接成功' };
  } catch (error) {
    console.error('Firebase连接测试失败:', error);
    return { success: false, message: `Firebase连接失败: ${error.message}` };
  }
};

export { db, auth, storage, analytics }; 