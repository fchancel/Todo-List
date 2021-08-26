import "./style.css";

const todoZone = document.querySelector("#todo-zone");
const btnOpenModal = document.querySelector("#btn-open-modal");
const myModal = document.querySelector("#modal");
const btnAdd = document.querySelector("#btn-add");
const textInput = document.querySelector("#input-add");

// Class for Statut Button and ContentText for Status Button
const statusProgress = [
  ["status-grey", "TODO"],
  ["status-yellow", "In Progress"],
  ["status-green", "Complete"],
];

// Function for create an HTML element with a class and a TextContent
function createEltWithClass(elt, cls, txt = "") {
  const newElt = document.createElement(elt);
  newElt.className = cls;
  newElt.textContent = txt;
  return newElt;
}

// Function for Edit a task
function editTask(textTd, buttonEdit, tr, editTd) {
  // Hide the buton edit and the task text, for remplace by two buttons (valid and cancel edit)
  //  and an input zone for edit text
  textTd.style.display = "None";
  buttonEdit.style.display = "None";
  // Create input zone
  const divEdit = createEltWithClass("div", "input-field col s10");
  const iEdit = createEltWithClass("i", "material-icons prefix", "mode_edit");
  const inputEdit = createEltWithClass(
    "textarea",
    "materialize-textarea",
    textTd.textContent
  );
  tr.prepend(divEdit);
  divEdit.append(iEdit);
  divEdit.append(inputEdit);

  // Create valid and cancel button
  const btnEdit = createEltWithClass("button", "btn");
  const iconEdit = createEltWithClass("i", "material-icons", "done");
  const btnCancel = createEltWithClass("button", "btn red");
  const iconCancel = createEltWithClass("i", "material-icons", "clear");
  btnEdit.append(iconEdit);
  btnCancel.append(iconCancel);
  editTd.append(btnEdit);
  editTd.append(btnCancel);

  // Arrow function for cancel the edit
  const cancelFt = () => {
    textTd.style.display = "block";
    buttonEdit.style.display = "inline";
    divEdit.remove();
    btnEdit.remove();
    btnCancel.remove();
  };

  // Arrow function for valid edit
  const editFt = () => {
    textTd.textContent = inputEdit.value;
    textTd.style.display = "block";
    buttonEdit.style.display = "inline";
    divEdit.remove();
    btnEdit.remove();
    btnCancel.remove();
  };

  //Event for valid edit
  btnEdit.addEventListener("click", editFt);

  //Event for cancel edit
  btnCancel.addEventListener("click", cancelFt);

  //Event for valid or cancel edit with keyboard
  inputEdit.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      cancelFt();
    } else if (event.key === "Enter") {
      editFt();
    }
  });
}

// Function for check if vaolid text and control modal
function prepareAddTask(event) {
  event.preventDefault();
  let textValue = textInput.value.trim();
  if (textValue) {
    textValue = textValue[0].toUpperCase() + textValue.slice(1);
    addTodo(textValue);
    textInput.value = "";
    myModal.style.display = "None";
  }
}

// Function for add a TODO
function addTodo(text) {
  const tr = document.createElement("tr");
  const textTd = createEltWithClass("td", "center todo", text);

  // Manage status Zone
  const statusTd = createEltWithClass("td", "center");
  const statusBtn = createEltWithClass(
    "button",
    "btn status white " + statusProgress[0][0],
    statusProgress[0][1]
  );
  statusBtn.setAttribute("data-level", 0);
  statusTd.append(statusBtn);

  statusBtn.addEventListener("click", () => {
    let level = Number(statusBtn.dataset.level) + 1;
    if (level >= statusProgress.length) {
      level = 0;
    }
    statusBtn.dataset.level = level;
    statusBtn.textContent = statusProgress[statusBtn.dataset.level][1];
    statusBtn.className =
      "btn status white " + statusProgress[statusBtn.dataset.level][0];
  });

  // Manage Edit Zone
  const editTd = createEltWithClass("td", "center");
  const buttonEdit = createEltWithClass("button", "btn");
  const iconEditBtn = createEltWithClass("i", "material-icons", "edit");
  buttonEdit.append(iconEditBtn);
  editTd.append(buttonEdit);

  buttonEdit.addEventListener("click", function () {
    boolEdit = editTask(textTd, buttonEdit, tr, editTd);
  });
  textTd.addEventListener("dblclick", function () {
    boolEdit = editTask(textTd, buttonEdit, tr, editTd);
  });

  // Manage Remove Zone
  const removeTd = createEltWithClass("td", "center");
  const buttonRemove = createEltWithClass("button", "btn red");
  const iconRemoveBtn = createEltWithClass("i", "material-icons", "delete");
  buttonRemove.append(iconRemoveBtn);
  removeTd.append(buttonRemove);

  buttonRemove.addEventListener("click", () => {
    tr.remove();
  });

  // Adding all zone in the HTML global
  tr.append(textTd);
  tr.append(statusTd);
  tr.append(editTd);
  tr.append(removeTd);
  todoZone.append(tr);
}

function closeModal() {
  myModal.style.display = "None";
  textInput.value = "";
}

// Event for open the modal and give the focus on the Input
btnOpenModal.addEventListener("click", () => {
  myModal.style.display = "block";
  textInput.focus();
});

// Event for close the Modal with the click zone
document.addEventListener("click", (event) => {
  if (event.target == myModal) {
    closeModal();
  }
});

// Event for clos the modal with the Escape Key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && myModal.style.display === "block") {
    closeModal();
  }
});

// Event for add a Task
btnAdd.addEventListener("click", function (event) {
  prepareAddTask(event);
});

// Event for use the keyboard with the input
textInput.addEventListener("focus", () => {
  textInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      prepareAddTask(event);
    }
  });
});
