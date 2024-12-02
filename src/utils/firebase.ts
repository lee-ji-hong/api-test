import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBgT-51qFDZesgRgc8De0w0DCP3QdFU8OM",
  authDomain: "myzipplan-af832.firebaseapp.com",
  projectId: "myzipplan-af832",
  storageBucket: "myzipplan-af832.firebasestorage.app",
  messagingSenderId: "165937643454",
  appId: "1:165937643454:web:191a4ec58b4cf8296ac3ef",
  measurementId: "G-88Y0YMDJE1",
};

// Firebase 초기화
const firebaseApp = initializeApp(firebaseConfig);

// Firebase Analytics 초기화
const analytics = getAnalytics(firebaseApp);

export { firebaseApp, analytics };
