import gen from './generator.js';

document.getElementById('openPage').addEventListener('click', function () {
  window.open('page.html', '_blank');
});
document.getElementById('openPageCep').addEventListener('click', function () {
  window.open('page.html', '_blank');
});
document.getElementById('openPageBank').addEventListener('click', function () {
  window.open('page.html', '_blank');
});

document.addEventListener("DOMContentLoaded", function () {

  const tabs = document.querySelectorAll(".tab");
  const tabContents = document.querySelectorAll(".tab-content");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      document.getElementById('fldDataGen').value = '';
      document.getElementById('copiedClipboard').className = '';
      document.getElementById('copiedClipboard').className = 'hidden';
      document.getElementById('copiedClipboard2').className = '';
      document.getElementById('copiedClipboard2').className = 'hidden';

      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");

      tabContents.forEach((content) => {
        content.style.display = "none";
        document.getElementById('cepInfo').className = 'hidden';
      });

      const tabId = tab.getAttribute("id").replace("tab", "");

      document.getElementById(`tabContent${tabId}`).style.display = "block";

      if (tabId === "AG") {
        divMask.style.display = "none"
        divDataGen.style.display = "none"
        resultConta.style.display = "block"
        accountInfo.style.display = "block"
      } else {
        divMask.style.display = "block"
        divDataGen.style.display = "block"
      }

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
    document.getElementById('fldDataGen').value = cpf;
    popup.copy(cpf);
  });
  document.getElementById('btnRg').addEventListener('click', function () {
    let rg = gen.rg.generate(mask(), state());
    document.getElementById('fldDataGen').value = rg;
    popup.copy(rg);
  });
  document.getElementById('btnCnh').addEventListener('click', function () {
    let cnh = gen.cnh.generate(mask(), state());
    document.getElementById('fldDataGen').value = cnh;
    popup.copy(cnh);
  });
  document.getElementById('btnPis').addEventListener('click', function () {
    let pis = gen.pis.generate(mask(), state());
    document.getElementById('fldDataGen').value = pis;
    popup.copy(pis);
  });
  document.getElementById('btnCnpj').addEventListener('click', function () {
    let cnpj = gen.cnpj.generate(mask(), state());
    document.getElementById('fldDataGen').value = cnpj;
    popup.copy(cnpj);
  });
  document.getElementById('btnIe').addEventListener('click', function () {
    let ie = gen.ie.generate(mask(), state());
    document.getElementById('fldDataGen').value = ie;
    popup.copy(ie);
  });
  document.getElementById('btnCep').addEventListener('click', function () {
    let addressFull = gen.address.generate(mask(), state())
    let zipCode = addressFull[0];
    let address = addressFull[1];
    document.getElementById('fldDataGen').value = zipCode;
    popup.copy(zipCode);
    popup.showCep(address)
  });
  //document.getElementById('btnAg').addEventListener('click', function () {
  //  const bancoSelect = document.getElementById('bancoSelect').value;
  //  const sortAgency = gen.bank.generate(Number(bancoSelect)).agency
  //  document.getElementById('fldDataGen').value = sortAgency;
  //  popup.copy(sortAgency);
  //  //popup.showAgency(bancoSelect)
  //});

  document.getElementById('btnAg').addEventListener('click', function () {
    const bancoSelect = document.getElementById('bancoSelect').value;
    let bankAccount = gen.bankAccount.generateSortBank(bancoSelect)
    let bankAccountStr = `Banco: ${bankAccount.bankCode} - ${bankAccount.bankName}\nAg: ${bankAccount.agency}\nCC: ${bankAccount.account}`
    popup.copy(bankAccountStr);
    popup.showBankAccount(bankAccount)
  });

});

let popup = {
  copy: function (value) {
    navigator.clipboard.writeText(value)
      .then(function () {
        document.getElementById('copiedClipboard').className = 'tooltiptext';
        document.getElementById('copiedClipboard2').className = 'tooltiptext';
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
  },
  showBankAccount: (bankAccount) => {
    const containerElement = document.getElementById('accountInfo');
    containerElement.innerHTML = `
      <div class="table">
      <div class="row">
            <div class="cell-l">Banco:</div>
            <div class="cell-r">${bankAccount.bankName}</div>
        </div>
       <div class="row">
            <div class="cell-l">Código:</div>
            <div class="cell-r">${bankAccount.bankCode}</div>
        </div>
        <div class="row">
            <div class="cell-l">Agência:</div>
            <div class="cell-r">${bankAccount.agency}</div>
        </div>
        <div class="row">
            <div class="cell-l">Conta:</div>
            <div class="cell-r">${bankAccount.account}</div>
        </div>
      </div>
      `;
    document.getElementById('accountInfo').classList.add('visible');
  }
}


