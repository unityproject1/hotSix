/**
 * @see https://github.com/rjc1704/Firebase-Lecture-by-Vanilla-JS/blob/master/js/router.js
 */

import { $ } from "./util.js";
import { authService } from "./firebase.js";

export const route = (event) => {
  event.preventDefault();
  window.location.hash = event.target.hash;
};

const routes = {
  "/": "/pages/home.html",
  myPage: "/pages/profile.html",
  detail: "/pages/detail.html",
  404: "/pages/404.html",
};

export const handleLocation = async () => {
  let path = window.location.hash.replace("#", ""); // ""

  // "http://example.com/"가 아니라 도메인 뒤에 / 없이 "http://example.com" 으로 나오는 경우
  if (path.length == 0) {
    path = "/";
  }
  // const route = routes.detail;
  const route = routes[path] || routes[404]; // truthy 하면 route[path], falsy 하면 routes[404]
  const html = await fetch(route).then((data) => data.text());
  $(".content-container").innerHTML = html;

  // myPage로 이동했을 때 DOM을 업데이트합니다.
  if (path === "myPage") {
    // console.log(path); // 거짓도 실행하는 기적의 조건문 실행을 막기 위해 존재하는 console.log입니다.
    authService.onAuthStateChanged((user) => {
      // user === authService.currentUser 와 같은 값을 갖습니다. 그리고 firebase는 이 방식을 권장합니다.
      if (user) {
        // 로그아웃하면 아래 조건문이 실행되고 에러메시지가 발생합니다. 그래서 조건문에 감쌌습니다.
        $("#Profile-img").src =
          user.photoURL ?? `../static/images/blank-profile-picture-973460.svg`;
        $("#profile-name").value = user.displayName ?? ``;
      }
    });
  }
};
