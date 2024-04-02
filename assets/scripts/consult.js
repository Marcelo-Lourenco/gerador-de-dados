import banks from './db-bancos.js';

const searchInput = document.getElementById('searchBank');
const resultsList = document.getElementById('bancoResults');
const infoContainer = document.getElementById('bancoInfo');

searchInput.addEventListener('input', function () {
  document.getElementById('bancoResults').className = 'visible';
  document.getElementById('bancoInfo').className = 'hidden';
  const searchTerm = this.value.trim().toLowerCase();
  const filteredBanks = banks.filter(bank => bank.name.toLowerCase().includes(searchTerm));
  renderResults(filteredBanks);
});

function renderResults(results) {
  resultsList.innerHTML = '';
  if (results.length > 0) {
    results.forEach(result => {
      const listItem = document.createElement('li');
      listItem.textContent = `${result.code} - ${result.name}`;
      listItem.className = 'li-results';
      listItem.addEventListener('click', function () {
        displayBankInfo(result);
      });
      resultsList.appendChild(listItem);
    });
  } else {
    const listItem = document.createElement('li');
    listItem.className = 'li-results';
    listItem.textContent = 'Nenhum resultado encontrado';
    resultsList.appendChild(listItem);
  }
}

function displayBankInfo(bank) {
  bancoResults.innerHTML = '';
  searchBank.value = bank.name;
  infoContainer.innerHTML = `
    <div class="table">
      <div class="row">
        <div class="cell-l">Código:</div>
        <div class="cell-r">${bank.code}</div>
      </div>
      <div class="row">
        <div class="cell-l">Nome:</div>
        <div class="cell-r">${bank.name}</div>
      </div>
      <div class="row">
        <div class="cell-l">ISPB:</div>
        <div class="cell-r">${bank.ispb}</div>
      </div>
      <div class="row">
        <div class="cell-l">Razão Social:</div>
        <div class="cell-r">${bank.fullName}</div>
      </div>
    </div>`;
  //<div class="row">
  //  <div class="cell-l">Agências:</div>
  //  <div class="cell-r">${bank.agency.join(', ')}</div>
  //</div>

  document.getElementById('bancoInfo').className = 'visible';
}
