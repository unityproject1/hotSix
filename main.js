"asdf";

const test = () => {};

/**
 * @see https://github.com/rjc1704/Firebase-Lecture-by-Vanilla-JS/blob/master/js/main.js
 */
// import { changeProfile, onFileChange } from "./pages/profile.js";

/**
 * 필요하면 다른 모듈로 분할하기
 * @see https://github.com/rjc1704/Firebase-Lecture-by-Vanilla-JS/blob/master/js/pages/profile.js
 */
const onFileChange = (event) => {
  const uploadedFile = event.target.files[0];

  /** @see https://developer.mozilla.org/ko/docs/Web/API/FileReader */
  const reader = new FileReader();
  reader.readAsDataURL(uploadedFile);
  reader.onload = (finishedEvent) => {
    const imgDataUrl = finishedEvent.currentTarget.result;
    localStorage.setItem("imgDataUrl", imgDataUrl);
    document.getElementById("Profile-img").src = imgDataUrl;
  };

  // const theFile
};

window.onFileChange = onFileChange;
