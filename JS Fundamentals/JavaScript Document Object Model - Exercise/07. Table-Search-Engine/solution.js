function solve() {

    let searchButton = document.getElementById('searchBtn');
    let searchField = document.getElementById('searchField');

    let elementsToSearchIn = document.querySelectorAll('tbody td');

    searchButton.addEventListener('click', searchIn);

    function searchIn() {

        if(searchField.value.length > 0){

            for(let i = 0; i < elementsToSearchIn.length; i++){

                if(elementsToSearchIn[i].textContent.toLowerCase().includes(searchField.value.toLowerCase()) === true){
                    elementsToSearchIn[i].parentNode.className = 'select';
                }
            }
            searchField.value = '';
        }
    }
}