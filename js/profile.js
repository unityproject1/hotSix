/**
 * @todo 서버에서 프로필 이미지 가져오기
 * @todo 서버에서 프로필 이미지 보내기
 * @see https://github.com/rjc1704/Firebase-Lecture-by-Vanilla-JS/blob/master/js/pages/profile.js
 */

// import { authService, storageService } from "./firebase.js";
// import {
//   ref,
//   uploadString,
//   getDownloadURL,
// } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
// import { updateProfile } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
// import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export const onFileChange = (event) => {
  const uploadedFile = event.target.files[0];

  /** @see https://developer.mozilla.org/ko/docs/Web/API/FileReader */
  const reader = new FileReader();
  reader.readAsDataURL(uploadedFile);
  reader.onload = (finishedEvent) => {
    const imgDataUrl = finishedEvent.currentTarget.result;
    localStorage.setItem("imgDataUrl", imgDataUrl);
    document.getElementById("Profile-img").src = imgDataUrl;
  };
};
