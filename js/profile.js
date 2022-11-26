/**
 * @todo 서버에서 프로필 이미지 가져오기
 * @todo 서버에서 프로필 이미지 보내기
 * @see https://github.com/rjc1704/Firebase-Lecture-by-Vanilla-JS/blob/master/js/pages/profile.js
 *
 * photoURL을 유저에게서 얻어와 활용합니다.
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
  /**
   * 반복 제출을 막기 위해서 disabled시킵니다.
   *
   * @todo 아래의 내역은 나중에 진행합니다.
   * 더 좋은 사용자 경험을 위해서는 3초만 비활성화를 합니다.
   * 비활성화 되어 있는 동안 버튼은 회색으로 변형합니다.
   * 변형이 가능해질 때 본래 색으로 돌아옵니다.
   */
  $("#submit-btn").disabled = true;
  // 첫번째 인자는 사용할 서비스의 주체를 알아내기 위해 넣어줘야 합니다.
  const imgRef = ref(
    storageService, // ref함수는 storageService를 첫번째 인자로 받아야 합니다.
    `${authService.currentUser.uid}/${uuidv4()}` // 파일 이름의 형식으로 업로드할 수 있습니다. 유저명을 폴더이름으로 지정합니다. 폴더에 넣을 이미지 이름은 uuidv4 해쉬 값을 활용합니다.
  );
  const profileName = $("#profile-name").value;
  // 프로필 이미지 dataUrl을 Storage에 업로드 후 다운로드 링크를 받아서 photoURL에 저장.
  const imgDataUrl = localStorage.getItem("imgDataUrl");
  /** 외부 스코프에 두어서 참조값을 업데이트합니다. DB에 해당하는 이미지가 있으면 string 없으면 undefined가 됩니다. */
  let downloadUrl = null;
  if (imgDataUrl) {
    const response = await uploadString(imgRef, imgDataUrl, "data_url"); // https://firebase.google.com/docs/storage/web/upload-files?hl=en&authuser=0#upload_from_a_string
    downloadUrl = await getDownloadURL(response.ref); // https://firebase.google.com/docs/reference/js/v8/firebase.storage.Reference#getdownloadurl
  }
  await updateProfile(authService.currentUser, {
    displayName: profileName ? profileName : null,
    photoURL: downloadUrl ? downloadUrl : null,
  })
    .then(() => {
      alert("프로필 수정 완료");
      window.location.hash = "";
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
