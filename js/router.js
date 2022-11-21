/**
 * @todo detail은 append 형식 라우팅.
 * @see https://github.com/rjc1704/Firebase-Lecture-by-Vanilla-JS/blob/master/js/router.js
 */

export const route = (event) => {
  event.preventDefault();
  window.location.hash = event.target.hash;
};

/**
 * @todo detail 페이지 라우팅 추가
 */
const routes = {
  "/": "/pages/home.html",
  myPage: "/pages/profile.html",
  login: "/pages/login-modal.html",
  404: "/pages/404.html",
};

export const handleLocation = async () => {
  let path = window.location.hash.replace("#", ""); // ""

  // "http://example.com/"가 아니라 도메인 뒤에 / 없이 "http://example.com" 으로 나오는 경우
  if (path.length == 0) {
    path = "/";
  }

  const route = routes[path] || routes[404]; // truthy 하면 route[path], falsy 하면 routes[404]
  const html = await fetch(route).then((data) => data.text());
  console.log(html);
  document.querySelector(".content-container").innerHTML = html;
};
