import db from './db.js';
import dbCep from './db-ceps.js';
import dbBanco from './db-bancos.js';

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

let birthDate = {
  generate: function () {
    // Generate a random number between 18 and 80 years ago
    const ageInDays = Math.floor(Math.random() * (80 * 365 - 18 * 365) + 18 * 365);
    const now = new Date();
    const birthDt = new Date(now.getTime() - ageInDays * 24 * 60 * 60 * 1000);

    // Formatar a data para o formato dd/mm/aaaa
    const d = String(birthDt.getDate()).padStart(2, '0');
    const m = String(birthDt.getMonth() + 1).padStart(2, '0');
    const a = birthDt.getFullYear();

    return `${d}/${m}/${a}`;

  }
}

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

let cnpj = {
  generate: function (mask) {
    let n1 = cnpj.r(), n2 = cnpj.r(), n3 = cnpj.r(), n4 = cnpj.r(), n5 = cnpj.r(), n6 = cnpj.r(), n7 = cnpj.r(), n8 = cnpj.r(), n9 = 0, n10 = 0, n11 = 0, n12 = 1;

    let dv1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
    dv1 = cnpj.calcDV(dv1);

    let dv2 = dv1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
    dv2 = cnpj.calcDV(dv2);

    let cnpjGerado = `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}/${n9}${n10}${n11}${n12}-${dv1}${dv2}`;
    return mask ? cnpjGerado : cnpjGerado.replace(/\D/g, '');
  },
  calcDV: function (dv) {
    dv = 11 - (dv % 11);
    return (dv >= 10) ? 0 : dv;
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

let voterTitle = {
  generate: function (mask, state) {
    const r = () => Math.round(Math.random() * 9);

    const n = Array.from({ length: 8 }, r);
    const stateCode = voterTitle.statesCode(state);
    const [n9, n10] = stateCode.split("");

    let d1 = n.reduce((acc, digit, index) => acc + digit * (index + 2), 0) % 11;
    d1 = voterTitle.mod(d1, stateCode);

    let d2 = [n9, n10, d1].reduce((acc, digit, index) => acc + digit * (index === 2 ? 9 : index + 7), 0) % 11;
    d2 = voterTitle.mod(d2, stateCode);

    const vt = [...n, n9, n10, d1, d2].join("");
    return mask ? vt.slice(0, 4) + " " + vt.slice(4, 8) + " " + vt.slice(8) : vt;
  },
  statesCode: function (state) {
    const stateCodes = {
      "AC": "24", "AL": "17", "AM": "22", "AP": "25", "BA": "05", "CE": "07", "DF": "20",
      "ES": "14", "GO": "10", "MA": "11", "MG": "02", "MS": "19", "MT": "18", "PA": "13",
      "PB": "12", "PE": "08", "PI": "15", "PR": "06", "RJ": "03", "RN": "16", "RO": "23",
      "RR": "26", "RS": "04", "SC": "09", "SE": "21", "SP": "01", "TO": "27"
    };
    return stateCodes[state];
  },
  mod: function (dv, state) {
    return dv === 10 ? 0 : (dv === 0 && (state === "01" || state === "02")) ? 1 : dv;;
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

let cns = {
  generate: function (mask) {
    let cns = 0;

    while (cns.length !== 15) {
      let n1 = Math.floor((Math.random() * 3) + 1);
      n1 = (n1 === 3) ? Math.floor((Math.random() * 3) + 7) : n1;
      let n2 = ("00000" + Math.floor(Math.random() * 99999 + 1)).slice(-5);
      let n3 = ("00000" + Math.floor(Math.random() * 99999 + 1)).slice(-5);
      cns = n1 + n2 + n3;

      let sum = 0;
      for (let i = 0; i < cns.length; i++) {
        sum += Number(cns.charAt(i)) * (15 - i);
      }

      let mod = sum % 11;
      let dv = 11 - mod;
      dv = (dv === 11) ? 0 : dv;

      if (dv === 10) {
        let sum = 2;
        for (let i = 0; i < cns.length; i++) {
          sum += Number(cns.charAt(i)) * (15 - i);
        }
        mod = sum % 11;
        dv = 11 - mod;
        cns += "001" + String(dv);
      } else {
        cns += "000" + String(dv);
      }

      let cnsGen = `${cns.substr(0, 3)} ${cns.substr(3, 4)} ${cns.substr(7, 4)} ${cns.substr(11, 4)}`;

      return mask ? cnsGen : cnsGen.replace(/\D/g, '');
    }
  }
}

let passport = {
  generate: function () {
    let series = '';
    let numbers = ('0000000' + Math.floor(Math.random() * 10000000)).slice(-7);
    for (let i = 0; i < 2; i++) {
      series += String.fromCharCode(65 + Math.floor(Math.random() * 26));
    }
    return `${series}${numbers}`;
  }
}

let nickname = {
  generate: function () {
    let nicknames = db.nicknames;
    let nickname = nicknames[Math.floor(Math.random() * nicknames.length)];
    return `${nickname}`;
  }
};

let email = {
  generate: function (fullName) {
    let removeSpecialCharacter = fullName.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    let partsName = removeSpecialCharacter.match(/\w+/g);
    let mail = partsName.slice(0, 2).join(' ').toLowerCase().replace(/ /g, ".");
    let emailProviders = db.provedoresEmail;
    let emailProvider = emailProviders[Math.floor(Math.random() * emailProviders.length)];
    return `${mail}${emailProvider}`;
  },
  generateNickname: function () {
    let mail = nickname.generate().toLowerCase();;
    let emailProviders = db.provedoresEmail;
    let emailProvider = emailProviders[Math.floor(Math.random() * emailProviders.length)];
    return `${mail}${emailProvider}`;
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

let ie = {
  generate: function (mask) {
    let n1 = ie.r(), n2 = ie.r(), n3 = ie.r(), n4 = ie.r(), n5 = ie.r(), n6 = ie.r();

    let ieGen = `${n1}${n2}${n3}.${n4}${n5}${n6}`;
    return mask ? ieGen : ieGen.replace(/\D/g, '');
  },
  validate: function (documento) {
    return (documento.length === 6 && !isNaN(documento));
  },
  r: function () {
    return Math.round(Math.random() * 9);
  }
};

let bank = {
  generate: function (code) {
    const bankSearch = code ? dbBanco.find(bank => bank.code === code) : dbBanco.find(bank => bank.code === 237);
    const sortAgency = bankSearch.agency[Math.floor(Math.random() * bankSearch.agency.length)];
    return {
      code: bankSearch.code,
      name: bankSearch.name,
      agency: sortAgency
    };
  },
  consult: {

  }
};

export default { address, name, birthDate, cpf, cnpj, rg, cnh, categoryCnh, voterTitle, pis, cns, passport, email, nickname, cellphone, telephone, ie, bank };