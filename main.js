/**
 * SPA 개발 진행 개념
 * @see https://poiemaweb.com/js-spa
 * @see https://github.com/rjc1704/Firebase-Lecture-by-Vanilla-JS/blob/master/js/main.js
 */

import { onFileChange } from "./js/profile.js";
import { handleLocation, route } from "./js/router.js";

window.addEventListener("hashchange", handleLocation); // hash url 변경 시 처리

document.addEventListener("DOMContentLoaded", handleLocation); // 첫 랜딩 또는 새로고침 시 처리

// 전역 함수 리스트
window.route = route;
window.onFileChange = onFileChange;

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
