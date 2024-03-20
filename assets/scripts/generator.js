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

let cpf = {
  generate: function (mask, state) {
    const n1 = cpf.r();
    const n2 = cpf.r();
    const n3 = cpf.r();
    const n4 = cpf.r();
    const n5 = cpf.r();
    const n6 = cpf.r();
    const n7 = cpf.r();
    const n8 = cpf.r();
    const n9 = cpf.numStates(state);

    let d1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
    d1 = 11 - (cpf.mod(d1, 11));
    if (d1 >= 10) {
      d1 = 0;
    }

    let d2 = d1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
    d2 = 11 - (cpf.mod(d2, 11));
    if (d2 >= 10) {
      d2 = 0;
    }
    return mask
      ? `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${d1}${d2}`
      : `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${d1}${d2}`;
  },
  numStates: function (state) {
    if (["RS"].includes(state)) return 0;
    if (["DF", "GO", "MT", "MS", "TO"].includes(state)) return 1;
    if (["AC", "AP", "AM", "PA", "RO", "RR"].includes(state)) return 2;
    if (["CE", "MA", "PI"].includes(state)) return 3;
    if (["AL", "PB", "PE", "RN"].includes(state)) return 4;
    if (["BA", "SE"].includes(state)) return 5;
    if (["MG"].includes(state)) return 6;
    if (["ES", "RJ"].includes(state)) return 7;
    if (["SP"].includes(state)) return 8;
    if (["PR", "SC"].includes(state)) return 9;
  },
  mod: function (dividend, divider) {
    return Math.round(dividend - (Math.floor(dividend / divider) * divider));
  },
  r: function () {
    return Math.round(Math.random() * 9);
  }
}

let rg = {
  generate: function (mask, state) {
    const n1 = Math.floor((Math.random() * 4) + 1)
    const n2 = Math.round(Math.random() * 9);
    const n3 = Math.round(Math.random() * 9);
    const n4 = Math.round(Math.random() * 9);
    const n5 = Math.round(Math.random() * 9);
    const n6 = Math.round(Math.random() * 9);
    const n7 = Math.round(Math.random() * 9);
    const n8 = Math.round(Math.random() * 9);

    const sum = n1 * 2 + n2 * 3 + n3 * 4 + n4 * 5 + n5 * 6 + n6 * 7 + n7 * 8 + n8 * 9;
    let digit = 11 - (sum % 11);

    if (digit === 11) {
      digit = 0;
    }

    if (digit === 10) {
      digit = "X";
    }

    return mask
      ? `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}-${digit}`
      : `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${digit}`;
  }
}
let cnh = {
  generate: function () {
    let cnh = "";
    while (true) {
      const n1 = Math.round(Math.random() * 9);
      const n2 = Math.round(Math.random() * 9);
      const n3 = Math.round(Math.random() * 9);
      const n4 = Math.round(Math.random() * 9);
      const n5 = Math.round(Math.random() * 9);
      const n6 = Math.round(Math.random() * 9);
      const n7 = Math.round(Math.random() * 9);
      const n8 = Math.round(Math.random() * 9);
      const n9 = Math.round(Math.random() * 9);

      let aux = 0;

      const sumDv1 = n1 * 9 + n2 * 8 + n3 * 7 + n4 * 6 + n5 * 5 + n6 * 4 + n7 * 3 + n8 * 2 + n9 * 1;
      let dv1 = sumDv1 % 11;
      if (dv1 >= 10) {
        dv1 = 0;
        aux = 2;
      }

      const sumDv2 = n1 * 1 + n2 * 2 + n3 * 3 + n4 * 4 + n5 * 5 + n6 * 6 + n7 * 7 + n8 * 8 + n9 * 9;
      let dv2 = sumDv2 % 11;
      dv2 = dv2 >= 10
        ? 0
        : dv2 - aux;

      if (dv2 < 0) {
        continue;
      }

      cnh = `${n1}${n2}${n3}${n4}${n5}${n6}${n7}${n8}${n9}${dv1}${dv2}`;

      break;
    }

    return cnh;
  }
}

let categoryCnh = {
  generate: function () {
    const arr = ["ACC", "A", "B", "C", "D", "E"];
    const index = Math.floor((Math.random() * 6));
    return arr[index];
  }
}

let pis = {
  generate: function (mask) {
    const weight = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const n = String(Math.floor(Math.random() * 10000000000)).padStart(10, '0');

    const totalSum = n.split('').reduce((acc, value, i) => {
      return acc + (weight[i] * Number(value));
    }, 0);

    const result = 11 - (totalSum % 11);

    let pis = [11, 10].includes(result) ? `${n}0` : `${n}${result}`;

    if (mask) {
      pis = pis.replace(/(\d{3})(\d{5})(\d{2})(\d{1})/, '$1.$2.$3.$4');
    }

    return pis;
  }
}

export default { address, name, cpf, rg, cnh, categoryCnh, pis };