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

  if (path === "myPage") {
    authService.onAuthStateChanged((user) => {
      // user === authService.currentUser 와 같은 값을 갖습니다. 그리고 firebase는 이 방식을 권장합니다.
      if (user) {
        // 로그인 상태인 경우
        $("#Profile-img").src =
          user.photoURL ?? `../static/images/blank-profile-picture-973460.svg`;
        $("#profile-name").value = user.displayName ?? ``;
      } else {
        // 로그아웃 상태인 경우 홈페이지로 리다이렉팅하기
        window.location.hash = "/";
      }
    });
  }
};
