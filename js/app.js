document.getElementById('error-message').style.display = 'none';
const searchPhone = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // clear data
    searchField.value = '';
    document.getElementById('error-message').style.display = 'none';

    // load data
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;
    // console.log(url);
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.data))
        .catch(error => displayError(error));

}

const displayError = error => {
    document.getElementById('error-message').style.display = 'block';
}

const displaySearchResult = phones => {
    const searchResult = document.getElementById('search-result');
    searchResult.textContent = '';


    phones.forEach(phone => {

        // console.log(phone);
        const div = document.createElement('div');
        div.classList.add('col');
        div.innerHTML = `
        <div class="cards1 card mx-5 btn btn-outline-light">
            <img src="${phone.image}" class="img card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                
            </div>
            <button onclick="loadMealDetail(${phone.phoneid})" type="button" class="btn btn-outline-primary w-25 m-auto">Primary</button>
        </div>
        `;
        searchResult.appendChild(div);


    })
}
