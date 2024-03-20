import gen from './generator.js';


const inputFields = document.querySelectorAll('input');
inputFields.forEach(inputField => {
  inputField.addEventListener('focus', function () {
    inputField.setAttribute('placeholder', ' ');
  });
  inputField.addEventListener('blur', function () {
    inputField.setAttribute('placeholder', '');
  });
});


//const masked = true;

const NAME_COOKIE_GENERATOR_PEOPLE = "nv-cookie-generator-people";

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

  setCookieGeneratorPeople();
  getPeople(false);

  // Adicionando evento de clique no botão
  document.getElementById("generatorPeople").addEventListener("click", () => { getPeople(false); });

  // Adicionando eventos de clique nos botões
  document.querySelectorAll(".nv-btn-copy-all-data-people").forEach(btn => {
    btn.addEventListener("click", () => { copyAllDataPeople(); });
  });
  document.querySelectorAll(".nv-btn-copy-all-data-people-json").forEach(btn => {
    btn.addEventListener("click", () => { copyAllDataPeopleJSON(); });
  });
  document.querySelectorAll("[class^='nv-btn-textarea-copy']").forEach(btn => {
    btn.addEventListener("click", (event) => { copy(`#nv-field-${event.target.id.split('-').pop()}`); });
  });
});

document.addEventListener("keypress", (e) => {
  const keyPressed = e.key;
  if (keyPressed.toLowerCase() === 'enter') {
    getPeople(true);
  }
});

function setCookieGeneratorPeople() {
  // Implemente a função para definir o cookie
}

function copyAllDataPeople() {
  // Implemente a função para copiar todos os dados
}

function copyAllDataPeopleJSON() {
  // Implemente a função para copiar todos os dados em formato JSON
}

function copy(element) {
  // Implemente a função para copiar o conteúdo de um elemento
}

function getPeople(copyField = false) {
  const data = {
    "sex": document.getElementById("fldSex").value,
    "state": document.getElementById("fldState").value,
    "mask": document.getElementById("fldMask").checked,
  }

  let getAddressFull = gen.address.generate(data.mask, data.state)
  let getZipCode = getAddressFull[0];
  let getAddress = getAddressFull[1];
  let getName = gen.name.generate(data.sex);

  document.getElementById('fldName').value = getName;

  document.getElementById('fldCep').value = getZipCode;

  //document.getElementById('fldEndereco').value = JSON.stringify(getAddress[1].logradouro);
  document.getElementById('fldLogradouro').value = getAddress.logradouro;
  /* document.getElementById('fldComplemento').value = getAddress.complemento ? getAddress.complemento : " "; */
  document.getElementById('fldBairro').value = getAddress.bairro;
  document.getElementById('fldLocalidade').value = getAddress.localidade;
  document.getElementById('fldUf').value = getAddress.uf;

}
