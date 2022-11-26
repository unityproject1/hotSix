/**
 * 미완성
 * 이 모듈은 사용자의 행동을 DB에 저장합니다.
 * @see https://github.com/rjc1704/Firebase-Lecture-by-Vanilla-JS/blob/master/js/pages/fanLog.js
 *
 * CRUD 관련 파이어 베이스 공식문서
 * @see https://firebase.google.com/docs/firestore/quickstart?hl=en&authuser=0
 */
import {
  doc,
  addDoc,
  updateDoc,
  deleteDoc,
  collection,
  orderBy,
  query,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore.js";

import { dbService, authService } from "./firebase.js";
import { v4 as uuidv4 } from "https://jspm.dev/uuid";

// 추가
export const save_comment = async (event) => {
  // event.preventDefault();

  const postTitle = document.getElementById("postTitle");
  const postsubTitle = document.getElementById("postsubTitle");
  const postImg = document.getElementById("modalPicture");
  const postDesc = document.getElementById("postDesc");

  // uid = 유저식별할수있는 아이디값
  const { uid } = authService.currentUser;
  try {
    await addDoc(collection(dbService, "posts"), {
      time: Date.now(),
      postId: uuidv4(),
      userId: uid,
      title: postTitle.value,
      subTitle: postsubTitle.value,
      desc: postDesc.value,
      img: postImg.src,
    });
    //뒤로 가기
    goBack();
  } catch (error) {
    alert(error);
    console.log("error in addDoc:", error);
  }
};

// export const onEditing = (event) => {
//   // 수정버튼 클릭
//   event.preventDefault();
//   const udBtns = document.querySelectorAll(".editBtn, .deleteBtn");
//   udBtns.forEach((udBtn) => (udBtn.disabled = "true"));

//   const cardBody = event.target.parentNode.parentNode;
//   const commentText = cardBody.children[0].children[0];
//   const commentInputP = cardBody.children[0].children[1];

//   commentText.classList.add("noDisplay");
//   commentInputP.classList.add("d-flex");
//   commentInputP.classList.remove("noDisplay");
//   commentInputP.children[0].focus();
// };

// 수정
export const update_comment = async (event) => {
  event.preventDefault();
  const newComment = event.target.parentNode.children[0].value;
  const id = event.target.parentNode.id;

  const parentNode = event.target.parentNode.parentNode;
  const commentText = parentNode.children[0];
  commentText.classList.remove("noDisplay");
  const commentInputP = parentNode.children[1];
  commentInputP.classList.remove("d-flex");
  commentInputP.classList.add("noDisplay");

  const commentRef = doc(dbService, "comments", id);
  try {
    await updateDoc(commentRef, { text: newComment });
    getCommentList();
  } catch (error) {
    alert(error);
  }
};

// 삭제
export const delete_comment = async (event) => {
  event.preventDefault();
  const id = event.target.name;
  const ok = window.confirm("해당 응원글을 정말 삭제하시겠습니까?");
  if (ok) {
    try {
      await deleteDoc(doc(dbService, "comments", id));
      getCommentList();
    } catch (error) {
      alert(error);
    }
  }
};

// 2. 가져오기
export const getCommentList = async () => {
  let postList = [];
  const q = query(
    collection(dbService, "posts"),
    orderBy("time", "desc", "img", "title", "userId", "subTitle", "postId")
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    const postObj = {
      userId: doc.userId,
      ...doc.data(),
    };

    postList.push(postObj);
    // 내림차순으로 코드작성
  });
  const contentList = document.getElementById("content-list");
  // const currentUid = authService.currentUser.uid;
  contentList.innerHTML = "";
  postList.forEach((postObj) => {
    // const isOwner = currentUid === postObj.id;
    const temp_html = `
    <div class="card-container" href="#detail" onclick="modalup(event)" id ="${
      postObj.userId
    }">
  <div class="content-box" id ="${postObj.postId}">
    <img
      class="content-img"
      src="${postObj.img}"
      alt="멸종위기동물사이트"
    />
    <span>인터렉티브 사이트</span>
    <h4>${postObj.title}</h4>
    <p>${postObj.subTitle}</p>
    <time class="time">
      ${new Date(postObj.time).toString().slice(0, 25)}
    </time>
  </div>
</div>
`;
    const div = document.createElement("div");
    div.innerHTML = temp_html;
    contentList.appendChild(div);
    // gotoHome();
  });
};

// `<div class="card commentCard">
//             <div class="card-body">
//                 <blockquote class="blockquote mb-0">
//                     <p class="commentText">${postObj.text}</p>
//                     <p id="${
//                       postObj.id
//                     }" class="noDisplay"><input class="newCmtInput" type="text" maxlength="30" /><button class="updateBtn" onclick="update_comment(event)">완료</button></p>
//                     <footer class="quote-footer"><div>BY&nbsp;&nbsp;<img class="cmtImg" width="50px" height="50px" src="${
//                       postObj.profileImg
//                     }" alt="profileImg" /><span>${
//   postObj.nickname ?? "닉네임 없음"
// }</span></div><div class="cmtAt"></div></footer>
//                 </blockquote>
//                 <div class="${isOwner ? "updateBtns" : "noDisplay"}">
//                      <button onclick="onEditing(event)" class="editBtn btn btn-dark">수정</button>
//                   <button name="${
//                     postObj.id
//                   }" onclick="delete_comment(event)" class="deleteBtn btn btn-dark">삭제</button>
//                 </div>
//               </div>
//        </div>`;

function goBack() {
  window.history.go(-1);
}
