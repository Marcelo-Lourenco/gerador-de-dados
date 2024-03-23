import gen from './generator.js';


document.addEventListener("DOMContentLoaded", function () {
  var copyIcons = document.querySelectorAll(".icon-copy");
  var tooltip = document.querySelector(".tooltip");
  copyIcons.forEach(function (copyIcon) {
    copyIcon.addEventListener("click", function () {
      var inputField = this.parentElement.querySelector('input[type="text"]');
      inputField.select();
      document.execCommand("copy");
      window.getSelection().removeAllRanges();
      tooltip.style.display = "inline-block";
      setTimeout(function () {
        tooltip.style.display = "none";
      }, 2000);
    });
  });
});

const inputFields = document.querySelectorAll('input');
inputFields.forEach(inputField => {
  inputField.addEventListener('focus', function () {
    inputField.setAttribute('placeholder', ' ');
  });
  inputField.addEventListener('blur', function () {
    inputField.setAttribute('placeholder', '');
  });
});


const tabs = document.querySelectorAll(".tab");
const tabContents = document.querySelectorAll(".tab-content");
tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("active"));
    tab.classList.add("active");
    tabContents.forEach((content) => {
      content.style.display = "none";
    });
    const tabId = tab.getAttribute("id").replace("tab", "");
    document.getElementById(`tabContent${tabId}`).style.display = "block";
  });
  // Ative a primeira aba por padrão
  tabs[0].click();
});


document.addEventListener("DOMContentLoaded", () => {

  getPeople(false);

  // Adicionando evento de clique no botão
  document.getElementById("generatorPeople").addEventListener("click", () => { getPeople(false); });

});

document.addEventListener("keypress", (e) => {
  const keyPressed = e.key;
  if (keyPressed.toLowerCase() === 'enter') {
    getPeople(true);
  }
});

function getPeople() {

  let sex = document.getElementById("fldSex").value;
  let state = document.getElementById("fldState").value;
  let mask = document.getElementById("fldMask").checked;

  let getAddressFull = gen.address.generate(mask, state)
  let getZipCode = getAddressFull[0];
  let getAddress = getAddressFull[1];

  let getName = gen.name.generate(sex);
  let getCpf = gen.cpf.generate(mask, state);
  let getRg = gen.rg.generate(mask, state);
  let getCnh = gen.cnh.generate();
  let getPis = gen.pis.generate(mask);
  let getEmail = gen.email.generate(getName);
  let getCellphone = gen.cellphone.generate(mask, getAddress.uf);
  let getTelephone = gen.telephone.generate(mask, getAddress.uf);

  document.getElementById('fldName').value = getName;
  document.getElementById('fldCpf').value = getCpf;
  document.getElementById('fldRg').value = getRg;
  document.getElementById('fldCnh').value = getCnh;
  document.getElementById('fldPis').value = getPis;

  document.getElementById('fldCep').value = getZipCode;
  document.getElementById('fldLogradouro').value = getAddress.logradouro;
  document.getElementById('fldBairro').value = getAddress.bairro;
  document.getElementById('fldLocalidade').value = getAddress.localidade;
  document.getElementById('fldUf').value = getAddress.uf;

  document.getElementById('fldEmail').value = getEmail;
  document.getElementById('fldCellphone').value = getCellphone;
  document.getElementById('fldTelephone').value = getTelephone;

}
