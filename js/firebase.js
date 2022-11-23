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
  apiKey: "AIzaSyD1BvEIkVvOBmcx405Al9scSfIAjRQo2UA",
  authDomain: "elevated-glow-332304.firebaseapp.com",
  projectId: "elevated-glow-332304",
  storageBucket: "elevated-glow-332304.appspot.com",
  messagingSenderId: "330312765599",
  appId: "1:330312765599:web:1c08f8355d3848779912aa",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storageService = getStorage(app);
