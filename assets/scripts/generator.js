import db from './db.js';
import dbCep from './db-ceps.js';

let address = {
  generate: function (mask, uf) {
    let fullAddress = uf ? dbCep.filter(endereco => endereco.uf === uf) : dbCep;
    let sortAddress = fullAddress[Math.floor(Math.random() * fullAddress.length)]
    let zipCode = sortAddress.cep.replace(/\D/g, '');

    if (mask) {
      zipCode = zipCode.replace(/^(\d{5})(\d{3})$/, '$1-$2');
    }
    return [zipCode, sortAddress];
  }
};

let fullName;
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
    fullName = `${name} ${middleName} ${lastName}`
    return fullName;
  }
};

let cpf = {
  generate: function (mask, state) {
    const n1 = cpf.r(), n2 = cpf.r(), n3 = cpf.r(), n4 = cpf.r(), n5 = cpf.r(), n6 = cpf.r(), n7 = cpf.r(), n8 = cpf.r(), n9 = cpf.numStates(state);

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

    let cpfGen = `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${d1}${d2}`;
    return mask ? cpfGen : cpfGen.replace(/\D/g, '');
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
    const n1 = Math.floor((Math.random() * 4) + 1),
      n2 = rg.r(), n3 = rg.r(), n4 = rg.r(), n5 = rg.r(), n6 = rg.r(), n7 = rg.r(), n8 = rg.r();

    const sum = n1 * 2 + n2 * 3 + n3 * 4 + n4 * 5 + n5 * 6 + n6 * 7 + n7 * 8 + n8 * 9;
    let dv = 11 - (sum % 11);

    if (dv === 11) {
      dv = 0;
    }

    if (dv === 10) {
      dv = "X";
    }

    let rgGen = `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}-${dv}`;

    return mask ? rgGen : rgGen.replace(/\D/g, '');
  },
  r: function () {
    return Math.round(Math.random() * 9);
  }
}

let cnh = {
  generate: function () {
    let cnhNum = String(Math.floor(Math.random() * 900000000) + 100000000);
    let cnhDv = this.calcDV(cnhNum);
    return `${cnhNum}${cnhDv}`;
  },
  calcDV: function (cnhNum) {
    let n1 = 9, n2 = 1, dv1 = 0, dv2 = 0, lMaior = false;

    for (let i = 0; i < 9; i++) {
      let vl = parseInt(cnhNum.charAt(i), 10);
      dv1 += vl * n1;
      dv2 += vl * n2;
      n1--;
      n2++;
    }

    dv1 = dv1 % 11;
    dv1 = dv1 > 9 ? 0 : dv1;

    dv2 = dv2 % 11;
    if (dv2 > 9) {
      dv2 = dv2 - 2 < 0 ? dv2 + 9 : dv2 - 2;
    }

    dv2 = dv2 > 9 ? 0 : dv2;

    return String.fromCharCode(48 + dv1) + String.fromCharCode(48 + dv2);
  }
};


let categoryCnh = {
  generate: function () {
    const cat = ["ACC", "A", "B", "C", "D", "E"];
    const index = Math.floor((Math.random() * 6));
    return cat[index];
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

let email = {
  generate: function (fullName) {
    let removeSpecialCharacter = fullName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let partsName = removeSpecialCharacter.match(/\w+/g);
    let mail = partsName.slice(0, 2).join(' ').toLowerCase().replace(/ /g, ".");
    let emailProviders = db.provedoresEmail;
    let emailProvider = emailProviders[Math.floor(Math.random() * emailProviders.length)];
    return `${mail}${emailProvider}`;
  }
};

let nickname = {
  generate: function () {
    let nicknames = db.nicknames;
    let nickname = nicknames[Math.floor(Math.random() * nicknames.length)];
    return `${nickname}`;
  }
};

let ddd = {
  generate: function (state) {
    const ddds = {
      "AC": [68],
      "AL": [82],
      "AM": [92, 97],
      "AP": [96],
      "BA": [71, 73, 74, 75, 77],
      "CE": [85, 88],
      "DF": [61],
      "ES": [27, 28],
      "GO": [62, 64],
      "MA": [98, 99],
      "MG": [31, 32, 33, 34, 35, 37, 38],
      "MS": [67],
      "MT": [65, 66],
      "PA": [91, 93, 94],
      "PB": [83],
      "PE": [81, 87],
      "PI": [86, 89],
      "PR": [41, 42, 43, 44, 45, 46],
      "RJ": [21, 22, 24],
      "RN": [84],
      "RO": [69],
      "RR": [95],
      "RS": [51, 53, 54, 55],
      "SC": [47, 48, 49],
      "SE": [79],
      "SP": [11, 12, 13, 14, 15, 16, 17, 18, 19],
      "TO": [63]
    }
    const dddState = ddds[state];
    return dddState[Math.floor(Math.random() * dddState.length)];
  }
};

let operator = {
  generate: function () {
    const operators = {
      "Claro": [968, 973, 974, 975, 976, 991, 992, 993, 994],
      "Oi": [984, 985, 986, 987, 988, 989],
      "Tim": [969, 979, 980, 981, 982, 983],
      "Vivo": [967, 971, 972, 995, 996, 997, 998, 999]
    };

    const names = Object.keys(operators);
    const randCodes = operators[names[Math.floor(Math.random() * names.length)]];
    return randCodes[Math.floor(Math.random() * randCodes.length)];
  }
};

let cellphone = {
  generate: function (mask, state) {
    const sortDdd = ddd.generate(state);
    const sortOperator = operator.generate();
    const n3 = cellphone.r(), n4 = cellphone.r(), n5 = cellphone.r(), n6 = cellphone.r(), n7 = cellphone.r(), n8 = cellphone.r();

    let cellphoneGen = `(${sortDdd}) ${sortOperator}${n3}${n4}-${n5}${n6}${n7}${n8}`;

    return mask ? cellphoneGen : cellphoneGen.replace(/\D/g, '');
  },
  r: function () {
    return Math.round(Math.random() * 9);
  }
}

let telephone = {
  generate: function (mask, state) {
    const sortDdd = ddd.generate(state);

    const n1 = Math.floor(Math.random() * (3 - 2 + 1)) + 2;
    const n2 = telephone.r(), n3 = telephone.r(), n4 = telephone.r(), n5 = telephone.r(), n6 = telephone.r(), n7 = telephone.r(), n8 = telephone.r();

    let telephoneGen = `(${sortDdd}) ${n1}${n2}${n3}${n4}-${n5}${n6}${n7}${n8}`;

    return mask ? telephoneGen : telephoneGen.replace(/\D/g, '');
  },
  r: function () {
    return Math.round(Math.random() * 9);
  }
}


export default { address, name, cpf, rg, cnh, categoryCnh, pis, email, nickname, cellphone, telephone };