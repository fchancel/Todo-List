import "./style.css";


const btnMain = document.querySelector('#btn-main');
const addBtnZone = document.querySelector('#btn-add-zone');


btnMain.addEventListener('click', () => {
    if (btnMain.dataset.btn === "add"){
        btnMain.dataset.btn = "remove";
        btnMain.className = "btn-remove";
        btnMain.textContent = "x";
        
        const divInput = document.createElement("div");
        divInput.className = "text-center row";
        divInput.id = "input-zone";
        addBtnZone.after(divInput);

        var div = document.createElement("div");
        div.className = "col col-lg-8";
        divInput.append(div);

        const inputElt = document.createElement("input");
        inputElt.type = 'text';
        inputElt.id = "input-text";
        inputElt.className = "form-control";
        div.append(inputElt);

        var div = document.createElement("div");
        div.className = "col col-lg-2";
        divInput.append(div)
        
        const submitElt = document.createElement("button");
        submitElt.textContent = "+";
        submitElt.id = "submit-input";
        submitElt.className = "col";
        div.append(submitElt);

    } else {
        btnMain.dataset.btn = "add";
        btnMain.className = "btn-add";
        btnMain.textContent = "+";
        const divInput = document.querySelector("#input-zone");
        divInput.remove();
    }
})
