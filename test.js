const exitElement = document.getElementById("exitIcon");
const formAddList = document.getElementById("new-list-form");

// =====
function testList() {
  formVisible = true;
  console.log(formVisible);
  formAddList.classList.add("active");
  if (e.target.id !== "new-list-form") {
    formVisible.classList.remove("active");
  }
}

document.onclick = function (e) {
  if (e.target.id !== "exitIcon" && e.target.id !== "new-list-form") {
    exitElement.classList.remove("active");
    formAddList.classList.remove("active");
  }
};

exitElement.addEventListener("click", (e) => {
  console.log(e.target);
});

// Modal Movível
jQuery(document).ready(function () {
  $(function () {
    $("#draggable").draggable();
  });

  <body>
    <div id="draggable" class="ui-widget-content">
      <p>Drag me around</p>
    </div>
  </body>;
});
