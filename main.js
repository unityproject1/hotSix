/**
 * SPA 개발 진행 개념
 * @see https://poiemaweb.com/js-spa
 * @see https://github.com/rjc1704/Firebase-Lecture-by-Vanilla-JS/blob/master/js/main.js
 */
import { authService } from "./js/firebase.js";
import { handleLocation, route, gotoPage } from "./js/router.js";
import { onFileChange, changeProfile } from "./js/profile.js";
import {
  openPopupLogin,
  closePopup,
  switchPopupSignup,
  handleAuth,
  logout,
  socialLogin,
} from "./js/auth.js";
import {
  modalModify,
  modalModifyClose,
  modalup,
  modaldown,
  modalFileChange,
} from "./js/detail.js";
import {
  save_comment,
  // update_comment,
  // onEditing,
  // delete_comment,
} from "./js/loging.js";
window.addEventListener("hashchange", handleLocation); // hash url 변경 시 처리
document.addEventListener("DOMContentLoaded", handleLocation); // 첫 랜딩 또는 새로고침 시 처리
// 로그인 상태 모니터링
authService.onAuthStateChanged((user) => {
  // user === authService.currentUser 와 같은 값을 갖습니다. 그리고 firebase는 이 방식을 권장합니다.
  if (user) {
    // 로그인 상태인 경우
  } else {
    // 로그아웃 상태인 경우 홈페이지로 리다이렉팅하기
    window.location.hash = "";
  }
});
// 전역 함수 리스트
window.route = route;
// 프로필
window.onFileChange = onFileChange;
window.changeProfile = changeProfile;
// 로그인 & 회원가입
window.handleAuth = handleAuth;
window.socialLogin = socialLogin;
window.logout = logout;
// auth popup
window.openPopupLogin = openPopupLogin;
window.switchPopupSignup = switchPopupSignup;
window.closePopup = closePopup;
window.modalModify = modalModify;
window.modalModifyClose = modalModifyClose;
window.modalup = modalup;
window.modaldown = modaldown;
window.modalFileChange = modalFileChange;
// 포스트 생성 페이지 이동
window.gotoPage = gotoPage;
// CRUD
window.save_comment = save_comment;
// window.update_comment = update_comment;
// window.onEditing = onEditing;
// window.delete_comment = delete_comment;

/**
 * 여기서부터는 스타일링과 관련된 자바스크립만 작성합니다.
 */
const progressBar = () => {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementsByClassName("progress-bar")[0].style.width =
    scrolled + "%";
};
// nav scroll indicator
window.onscroll = function () {
  progressBar();
};
// document.querySelector(".modalFirstBlack").addEventListener("click", (e) => {
//   console.log(e.target);
// });
