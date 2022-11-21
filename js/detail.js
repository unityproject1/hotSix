export function modalModify () {
  $(`#modalModify`).show();
  $(`#modalDate`).show();
  $(`#modalButtonModify`).hide();
  let modifiedTitle = $(`#modalTitle`).text();
  let modifiedContent = $(`.modalContent`).text();
  console.log(modifiedContent);
  $(`#modalTitle`).hide();
  $(`.modalContent`).hide();
  $(`#modalDate`).hide();
  $(`#modalTitleInput`).show();
  $(`#contentTextarea`).show();
  $(`#modalTitleInput`).attr("value", `${modifiedTitle}`);
  $(`#contentTextarea`).val(modifiedContent);
  }

export function modalModifyClose() {
  $(`#modalModify`).hide();
  $(`#modalDate`).show();
  let modifiedTitle = $(`#modalTitleInput`).val();
  let modifiedContent = $(`#contentTextarea`).val();
  console.log(modifiedContent);
  $(`#modalButtonModify`).show();
  $(`#modalTitleInput`).hide();
  $(`#contentTextarea`).hide();

  $(`#modalTitle`).text(modifiedTitle);
  $(`.modalContent`).text(modifiedContent);
  $(`#modalTitle`).show();
  $(`.modalContent`).show();}


export function modalup(){
  console.log("hi")
  document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
  $(`.modalFirstBlack`).css(`top`, '0vh');
};

export function modaldown(){
  const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY) * -1);
  $(`.modalFirstBlack`).css(`top`, `100vh`);
}