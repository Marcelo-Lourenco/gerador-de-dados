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
  document.getElementById("generatorPeople").addEventListener("click", () => { getPeople(false); });
});

document.addEventListener("keypress", (e) => {
  const keyPressed = e.key;
  if (keyPressed.toLowerCase() === 'enter') {
    getPeople(true);
  }
});

function getPeople() {

  let chooseSex = {
    generate: function () {
      let sexValeu = document.getElementById("fldSex").value;
      return sexValeu ? sexValeu : ["F", "M"][Math.floor(Math.random() * 2)]
    }
  }

  let chooseState = {
    generate: function () {
      let stateValeu = document.getElementById("fldState").value;
      var ufArr = [
        "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
      ];
      return stateValeu ? stateValeu : ufArr[Math.floor(Math.random() * ufArr.length)];
    }
  };

  let sex = chooseSex.generate();
  let state = chooseState.generate();
  let mask = document.getElementById("fldMask").checked;

  let addressFull = gen.address.generate(mask, state)
  let zipCode = addressFull[0];
  let address = addressFull[1];

  let name = gen.name.generate(sex);
  let dataNascimento = gen.birthDate.generate();
  let cpf = gen.cpf.generate(mask, state);
  let rg = gen.rg.generate(mask, state);
  let cnh = gen.cnh.generate();
  let titulo = gen.voterTitle.generate(mask, state);
  let pis = gen.pis.generate(mask);
  let cns = gen.cns.generate(mask);
  let passaporte = gen.passport.generate();

  let email = gen.email.generate(name);
  let cellphone = gen.cellphone.generate(mask, address.uf);
  let telephone = gen.telephone.generate(mask, address.uf);

  document.getElementById('fldName').value = name;
  document.getElementById('fldDataNasc').value = dataNascimento;
  document.getElementById('fldCpf').value = cpf;
  document.getElementById('fldRg').value = rg;
  document.getElementById('fldCnh').value = cnh;
  document.getElementById('fldTitulo').value = titulo;

  document.getElementById('fldPis').value = pis;
  document.getElementById('fldCns').value = cns;
  document.getElementById('fldPassaporte').value = passaporte;

  document.getElementById('fldCep').value = zipCode;
  document.getElementById('fldLogradouro').value = address.logradouro;
  document.getElementById('fldNumero').value = Math.floor(Math.random() * 999) + 1;
  document.getElementById('fldBairro').value = address.bairro;
  document.getElementById('fldLocalidade').value = address.localidade;
  document.getElementById('fldUf').value = address.uf;

  document.getElementById('fldEmail').value = email;
  document.getElementById('fldCellphone').value = cellphone;
  document.getElementById('fldTelephone').value = telephone;

}
