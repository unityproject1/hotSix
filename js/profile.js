/**
 * 필요하면 다른 모듈로 분할하기
 * @see https://github.com/rjc1704/Firebase-Lecture-by-Vanilla-JS/blob/master/js/pages/profile.js
 */
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

  // const theFile
};
