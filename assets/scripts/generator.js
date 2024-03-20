import db from './db.js';
import dbCep from './db-ceps.js';

let address = {
  generate: function (mask, uf) {
    let ends = dbCep;
    if (uf) {
      ends = dbCep.filter(endereco => endereco.uf === uf); // Filtra os endereços pelo UF
    }
    let randomIndex = Math.floor(Math.random() * ends.length);
    let end = ends[randomIndex]
    let cep = ends[randomIndex].cep.replace(/\D/g, '');;

    if (mask) {
      cep = cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
    }
    return [cep, end];
  }
};

let name = {
  generate: function (sex) {
    let names;
    if (sex === 'f') {
      names = db.nomesFemininos;
    } else if (sex === 'm') {
      names = db.nomesMasculinos;
    } else {
      names = [...db.nomesFemininos, ...db.nomesMasculinos]
    }

    let middleNames = db.nomesDoMeio;
    let lastNames = db.sobrenomes;

    let name = names[Math.floor(Math.random() * names.length)];
    let middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
    let lastName = lastNames[Math.floor(Math.random() * lastNames.length)];

    return `${name} ${middleName} ${lastName}`;
  }
};

export default { address, name };