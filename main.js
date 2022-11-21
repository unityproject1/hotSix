window.onscroll = function () {
  progressBar();
};

function progressBar() {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  document.getElementsByClassName("progress-bar")[0].style.width =
    scrolled + "%";
}
