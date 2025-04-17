// Firebase配置
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// 您的Firebase配置
// 从Firebase控制台获取的实际配置
const firebaseConfig = {
  apiKey: "您从Firebase控制台获取的apiKey",
  authDomain: "您的项目ID.firebaseapp.com",
  projectId: "您的项目ID",
  storageBucket: "您的项目ID.appspot.com",
  messagingSenderId: "您的messagingSenderId",
  appId: "您的appId"
};

// 初始化Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage }; 