import "./style.css";

const modal = document.querySelector("#modal");
const buttonOpenModal = document.querySelector("#btn-open-modal");
const inputModal = document.querySelector("#modal textarea");
const buttonAddTodo = document.querySelector("#modal button");

const todos = [];

const statusProgress = [
  {
    cls: "status-grey",
    text: "TODO",
  },
  {
    cls: "status-yellow",
    text: "In Progress",
  },
  {
    cls: "status-green",
    text: "Complete",
  },
];

const createEltWithClass = (elt, cls, txt = "") => {
  const newElt = document.createElement(elt);
  newElt.className = cls;
  newElt.textContent = txt;
  return newElt;
};

const displayTodos = () => {
  const tbody = document.querySelector("tbody");
  tbody.innerHTML = "";
  const todosNode = todos.map((todo, index) => {
    return createTodo(todo, index);
  });
  tbody.append(...todosNode);
};

const createTodo = (todo, index) => {
  const tr = document.createElement("tr");
  let task;
  let edit;
  if (todo["edit"]) {
    task = createInputEdit(todo);
    edit = createButtonEditInProgress(index, task);
  } else {
    task = createEltWithClass("td", "center todo", todo["text"]);
    edit = createButtonEdit(index, task);
  }
  const status = createButtonStatus(todo);

  const remove = createButtonRemove(index);

  tr.append(task, status, edit, remove);

  return tr;
};

const createButtonEditInProgress = (index, task) => {
  const edit = createEltWithClass("td", "center");

  const btnEdit = createEltWithClass("button", "btn");
  const iconEdit = createEltWithClass("i", "material-icons", "done");
  const btnCancel = createEltWithClass("button", "btn red");
  const iconCancel = createEltWithClass("i", "material-icons", "clear");
  const input = task.querySelector("textarea");
  btnEdit.append(iconEdit);
  btnCancel.append(iconCancel);

  btnEdit.addEventListener("click", () => {
    todos[index]["text"] = input.value;
    todos[index]["edit"] = false;
    displayTodos();
  });

  btnCancel.addEventListener("click", () => {
    todos[index]["edit"] = false;
    displayTodos();
  });

  task.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      todos[index]["edit"] = false;
      displayTodos();
    } else if (event.key === "Enter") {
      todos[index]["text"] = input.value;
      todos[index]["edit"] = false;
      displayTodos();
    }
  });

  edit.append(btnEdit, btnCancel);
  return edit;
};

const changeStatus = (todo) => {
  todo["status"] += 1;
  if (todo["status"] >= statusProgress.length) {
    todo["status"] = 0;
  }
  displayTodos();
};

const addTodo = (text) => {
  todos.push({
    text: text,
    status: 0,
    edit: false,
  });
  displayTodos();
};

const removeTodo = (index) => {
  todos.splice(index, 1);
  displayTodos();
};

const createButtonStatus = (todo) => {
  const status = createEltWithClass("td", "center");
  const statusButton = createEltWithClass(
    "button",
    "btn status white " + statusProgress[todo["status"]]["cls"],
    statusProgress[todo["status"]]["text"]
  );

  statusButton.addEventListener("click", () => {
    changeStatus(todo);
  });

  status.append(statusButton);
  return status;
};

const createButtonRemove = (index) => {
  const remove = createEltWithClass("td", "center");
  const buttonRemove = createEltWithClass("button", "btn red");
  const iconRemoveBtn = createEltWithClass("i", "material-icons", "delete");
  buttonRemove.append(iconRemoveBtn);

  buttonRemove.addEventListener("click", () => {
    removeTodo(index);
  });

  remove.append(buttonRemove);
  return remove;
};

const createButtonEdit = (index, task) => {
  const edit = createEltWithClass("td", "center");
  const buttonEdit = createEltWithClass("button", "btn");
  const iconEditBtn = createEltWithClass("i", "material-icons", "edit");

  buttonEdit.addEventListener("click", function () {
    todos[index]["edit"] = true;
    displayTodos();
  });
  task.addEventListener("dblclick", function () {
    todos[index]["edit"] = true;
    displayTodos();
  });

  buttonEdit.append(iconEditBtn);
  edit.append(buttonEdit);

  return edit;
};

const createInputEdit = (todo) => {
  const divEdit = createEltWithClass("div", "input-field col s10");
  const iEdit = createEltWithClass("i", "material-icons prefix", "mode_edit");
  const inputEdit = createEltWithClass(
    "textarea",
    "materialize-textarea",
    todo["text"]
  );
  divEdit.append(iEdit, inputEdit);
  return divEdit;
};

const checkValidTask = (text) => {
  let textValue = inputModal.value.trim();
  if (textValue) {
    return true;
  } else {
    return false;
  }
};

const closeModal = () => {
  modal.style.display = "None";
  inputModal.value = "";
};

buttonAddTodo.addEventListener("click", (e) => {
  e.preventDefault();
  if (checkValidTask(inputModal.value)) {
    addTodo(inputModal.value[0].toUpperCase() + inputModal.value.slice(1));
    closeModal();
  }
});

buttonOpenModal.addEventListener("click", () => {
  modal.style.display = "block";
  inputModal.focus();
});

inputModal.addEventListener("keydown", (e) => {
  if (e.key === "Enter" && checkValidTask(inputModal.value)) {
    addTodo(inputModal.value[0].toUpperCase() + inputModal.value.slice(1));
    closeModal();
  }
});

document.addEventListener("click", (e) => {
  if (e.target == modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && modal.style.display === "block") {
    closeModal();
  }
});
