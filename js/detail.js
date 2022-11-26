import {
  collection,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import { dbService } from "./firebase.js";
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
  $(`#uplord`).show();
  $(".img-container").css("pointer-events", "auto");
  //타이틀 변경 요소 보이기
  $(`.form__group`).show();
  // 내용 변경 요소 보이기
  $(`.text__grop`).show();

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

  $(".img-container").css("pointer-events", "none");

  // 내용 변경 숨기기
  $(`.text__grop`).hide();
  // 타이틀 변경 숨기기
  $(`.form__group`).hide();
  $(`#modalTitle`).text(modifiedTitle);
  $(`.modalContent`).text(modifiedContent);
  $(`#modalTitle`).show();
  $(`.modalContent`).show();
}

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
  let postId = "";
  event.path.forEach((element) => {
    if (element.className === "content-box") {
      postId = element.id;
    }
  });
  const q = query(
    collection(dbService, "posts"),
    where("postId", "==", postId)
  );
  let post = [];
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const postObj = {
      userId: doc.userId,
      ...doc.data(),
    };
    post.push(postObj);
    console.log(post);
  });

  const postContent = document.querySelector(".modalFirstBlack");
  postContent.innerHTML = "";

  const temp_postHtml = `
  <div class="modal-side" onclick="modaldown()">
        <span onclick="modaldown()" class="material-symbols-outlined modalButtonClose">
          close
        </span>
      </div>
      <div class="modalSecondWhite">
        <div class="modalFlex">
          <div class="modalGrid">
            <div class="dummy-box"></div>
            <button id="modalButtonModify" class="modal-btn update-btn" type="button" onclick="modalModify()">
              수정하기
            </button>
            <button id="modalModify-completed" class="modal-btn" onclick="modalModifyClose()" type=" button">
              수정완료
            </button>
            <button id="modalButtonDelete" class="modal-btn" type="button">
              삭제
            </button>
          </div>
          <div class="modal-container">
            <div class="form__group field">
              <input type="input" id="modalTitleInput" class="form__field" name="title" placeholder="title" required />
              <label for="" class="form__label">제목</label>
            </div>
            <h4 id="modalTitle">${post[0].title}</h4>
            <time id="modalDate">${new Date(post[0].time)
              .toString()
              .slice(0, 25)}</time>

            <div class="img-container" style="pointer-events: none;">
              <form id="uplord" onsubmit="">
                <!-- https://github.com/rjc1704/Firebase-Lecture-by-Vanilla-JS/blob/master/pages/profile.html -->
                <label for="img-input">
                  <img id="modalPicture" src="${
                    post[0].img
                  }" alt="content-img" />
                  <input onchange="modalFileChange(event)" id="img-input" type="file" accept="images/*" />
                </label>
              </form>

            </div>
            <div class="content-dsc">
              <p class="modalContent dsc1">
                ${post[0].subTitle}
              </p>
              <p class="modalContent dsc2">
                ${post[0].desc}
              </p>
              <div class="text__grop">
                <label for="content-label">내용</label>
                <textarea id="contentTextarea"></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
  `;
  const div = document.createElement("div");
  div.innerHTML = temp_postHtml;
  postContent.appendChild(div);

  console.log(postId);
}

export function modaldown() {
  const scrollY = document.body.style.top;
  document.body.style.cssText = ``;
  window.scrollTo(0, parseInt(scrollY) * -1);
  $(`.modalFirstBlack`).css(`top`, `100vh`);

  // $(`.modalFirstBlack`).addClass("hide");
  // $(`.modalFirstBlack`).removeClass("visible");
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
