function addError(el) {
  el.parentNode.classList.add("error");
  return "";
}

function delError(el) {
  el.parentNode.classList.remove("error");
}

function openDetail(el) {
  if (el.open) {
    document.querySelectorAll("details").forEach(detail => {
      detail.open = detail === el;
    });
  }
}
