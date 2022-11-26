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
import { route } from "./router.js";
import { getCommentList } from "./loging.js";
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
      // subtitle : 
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
let postRef = null;
export async function modalDelete() {
  // event.preventDefault();
  const q = query(
    collection(dbService, "posts"),
    where("postId", "==", postId)
  );
  let post = "";
  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    post = doc;
  });
  postRef = post.ref;

  // 삭제하기 버튼을 클릭시 발생하는 로직
  // const ok = window.confirm("해당 응원글을 정말 삭제하시겠습니까?");
  // if (ok) {
  //   try {
  //     await deleteDoc(postRef);
  //     goBack();
  //   } catch (error) {
  //     alert(error);
  //   }
  // }
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

// 삭제 확인 모달
$(function () {
  //사용 예시 **************************
  $(document).on("click", "#modalButtonDelete", function (event) {
    action_popup.confirm("삭제하시겠습니까?", async function (res) {
      if (res) {
        try {
          console.log(res, postRef);
          await deleteDoc(postRef);
          modaldown();
          window.location.hash = "";
          getCommentList();
        } catch (error) {
          // alert(error);
          console.log(error);
        }
      }
    });
  });

  $(document).on("click", "#modal_close", function () {
    action_popup.close(this);
  });
  //사용 예시 **************************
});

/**
 *  alert, confirm 대용 팝업 메소드 정의
 *  timer : 애니메이션 동작 속도
 *  alert : 경고창
 *  confirm : 확인창
 *  open : 팝업 열기
 *  close : 팝업 닫기
 */
var action_popup = {
  timer: 70,
  confirm: function (txt, callback) {
    if (txt == null || txt.trim() == "") {
      console.warn("confirm message is empty.");
      return;
    } else if (callback == null || typeof callback != "function") {
      console.warn("callback is null or not function.");
      return;
    } else {
      $(".type-confirm .btn_ok").on("click", function () {
        $(this).unbind("click");
        callback(true);
        action_popup.close(this);
      });
      this.open("type-confirm", txt);
    }
  },

  alert: function (txt) {
    if (txt == null || txt.trim() == "") {
      console.warn("confirm message is empty.");
      return;
    } else {
      this.open("type-alert", txt);
    }
  },

  open: function (type, txt) {
    var popup = $("." + type);
    popup.find(".menu_msg").text(txt);
    $(".modalFirstBlack").append("<div class='dimLayer'></div>");
    $(".dimLayer").css("height", $(document).height()).attr("target", type);
    popup.fadeIn(this.timer);
  },

  close: function (target) {
    var modal = $(target).closest("#modal-section");
    var dimLayer;
    if (modal.hasClass("type-confirm")) {
      dimLayer = $(".dimLayer[target=type-confirm]");
      $(".type-confirm .btn_ok").unbind("click");
    } else if (modal.hasClass("type-alert")) {
      dimLayer = $(".dimLayer[target=type-alert]");
    } else {
      console.warn("close unknown target.");
      return;
    }
    modal.fadeOut(this.timer);
    setTimeout(function () {
      dimLayer != null ? dimLayer.remove() : "";
    }, this.timer);
  },
};
