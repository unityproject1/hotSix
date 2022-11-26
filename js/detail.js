import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  deleteDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService } from "./firebase.js";
import { rerenderDetail } from "./datailRerender.js";
import { goBack } from "./loging.js";
// 포스트아이디 전역변수 지정
let postId;

// 수정버튼
export function modalModify() {
  $(`#modalModify-completed`).show();
  $(`#modalDate`).show();
  let modifiedTitle = $(`#modalTitle`).text();
  let subTitle = $(`.dsc1 `).text();
  let desc = $(`.dsc2`).text();

  console.log(subTitle, desc);
  $(`#modalButtonModify`).hide();
  $(`#modalTitle`).hide();
  $(`.modalContent`).hide();
  $(`#modalDate`).hide();
  $(`#uplord`).show();
  $(".img-container").css("pointer-events", "auto");
  //타이틀 변경 요소 보이기
  $(`.form__group`).show();
  // 내용 변경 요소 보이기
  $(`.text__grop`).css("display", "flex");

  $(`#modalTitleInput`).attr("value", `${modifiedTitle}`);
  $(`#subtitleText`).val(subTitle);
  $(`#contentTextarea`).val(desc);
}
// 수정완료
export async function modalModifyClose() {
  $(`#modalModify-completed`).hide();
  $(`#modalDate`).show();
  let modifiedTitle = $(`#modalTitleInput`).val();
  let modifiedContent = $(`#contentTextarea`).val();
  // console.log(modifiedContent);
  $(`#modalButtonModify`).show();

  $(".img-container").css("pointer-events", "none");

  // 내용 변경 숨기기
  $(`.text__grop`).hide();
  // 타이틀 변경 숨기기
  $(`.form__group`).hide();

  const q = query(
    collection(dbService, "posts"),
    where("postId", "==", postId)
  );
  let post = "";
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    post = doc;
  });
  console.log(post);
  const postRef = post.ref;

  try {
    await updateDoc(postRef, {
      title: modifiedTitle,
      desc: modifiedContent,
    });
  } catch (error) {
    console.log(error);
  }

  // $(`#modalTitle`).text(modifiedTitle);
  // $(`.modalContent`).text(modifiedContent);
  rerenderDetail(postId);
  $(`#modalTitle`).show();
  $(`.modalContent`).show();
}
//모달 열기
export async function modalup(event) {
  document.body.style.cssText = `
  position: fixed; 
  top: -${window.scrollY}px;
  overflow-y: scroll;
  width: 100%;
  `;
  $(`.modalFirstBlack`).css(`top`, "0vh");
  $(`.modalFirstBlack`).addClass("visible");
  $(`.modalFirstBlack`).removeClass("hide");
  event.path.forEach((element) => {
    if (element.className === "content-box") {
      postId = element.id;
    }
  });
  rerenderDetail(postId);
}
// 모달 닫기
export function modaldown() {
  const scrollY = document.body.style.top;
  document.body.style.cssText = ``;
  window.scrollTo(0, parseInt(scrollY) * -1);
  $(`.modalFirstBlack`).css(`top`, `100vh`);

  // $(`.modalFirstBlack`).addClass("hide");
  // $(`.modalFirstBlack`).removeClass("visible");
}
// 모달내에서 페이지 삭제
export async function modalDelete(event) {
  event.preventDefault();
  const q = query(
    collection(dbService, "posts"),
    where("postId", "==", postId)
  );
  let post = "";
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    post = doc;
  });
  console.log(post);
  const postRef = post.ref;

  const ok = window.confirm("해당 응원글을 정말 삭제하시겠습니까?");
  if (ok) {
    try {
      await deleteDoc(postRef);
      goBack();
    } catch (error) {
      alert(error);
    }
  }
}

export const modalFileChange = (event) => {
  const uploadedFile = event.target.files[0];
  /** @see https://developer.mozilla.org/ko/docs/Web/API/FileReader */
  const reader = new FileReader();
  reader.readAsDataURL(uploadedFile);
  reader.onload = (finishedEvent) => {
    const imgDataUrl = finishedEvent.currentTarget.result;
    localStorage.setItem("imgDataUrl2", imgDataUrl);
    document.getElementById("modalPicture").src = imgDataUrl;
  };
};
