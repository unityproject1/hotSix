export function modalModify() {
  $(`#modalModify-completed`).show();
  $(`#modalDate`).show();
  let modifiedTitle = $(`#modalTitle`).text();
  let modifiedContent = $(`.modalContent`).text();
  console.log(modifiedContent);
  $(`#modalButtonModify`).hide();
  $(`#modalTitle`).hide();
  $(`.modalContent`).hide();
  $(`#modalDate`).hide();
  //타이틀 변경 요소 숨기기
  $(`.form__group`).show();

  $(`#contentTextarea`).show();
  $(`#modalTitleInput`).attr("value", `${modifiedTitle}`);
  $(`#contentTextarea`).val(modifiedContent);
}

export function modalModifyClose() {
  $(`#modalModify-completed`).hide();
  $(`#modalDate`).show();
  let modifiedTitle = $(`#modalTitleInput`).val();
  let modifiedContent = $(`#contentTextarea`).val();
  console.log(modifiedContent);
  $(`#modalButtonModify`).show();
  $(`#contentTextarea`).hide();

  // 타이틀 변경
  $(`.form__group`).hide();

  $(`#modalTitle`).text(modifiedTitle);
  $(`.modalContent`).text(modifiedContent);
  $(`#modalTitle`).show();
  $(`.modalContent`).show();
}

export function modalup() {
  console.log("hi");
  document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;
      `;
  $(`.modalFirstBlack`).css(`top`, "0vh");
}

export function modaldown() {
  const scrollY = document.body.style.top;
  document.body.style.cssText = ``;
  window.scrollTo(0, parseInt(scrollY) * -1);
  $(`.modalFirstBlack`).css(`top`, `100vh`);
}
isupdate = t
export const modalFileChange = (event) => {
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
