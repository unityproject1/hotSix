import {
  doc,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";
import { dbService, authService } from "./firebase.js";
// export let postId = rerenderDetail()
export async function rerenderDetail(postId) {
  // 서버에 postId 값과 같은 데이터 요청
  const q = query(
    collection(dbService, "posts"),
    where("postId", "==", postId)
  );
  let post = [];
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  querySnapshot.forEach((doc) => {
    const postObj = {
      userId: doc.uid,
      ...doc.data(),
    };

    console.log(doc);
    post.push(postObj);
  });
  //   console.log(post);
  // 접속중에있는 userid 와 post 에 저장되있는 작성된 userid 가 같은지 확인하여 isOwner 변수에 저장
  const currentUid = authService.currentUser.uid;
  const isOwner = currentUid === post[0].userId;
  console.log(isOwner, currentUid, post[0].userId);

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
            <div class="dummy-box">
            <div class="${
              isOwner ? "user-btn-grop" : "user-btn-grop btn-hide"
            }">
            <button id="modalButtonModify" class="modal-btn update-btn" type="button" onclick="modalModify()">
            수정
            </button>
            <button id="modalModify-completed" class="modal-btn" onclick="modalModifyClose()" type=" button">
            수정완료
            </button>
            <button id="modalButtonDelete" class="modal-btn" type="button" onclick="modalDelete(event)">
            삭제
            </button>
            </div>
            </div>
            </div>
          <div class="modal-container">
            <div class="form__group field">
              <input type="input" id="modalTitleInput" class="form__field" name="title" placeholder="title" required />
              <label for="" class="form__label">제목</label>
            </div>
            <h4 id="modalTitle">${post[0].title}</h4>
            <time id="modalDate">${new Date(post[0].time)
              .toISOString()
              .toString()
              .slice(0, 10)}</time>

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
                <textarea id="subtitleText"></textarea>
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
  //   return postId;
  // console.log(postId);
}
