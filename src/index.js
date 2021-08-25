import "./style.css";

const todoZone = document.querySelector('#todo-zone');
const btnAdd = document.querySelector('#btn-add');
const myModal = document.querySelector('#modal');
const modalContent = document.querySelector('.modal-content');
function addTodo(text) {

    todoZone.innerHTML = `
        <tr>
            <td class="center todo">${text}</td>
            <td class="center status">Finir le todo</td>
            <td class="center">
                <button class="btn edit">
                    <i class="material-icons">edit</i>
                </button>
            </td>
            <td class="center">
                <button class="btn remove">
                    <i class="material-icons">delete</i>
                </button>
            </td>
        </tr>`
}

function modal(contain){
    console.log('modal');
    myModal.style.display = "block";

}

btnAdd.addEventListener('click', modal);
console.log(btnAdd);

document.addEventListener('click', (event)=>{
    if (event.target == myModal){
        myModal.style.display = "None"
    }
})