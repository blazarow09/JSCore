function addItem() {
    let newItemT = document.querySelector('#newItemText');
    let newItemV = document.querySelector('#newItemValue');

    let newOption = document.createElement('option');
    newOption.textContent = newItemT.value;
    newOption.value = newItemV.value;

    let menu = document.querySelector('#menu');

    menu.appendChild(newOption);

    newItemT.value = '';
    newItemV.value = '';
}