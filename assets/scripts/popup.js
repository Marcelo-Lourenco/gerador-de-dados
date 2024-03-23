import enderecos from './db-ceps.js';

document.getElementById('openPage').addEventListener('click', function () {
  window.open('page.html', '_blank');
});

document.addEventListener("DOMContentLoaded", function () {

  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  const searchBank = document.getElementById('searchBank');
  const bancoResults = document.getElementById('bancoResults');

  searchBank.addEventListener('input', function () {
    const searchTerm = searchBank.value.trim();

    // Enviar uma mensagem para o background solicitando os resultados da busca dinâmica
    chrome.runtime.sendMessage({ type: 'search-bancos', searchTerm }, function (response) {
      document.getElementById('bancoResults').className = 'visible';
      updateBancoResults(response.results);
    });
  });

  function updateBancoResults(results) {
    bancoResults.innerHTML = '';

    results.forEach(banco => {
      const li = document.createElement('li');
      li.textContent = `${banco.code} - ${banco.name}`;
      li.className = 'li-results';
      li.addEventListener('click', function () {
        selectBanco(banco);
      });

      bancoResults.appendChild(li);
    });
  }

  function selectBanco(selectedBanco) {
    const bancoSelect = document.getElementById('bancoSelect');
    //bancoSelect.value = selectedBanco.name;
    //bancoResults.innerHTML = selectedBanco;
    searchBank.value = selectedBanco.name;
    bancoResults.innerHTML = '';
    document.getElementById('bancoResults').className = 'hidden';
    document.getElementById('bancoInfo').className = 'resultInfo';

    const containerElement = document.getElementById('bancoInfo');
    containerElement.innerHTML = `
          <div class="table">
            <div class="row">
                <div class="cell-l">Código:</div>
                <div class="cell-r">${selectedBanco.code}</div>
            </div>
            <div class="row">
                <div class="cell-l">Nome:</div>
                <div class="cell-r">${selectedBanco.name}</div>
            </div>
            <div class="row">
                <div class="cell-l">ISPB:</div>
                <div class="cell-r">${selectedBanco.ispb}</div>
            </div>
            <div class="row">
                <div class="cell-l">Razão Social:</div>
                <div class="cell-r">${selectedBanco.fullName}</div>
            </div>
          </div>`;

    // Exibe as informações do CEP
    document.getElementById('bancoInfo').classList.add('resultInfo visible');
  }


  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      document.getElementById('generatedData').value = '';
      /* document.getElementById('warning').className = 'hidden'; */
      document.getElementById('copiedClipboard').className = '';
      document.getElementById('copiedClipboard').className = 'hidden';

      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      tabContents.forEach((content) => {
        content.style.display = "none";
      });

      const tabId = tab.getAttribute("id").replace("tab", "");
      document.getElementById(`tabContent${tabId}`).style.display = "block";
    });
  });

  // Ative a primeira aba por padrão
  tabs[0].click();
});


document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('button.cpf').addEventListener('click', function () {
    chrome.runtime.sendMessage('generate-cpf', Popup.generateDocumentResponse);
  });
  document.querySelector('button.cnpj').addEventListener('click', function () {
    chrome.runtime.sendMessage('generate-cnpj', Popup.generateDocumentResponse);
  });
  document.querySelector('button.rg').addEventListener('click', function () {
    chrome.runtime.sendMessage('generate-rg', Popup.generateDocumentResponse);
  });
  document.querySelector('button.cnh').addEventListener('click', function () {
    chrome.runtime.sendMessage('generate-cnh', Popup.generateDocumentResponse);
  });
  document.querySelector('button.pis').addEventListener('click', function () {
    chrome.runtime.sendMessage('generate-pis', Popup.generateDocumentResponse);
  });
  document.querySelector('button.ie').addEventListener('click', function () {
    chrome.runtime.sendMessage('generate-ie', Popup.generateDocumentResponse);
  });
  document.querySelector('button.cep').addEventListener('click', function () {
    chrome.runtime.sendMessage('generate-cep', Popup.generateDocumentResponse);
  });
  document.querySelector('button.ag').addEventListener('click', function () {
    chrome.runtime.sendMessage('generate-ag', Popup.generateDocumentResponse);
  });


  document.querySelector('input#mask').addEventListener('change', function () {
    let maskSelected = document.querySelector('#mask').checked;
    chrome.storage.local.set({ mask: maskSelected });
    /* tracker.sendEvent('Mask', (maskSelected ? 'on' : 'off')); */
  });

  Popup.loadMaskOption();
  /* Analytics(); */
});

let Popup = {
  loadMaskOption: () => {
    chrome.storage.local.get('mask', data => {
      document.querySelector('#mask').checked = (data.mask ? 'checked' : '');
      /* document.getElementById('warning').className = 'hidden'; */
    });
  },
  setText: (value) => {
    document.getElementById('generatedData').value = value;
    /* document.getElementById('warning').className = 'visible success-message'; */
    document.getElementById('copiedClipboard').className = 'tooltiptext';
    document.getElementById('generatedData').select();

    setTimeout(function () {
      /* document.getElementById('warning').className = 'hidden'; */
    }, 2000);
  },

  searchCEP: (generatedDataValue) => {
    // Procurar o endereço correspondente ao CEP gerado
    const cepMasked = generatedDataValue.replace(/^(\d{5})(\d{3})$/, '$1-$2');
    const endereco = enderecos.find(item => item.cep === cepMasked);

    if (endereco) {
      const containerElement = document.getElementById('cepInfo');
      containerElement.innerHTML = `
          <div class="table">
            <div class="row">
                <div class="cell-l">CEP:</div>
                <div class="cell-r">${endereco.cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')}</div>
            </div>
            <div class="row">
                <div class="cell-l">Logradouro:</div>
                <div class="cell-r">${endereco.logradouro}</div>
            </div>
            <div class="row">
                <div class="cell-l">Bairro:</div>
                <div class="cell-r">${endereco.bairro}</div>
            </div>
            <div class="row">
                <div class="cell-l">Cidade:</div>
                <div class="cell-r">${endereco.localidade}</div>
            </div>
            <div class="row">
                <div class="cell-l">UF:</div>
                <div class="cell-r">${endereco.uf}</div>
            </div>
          </div>`;

      // Exibe as informações do CEP
      document.getElementById('cepInfo').classList.add('visible');
    } else {
      //console.error(`Endereço não encontrado para o CEP ${generatedDataValue}`);
      // Adicione aqui o tratamento para o caso em que o endereço não é encontrado.
    }

  },

  generateDocumentResponse: (response) => {
    Popup.setText(response.message);
    // TODO está chamando a função  searchCEP em todos os botões
    Popup.searchCEP(response.message);
    document.execCommand('copy');
    document.body.click();
  }
}
