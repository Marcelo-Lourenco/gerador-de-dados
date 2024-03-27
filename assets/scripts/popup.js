import gen from './generator.js';
import banks from './db-bancos.js';

document.getElementById('openPage').addEventListener('click', function () {
  window.open('page.html', '_blank');
});

document.addEventListener("DOMContentLoaded", function () {

  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      document.getElementById('generatedData').value = '';
      document.getElementById('copiedClipboard').className = '';
      document.getElementById('copiedClipboard').className = 'hidden';

      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      tabContents.forEach((content) => {
        content.style.display = "none";
        document.getElementById('cepInfo').className = 'hidden';
      });

      const tabId = tab.getAttribute("id").replace("tab", "");

      document.getElementById(`tabContent${tabId}`).style.display = "block";

      tabId === "AG" ? divMask.style.display = "none" : divMask.style.display = "block";

    });
  });

  // Ative a primeira aba por padrão
  tabs[0].click();

});


document.addEventListener('DOMContentLoaded', function () {

  function mask() {
    return document.getElementById("fldMask").checked;
  }

  function state() {
    let ufArr = [
      "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA",
      "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
    ];
    return ufArr[Math.floor(Math.random() * ufArr.length)];
  }

  document.getElementById('btnCpf').addEventListener('click', function () {
    let cpf = gen.cpf.generate(mask(), state());
    document.getElementById('generatedData').value = cpf;
    popup.copy(cpf);
  });
  document.getElementById('btnRg').addEventListener('click', function () {
    let rg = gen.rg.generate(mask(), state());
    document.getElementById('generatedData').value = rg;
    popup.copy(rg);
  });
  document.getElementById('btnCnh').addEventListener('click', function () {
    let cnh = gen.cnh.generate(mask(), state());
    document.getElementById('generatedData').value = cnh;
    popup.copy(cnh);
  });
  document.getElementById('btnPis').addEventListener('click', function () {
    let pis = gen.pis.generate(mask(), state());
    document.getElementById('generatedData').value = pis;
    popup.copy(pis);
  });
  document.getElementById('btnCnpj').addEventListener('click', function () {
    let cnpj = gen.cnpj.generate(mask(), state());
    document.getElementById('generatedData').value = cnpj;
    popup.copy(cnpj);
  });
  document.getElementById('btnIe').addEventListener('click', function () {
    let ie = gen.ie.generate(mask(), state());
    document.getElementById('generatedData').value = ie;
    popup.copy(ie);
  });
  document.getElementById('btnCep').addEventListener('click', function () {
    let addressFull = gen.address.generate(mask(), state())
    let zipCode = addressFull[0];
    let address = addressFull[1];
    document.getElementById('generatedData').value = zipCode;
    popup.copy(zipCode);
    popup.showCep(address)
  });
  document.getElementById('btnAg').addEventListener('click', function () {
    const bancoSelect = document.getElementById('bancoSelect').value;
    const sortAgency = gen.bank.generate(Number(bancoSelect)).agency
    document.getElementById('generatedData').value = sortAgency;
    popup.copy(sortAgency);
    //popup.showAgency(bancoSelect)
  });


});

let popup = {
  copy: function (value) {
    navigator.clipboard.writeText(value)
      .then(function () {
        document.getElementById('copiedClipboard').className = 'tooltiptext';
      })
      .catch(function (err) {
        console.error('Erro ao copiar conteúdo para a área de transferência: ', err);
      });
  },
  showCep: (address) => {
    const containerElement = document.getElementById('cepInfo');
    containerElement.innerHTML = `
      <div class="table">
        <div class="row">
            <div class="cell-l">CEP:</div>
            <div class="cell-r">${address.cep.replace(/^(\d{5})(\d{3})$/, '$1-$2')}</div>
        </div>
        <div class="row">
            <div class="cell-l">Logradouro:</div>
            <div class="cell-r">${address.logradouro}</div>
        </div>
        <div class="row">
            <div class="cell-l">Bairro:</div>
            <div class="cell-r">${address.bairro}</div>
        </div>
        <div class="row">
            <div class="cell-l">Cidade:</div>
            <div class="cell-r">${address.localidade}</div>
        </div>
        <div class="row">
            <div class="cell-l">UF:</div>
            <div class="cell-r">${address.uf}</div>
        </div>
      </div>`;
    document.getElementById('cepInfo').classList.add('visible');
  }
}


