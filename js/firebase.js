/**
 * 모듈 완성
 * 어드민 공용 ID입니다.
 * adminID: hotsix-admin@ruu.kr
 * adminPW: 123!@#asd
 * @see https://github.com/unityproject1/hotSix/wiki
 *
 * 구현관련해서는 아래 링크를 참조하기 바랍니다.
 * @see https://github.com/rjc1704/Firebase-Lecture-by-Vanilla-JS/blob/master/js/firebase.js
 */

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";

/**
 * 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
 * @see https://console.firebase.google.com/project/elevated-glow-332304/settings/general/web:Njc0MmI1NDYtMGNhNS00NTZhLWEzMzctZjgxMDcxMjEwMDdh
 */
const firebaseConfig = {
  apiKey: "AIzaSyBZMpefYHVqPxcHA-oqjRCiwKyDGUUqSMA",
  authDomain: "test-a9c68.firebaseapp.com",
  projectId: "test-a9c68",
  storageBucket: "test-a9c68.appspot.com",
  messagingSenderId: "1075807377391",
  appId: "1:1075807377391:web:7337ec3a7e7b96f88a081a",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
