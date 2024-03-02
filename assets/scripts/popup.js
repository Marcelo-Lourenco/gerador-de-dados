
document.addEventListener("DOMContentLoaded", function () {
  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      document.getElementById('generatedData').value = '';
      document.getElementById('warning').className = 'hidden';


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
      document.getElementById('warning').className = 'hidden';
    });
  },
  setText: (value) => {
    document.getElementById('generatedData').value = value;
    document.getElementById('warning').className = 'visible success-message';
    document.getElementById('generatedData').select();
    setTimeout(function () {
      document.getElementById('warning').className = 'hidden';
    }, 2000);
  },
  fetchText: (value) => {

    const generatedDataValue = value;
    fetch(`https://api.brasilaberto.com/v1/zipcode/${generatedDataValue}`)
      .then(response => response.json())
      .then(data => {
        // Aqui você pode fazer o que quiser com os dados da API

        let result = data.result;

        const containerElement = document.getElementById('cepInfo');
        containerElement.innerHTML = `
          <div class="table">
            <div class="row">
                <div class="celll">CEP:</div>
                <div class="cellr">${result.zipcode.replace(/^(\d{5})(\d{3})$/, '$1-$2')}</div>
            </div>
            <div class="row">
                <div class="celll">Logradouro:</div>
                <div class="cellr">${result.street}</div>
            </div>
            <div class="row">
                <div class="celll">Bairro:</div>
                <div class="cellr">${result.district}</div>
            </div>
            <div class="row">
                <div class="celll">Cidade:</div>
                <div class="cellr">${result.city}</div>
            </div>
            <div class="row">
                <div class="celll">UF:</div>
                <div class="cellr">${result.stateShortname}</div>
            </div>
          </div>`;

        // Exibe as informações do CEP
        document.getElementById('cepInfo').classList.add('visible');
      })
      .catch(error => console.error('Erro ao chamar a API BrasilAberto', error));

  },
  generateDocumentResponse: (response) => {
    Popup.setText(response.message);
    Popup.fetchText(response.message);
    document.execCommand('copy');
    document.body.click();
  }
}

