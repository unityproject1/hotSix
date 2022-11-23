/**
 * 모듈 미완성
 * @see https://github.com/rjc1704/Firebase-Lecture-by-Vanilla-JS/blob/master/js/pages/auth.js
 */

import { emailRegex, pwRegex, $ } from "./util.js";
import { authService } from "./firebase.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  GithubAuthProvider,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.14.0/firebase-auth.js";

// 로그인 성공 시 팬명록 화면으로 이동
export const handleAuth = (event) => {
  event.preventDefault();
  const email = document.getElementById("login-email");
  const emailVal = email.value;
  const pw = document.getElementById("login-password");
  const pwVal = pw.value;

  // 유효성 검사 진행
  if (!emailVal) {
    // alert("이메일을 입력해 주세요");
    // DOM 조작으로 사용자에게 피드백을 줍시다.
    email.focus();
    return;
  }
  if (!pwVal) {
    // alert("비밀번호를 입력해 주세요");
    pw.focus();
    return;
  }

  const matchedEmail = emailVal.match(emailRegex);
  const matchedPw = pwVal.match(pwRegex);

  if (matchedEmail === null) {
    alert("이메일 형식에 맞게 입력해 주세요");
    email.focus();
    return;
  }
  if (matchedPw === null) {
    alert("비밀번호는 8자리 이상 영문자, 숫자, 특수문자 조합이어야 합니다.");
    pw.focus();
    return;
  }

  // 유효성 검사 통과 후 로그인 또는 회원가입 API 요청
  const authBtnText = document.querySelector("#authBtn").value; // 버튼의 텍스트 상태를 기준으로 로그인 혹은 회원가입을 결정하고 있습니다.
  // 제출버튼의 value를 기준으로 선택할 수 있어야 합니다.
  if (authBtnText === "로그인") {
    // 유효성검사 후 로그인 성공 시 팬명록 화면으로

    signInWithEmailAndPassword(authService, emailVal, pwVal)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        closePopup(); // 라우트 위치는 그대로 두고 modal을 닫습니다.
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("errorMessage:", errorMessage);
        if (errorMessage.includes("user-not-found")) {
          alert("가입되지 않은 회원입니다.");
          return;
        } else if (errorMessage.includes("wrong-password")) {
          alert("비밀번호가 잘못 되었습니다.");
        }
      });
  } else {
    confirm.log("create id");
    // 회원가입 버튼 클릭의 경우
    createUserWithEmailAndPassword(authService, emailVal, pwVal)
      .then((userCredential) => {
        // Signed in
        console.log("회원가입 성공!");
        closePopup();
        // const user = userCredential.user;
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log("errorMessage:", errorMessage);
        if (errorMessage.includes("email-already-in-use")) {
          alert("이미 가입된 이메일입니다.");
        }
      });
  }
};

export const socialLogin = (event) => {
  const { name } = event.target;
  let provider;
  if (name === "google") {
    provider = new GoogleAuthProvider();
  } else if (name === "github") {
    provider = new GithubAuthProvider();
  }
  signInWithPopup(authService, provider)
    .then((result) => {
      const user = result.user;
    })
    .catch((error) => {
      // Handle Errors here.
      console.log("error:", error);
      const errorCode = error.code;
      const errorMessage = error.message;
    });
};

export const logout = () => {
  signOut(authService)
    .then(() => {
      // Sign-out successful.
      localStorage.clear();
      console.log("로그아웃 성공");
    })
    .catch((error) => {
      // An error happened.
      console.log("error:", error);
    });
};

/**
 * 여기서부터는 auth modal의 interaction에 대한 부분입니다.
 * function 키워드를 사용하는 것으로 호이스팅 시킵니다.
 * @see https://hansea.tistory.com/entry/modal-close-%EB%AA%A8%EB%8B%AC%EC%B0%BD-%EB%8B%AB%EB%8A%94-%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EB%A7%8C%EB%93%A4%EA%B8%B0
 */

$(`.overlay`).style.display = "none";
$(`.login-modal`).style.display = "none";
$(`.signup-modal`).style.display = "none";

export function openPopupLogin() {
  document.body.style = `overflow: hidden`;

  $(`.overlay`).style.display = "block";
  $(`.auth-container`).style.display = "flex";
  $(`.login-modal`).style.display = "flex";
  $(`.signup-modal`).style.display = "none";
}

export function switchPopupSignup() {
  document.body.style = `overflow: hidden`;

  $(`.overlay`).style.display = "block";
  $(`.auth-container`).style.display = "flex";
  $(`.login-modal`).style.display = "none";
  $(`.signup-modal`).style.display = "flex";
}
export function closePopup() {
  document.body.style = `overflow: auto`;

  $(`.overlay`).style.display = "none";
  $(`.auth-container`).style.display = "none";
  $(`.login-modal`).style.display = "none";
  $(`.signup-modal`).style.display = "none";
}
