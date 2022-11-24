/**
 * @todo 화면정지 버그 해결하기
 * @todo 서버에서 프로필 이미지 가져오기
 * @todo 서버에서 프로필 이미지 보내기
 * @see https://github.com/rjc1704/Firebase-Lecture-by-Vanilla-JS/blob/master/js/pages/profile.js
 *
 * 파이어 베이스 storage 공식 문서
 * @see https://firebase.google.com/docs/storage/web/upload-files?hl=en&authuser=0
 */

import { $ } from "./util.js";
import { authService, storageService } from "./firebase.js";
import {
  ref,
  uploadString,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-storage.js";
import { updateProfile } from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

export const changeProfile = async (event) => {
  event.preventDefault();
  $("#submit-btn").disabled = true;
  const imgRef = ref(
    storageService, // ref함수는 storageService를 첫번째 인자로 받아야 합니다.
    `${authService.currentUser.uid}/${uuidv4()}` // 파일 이름의 형식으로 업로드할 수 있습니다. 유저의 고유한 id랑 임의의 이미지에 지정해줄 해쉬값을 서버로 송신합니다.
  );
  const profileName = $("#profile-name").value;
  // 프로필 이미지 dataUrl을 Storage에 업로드 후 다운로드 링크를 받아서 photoURL에 저장.
  const imgDataUrl = localStorage.getItem("imgDataUrl");
  /** 외부 스코프에 두어서 참조값을 업데이트합니다. DB에 해당하는 이미지가 있으면 string 없으면 undefined가 됩니다. */
  let downloadUrl = null;
  if (imgDataUrl) {
    const response = await uploadString(imgRef, imgDataUrl, "data_url"); // https://firebase.google.com/docs/storage/web/upload-files?hl=en&authuser=0#upload_from_a_string
    downloadUrl = await getDownloadURL(response.ref);
  }
  await updateProfile(authService.currentUser, {
    displayName: profileName ? profileName : null,
    photoURL: downloadUrl ? downloadUrl : null,
  })
    .then(() => {
      alert("프로필 수정 완료");
      window.location.hash = "#fanLog";
    })
    .catch((error) => {
      alert("프로필 수정 실패");
      console.log("error:", error);
    });
};

export const onFileChange = async (event) => {
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
