function solve() {

    function addUserInfo(e) {

        e.preventDefault();

        let topics = [];
        let userInfo = document.querySelectorAll('.user-info input');
        let checkedTopics = Array.from(document.querySelectorAll('input:checked'));
        checkedTopics.forEach(item => topics.push(item.value));

        let row = table.insertRow();
        row.style.visibility = 'visible';
        let cell1 = row.insertCell();
        let cell2 = row.insertCell();
        let cell3 = row.insertCell();

        cell1.innerHTML = userInfo[0].value;
        cell2.innerHTML = userInfo[2].value;
        cell3.innerHTML = topics.join(' ')
    }

    function search() {

        let searchFor = document.querySelector('#exercise > input').value;
        let rows = document.querySelectorAll('tbody td');

        if(searchFor.length > 0){

            for (let i = 0; i < rows.length; i++){

                if(rows[i].textContent.toLowerCase().includes(searchFor.toLowerCase()) === true){

                    rows[i].parentElement.style.visibility = 'visible';
                } else {

                    rows[i].parentElement.style.visibility = 'hidden';
                }
            }
        }
    }

    let table = document.querySelector('table tbody');
    let submitButton = document.querySelector('#exercise button');
    let searchButton = document.querySelectorAll('#main button')[1];

    submitButton.addEventListener('click', addUserInfo);
    searchButton.addEventListener('click', search);
}