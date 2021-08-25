import "./style.css";

const todoZone = document.querySelector("#todo-zone");
const btnOpenModal = document.querySelector("#btn-open-modal");
const myModal = document.querySelector("#modal");
const btnAdd = document.querySelector("#btn-add");

function addTodo(text) {
  const tr = document.createElement("tr");
  const textTd = document.createElement("td");
  textTd.className = "center todo";
  textTd.textContent = text;

  const statusTd = document.createElement("td");
  statusTd.className = "center status";
  statusTd.textContent = "status";

  const editTd = document.createElement("td");
  editTd.className = "center";

  const buttonEdit = document.createElement("button");
  buttonEdit.className = "btn";

  const iconEditBtn = document.createElement("i");
  iconEditBtn.className = "material-icons";
  iconEditBtn.textContent = "edit";

  buttonEdit.append(iconEditBtn);
  editTd.append(buttonEdit);

  const removeTd = document.createElement("td");
  removeTd.className = "center";

  const buttonRemove = document.createElement("button");
  buttonRemove.className = "btn red";

  buttonRemove.addEventListener("click", () => {
    tr.remove();
  });

  const iconRemoveBtn = document.createElement("i");
  iconRemoveBtn.className = "material-icons";
  iconRemoveBtn.textContent = "delete";

  buttonRemove.append(iconRemoveBtn);
  removeTd.append(buttonRemove);

  tr.append(textTd);
  tr.append(statusTd);
  tr.append(editTd);
  tr.append(removeTd);
  todoZone.append(tr);
}

function modal(contain) {
  myModal.style.display = "block";
}

btnOpenModal.addEventListener("click", modal);

document.addEventListener("click", (event) => {
  if (event.target == myModal) {
    myModal.style.display = "None";
  }
});

btnAdd.addEventListener("click", (event) => {
  event.preventDefault();
  const text = document.querySelector("#input-add");
  const textValue = text.value.trim();
  if (textValue) {
    addTodo(textValue);
    text.value = "";
    myModal.style.display = "None";
  }
});
