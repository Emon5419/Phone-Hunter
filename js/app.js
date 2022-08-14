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
        <div class="text-center cards1 card mx-5">
            <img src="${phone.image}" class="img card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${phone.phone_name}</h5>
            </div>
            <button onclick="loadPhoneDetail('${phone.slug}')" type="button" class="mb-2 col-2 btn btn-outline-primary w-25 m-auto"> Details </button>
        </div>
        `;
    searchResult.appendChild(div);
  })
}
//load details api:
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
          <img src="${phones.data.image}" class="img-fluid rounded-start" alt="...">
        <div class="col-md-8">
        <div class="card-body">
          <h2 class="card-title">${phones.data.name}</h2>

          <h5 class="card-title mt-5">Main Features:</h5>
          <p class="card-title">Storage: ${phones.data.mainFeatures.storage}</p>
          <p class="card-text">Chipset: ${phones.data.mainFeatures.chipSet}</p>
          <p class="card-text">DisplaySize: ${phones.data.mainFeatures.displaySize}</p>
          <p class="card-text">Memory: ${phones.data.mainFeatures.memory}</p>

          <h5 class="card-text mt-2">Sensors:</h5>
          <p class="card-text">1: ${phones.data.mainFeatures.sensors[0]},${phones.data.mainFeatures.sensors[1]},${phones.data.mainFeatures.sensors[2]},${phones.data.mainFeatures.sensors[3]},${phones.data.mainFeatures.sensors[4]},${phones.data.mainFeatures.sensors[5]}</p>
          
          <h5 class="card-text mt-2">Others:</h5>
          <p class="card-text">Bluetooth:${phones.data.others.Bluetooth}</p>
          <p class="card-text">GPS: ${phones.data.others.GPS}</p>
          <p class="card-text">NFC: ${phones.data.others.NFC}</p>
          <p class="card-text">Radio: ${phones.data.others.Radio}</p>
          <p class="card-text">USB: ${phones.data.others.USB}</p>
          <p class="card-text">WLAN: ${phones.data.others.WLAN}</p>
          <button type="button" class="btn btn-outline-primary"> Buy Now </button>
        </div>
      </div>
    </div>
  </div>`;
  phoneDetails.appendChild(div);
}
