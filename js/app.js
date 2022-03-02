document.getElementById('error-message').style.display = 'none';
const searchPhone = () => {
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;

  // clear data
  searchField.value = '';
  document.getElementById('error-message').style.display = 'none';

  // load data
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`;

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
    const div = document.createElement('div');
    div.classList.add('col');
    div.innerHTML = `
        <div class="cards1 card mx-5 btn btn-outline-light">
            <img src="${phone.image}" class="img card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
                <h5 class="card-title">${phone.slug}</h5>
            </div>
            <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="col-2 btn btn-outline-primary w-25 m-auto"> Details </button>
        </div>
        `;
    searchResult.appendChild(div);
  })
}

const loadPhoneDetail = phoneid => {
  console.log(phoneid);
  const url = `https://openapi.programming-hero.com/api/phone/${phoneid}`;
  console.log(url);
  fetch(url)
    .then(res => res.json())
    .then(data => displayPhoneDetail(data));
}

const displayPhoneDetail = phones => {
  const phoneDetails = document.getElementById('phone-details');
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
  <div class="cards1">
    
  <div class="row g-0">
    <div class="col-md-4">
      <img src="${phones.data.image}" class="img-fluid rounded-start" alt="...">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h6 class="card-title">Name: ${phones.data.name}</h6>
        <h5 class="card-title">Main Features:</h5>
        <p class="card-title">${phones.data.mainFeatures.storage}</p>
        <p class="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
        <p class="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
      </div>
    </div>
  </div>

</div>
    `;
  phoneDetails.appendChild(div);
}
