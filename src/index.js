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
  const todosNode = todos.map((todo, index) => createTodo(todo, index));
  tbody.append(...todosNode);
};

const createTaskAndEditIfEditing = (todo, index) => {
  const task = createInputEdit(todo);
  const edit = createButtonEditInProgress(index, task);
  return [task, edit];
};

const createTaskAndEditIfNotEditing = (todo, index) => {
  const task = createEltWithClass("td", "center todo", todo.text);
  const edit = createButtonEdit(index, task);
  return [task, edit];
};

const createTodo = (todo, index) => {
  const tr = document.createElement("tr");
  const status = createButtonStatus(todo);
  const remove = createButtonRemove(index);
  const createTaskAndEdit = todo.edit
    ? createTaskAndEditIfEditing
    : createTaskAndEditIfNotEditing;
  const [task, edit] = createTaskAndEdit(todo, index);

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
    editText(todos[index], input.value);
  });

  btnCancel.addEventListener("click", () => {
    stopEditing(todos[index]);
  });

  task.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      editText(todos[index], input.value);
    }
    if (event.key === "Escape") {
      stopEditing(todos[index]);
    }
  });

  edit.append(btnEdit, btnCancel);
  return edit;
};

const startEditing = (todo) => {
  todo.edit = true;
  displayTodos();
};

const stopEditing = (todo) => {
  todo.edit = false;
  displayTodos();
};

const editText = (todo, text) => {
  todo.text = capitalize(text);
  stopEditing(todo);
};

const changeStatus = (todo) => {
  todo.status = (todo.status + 1) % statusProgress.length;
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
    "btn status white " + statusProgress[todo.status].cls,
    statusProgress[todo.status].text
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

  buttonEdit.addEventListener("click", () => {
    startEditing(todos[index]);
  });

  task.addEventListener("dblclick", () => {
    startEditing(todos[index]);
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
    todo.text
  );
  divEdit.append(iEdit, inputEdit);
  return divEdit;
};

const checkValidTask = () => {
  let textValue = inputModal.value.trim();
  return !!textValue;
};

const listenerWithoutPropagation = (cb) => {
  return (event) => {
    event.preventDefault();
    cb(event);
  };
};

buttonAddTodo.addEventListener(
  "click",
  listenerWithoutPropagation(() => {
    const text = inputModal.value;
    if (checkValidTask(text)) {
      addTodo(capitalize(text));
      closeModal();
    }
  })
);

buttonOpenModal.addEventListener("click", () => {
  openModal();
  inputModal.focus();
});

inputModal.addEventListener("keydown", (e) => {
  const text = inputModal.value;
  if (e.key === "Enter" && checkValidTask(text)) {
    addTodo(capitalize(text));
    closeModal();
  }
});

document.addEventListener("click", (e) => {
  if (e.target == modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && isModalDisplayed()) {
    closeModal();
  }
});

const isModalDisplayed = () => {
  return modal.style.display === "block";
};

const openModal = () => {
  modal.style.display = "block";
};

const closeModal = () => {
  modal.style.display = "None";
  inputModal.value = "";
};

const capitalize = (str) => {
  return str[0].toUpperCase() + str.slice(1);
};
