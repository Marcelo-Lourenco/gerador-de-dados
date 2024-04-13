import db from './db-general.js';
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
    const d = String(birthDt.getDate()).padStart(2, '0');
    const m = String(birthDt.getMonth() + 1).padStart(2, '0');
    const a = birthDt.getFullYear();

    return `${d}/${m}/${a}`;
  }
}

let cpf = {
  generate: function (mask, state) {
    let n = () => Math.round(Math.random() * 9);
    const n1 = n(), n2 = n(), n3 = n(), n4 = n(), n5 = n(), n6 = n(), n7 = n(), n8 = n(), n9 = cpf.numStates(state);

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
  }
}

let cnpj = {
  generate: function (mask) {
    let n = () => Math.round(Math.random() * 9);
    let n1 = n(), n2 = n(), n3 = n(), n4 = n(), n5 = n(), n6 = n(), n7 = n(), n8 = n(), n9 = 0, n10 = 0, n11 = 0, n12 = 1;

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
  }
}

let rg = {
  generate: function (mask, state) {
    let n = () => Math.round(Math.random() * 9);
    let n1 = Math.floor((Math.random() * 4) + 1);
    let n2 = n(), n3 = n(), n4 = n(), n5 = n(), n6 = n(), n7 = n(), n8 = n();

    const sum = n1 * 2 + n2 * 3 + n3 * 4 + n4 * 5 + n5 * 6 + n6 * 7 + n7 * 8 + n8 * 9;
    let dv = 11 - (sum % 11);

    if (dv === 11) {
      dv = 0;
    }

    if (dv === 10) {
      dv = "X";
    }

    let rgGen = `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}-${dv}`;

    return mask ? rgGen : rgGen.replace(/[^a-zA-Z0-9]/g, '');
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
    let n = () => Math.round(Math.random() * 9);
    let sortDdd = ddd.generate(state);
    let sortOperator = operator.generate();
    const n3 = n(), n4 = n(), n5 = n(), n6 = n(), n7 = n(), n8 = n();

    let cellphoneGen = `(${sortDdd}) ${sortOperator}${n3}${n4}-${n5}${n6}${n7}${n8}`;

    return mask ? cellphoneGen : cellphoneGen.replace(/\D/g, '');
  },
  r: function () {
    return Math.round(Math.random() * 9);
  }
}

let telephone = {
  generate: function (mask, state) {
    let n = () => Math.round(Math.random() * 9);
    let sortDdd = ddd.generate(state);
    let n1 = Math.floor(Math.random() * (3 - 2 + 1)) + 2;
    let n2 = n(), n3 = n(), n4 = n(), n5 = n(), n6 = n(), n7 = n(), n8 = n();
    let telephoneGen = `(${sortDdd}) ${n1}${n2}${n3}${n4}-${n5}${n6}${n7}${n8}`;

    return mask ? telephoneGen : telephoneGen.replace(/\D/g, '');
  }
}

let ie = {
  generate: function (mask) {
    let n = () => Math.round(Math.random() * 9);
    let n1 = n(), n2 = n(), n3 = n(), n4 = n(), n5 = n(), n6 = n();

    let ieGen = `${n1}${n2}${n3}.${n4}${n5}${n6}`;
    return mask ? ieGen : ieGen.replace(/\D/g, '');
  },
  validate: function (documento) {
    return (documento.length === 6 && !isNaN(documento));
  }
};

let licensePlate = {
  generate: function (mask = true, mercosul = true) {
    let n = () => Math.floor(Math.random() * 10);
    let l = () => String.fromCharCode(65 + Math.floor(Math.random() * 26));
    let plate = mercosul ? `${l()}${l()}${l()}-${n()}${l()}${n()}${n()}` : `${l()}${l()}${l()}-${n()}${n()}${n()}${n()}`;
    return mask ? plate : plate.replace(/[^A-Z0-9]/g, '');
  }
}

let renavam = {
  generate: function () {
    let n = () => Math.floor((Math.random() * 9) + 0);
    let n0 = n(), n1 = n(), n2 = n(), n3 = n(), n4 = n(), n5 = n(), n6 = n(), n7 = n(), n8 = n(), n9 = n();
    let mod = (((n() * 3) + (n() * 2) + (n() * 9) + (n() * 8) + (n4 * 7) + (n5 * 6) + (n6 * 5) + (n7 * 4) + (n8 * 3) + (n9 * 2)) * 10) % 11;
    if (mod === 10) {
      mod = 0;
    }
    return '' + n0 + n1 + n2 + n3 + n4 + n5 + n6 + n7 + n8 + n9 + mod;
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
  consult: function (code) {

  }
};

let creditCard = {
  generate: function (mask) {
    const arr = creditCard.banner().number;
    const brand = creditCard.banner().brandName
    const length = 16 - arr.length;
    for (var i = 1; i < length; i++) {
      arr.push(Math.round(Math.random() * 9))
    }

    let sum = 0;
    let aux = true;
    let ninesOut = 0;
    arr.forEach((value, i) => {
      ninesOut = Number(value) * (aux ? 2 : 1); // false = 1 vs true = 2
      ninesOut = ninesOut > 9 ? ninesOut - 9 : ninesOut;
      sum = sum + ninesOut;
      aux = !aux;
      ninesOut = 0;
    });

    let digit = 10 - (sum % 10);
    if (digit == 10) {
      digit = 0;
    }

    const numberCard = mask ? arr.join("").replace(/(.{4})/g, "$1 ") + digit : arr.join("") + digit;

    const creditCardData = {
      "number": numberCard,
      "brand": brand,
      "cvv": creditCard.cvv(),
      "expirationDate": creditCard.expirationDate()
    }

    return creditCardData;
  },
  banner: function () {
    let brandCodes = {
      "discover": [6011, 622, 65],
      "elo": [636368, 438935, 504175, 451416],
      "jcb": [35],
      "mastercard": [51, 52, 53, 54, 55],
      "visa": [4]
    };

    const arrNumber = [];
    for (let brand in brandCodes) {
      brandCodes[brand].forEach(value => arrNumber.push({ number: value, brand: brand }));
    }

    let selectedEntry = arrNumber[Math.floor(Math.random() * arrNumber.length)];
    let number = selectedEntry.number.toString().split("").map(Number);
    let brandName = selectedEntry.brand;

    return { number, brandName };
  },
  cvv: function () {
    let random = Math.floor(Math.random() * 999) + 1;
    let cvv = "00" + random.toString();
    return cvv.substr(cvv.length - 3);
  },
  expirationDate: function () {
    const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
    const getRandomMonth = () => getRandomInt(1, 12);
    const getRandomDay = (month) => {
      if ([1, 3, 5, 7, 8, 10, 12].includes(month)) {
        return getRandomInt(1, 31);
      } else if ([4, 6, 9, 11].includes(month)) {
        return getRandomInt(1, 30);
      } else {
        return getRandomInt(1, 28);
      }
    };

    const month = String(getRandomMonth()).padStart(2, '0');
    const day = String(getRandomDay(month)).padStart(2, '0');
    const year = new Date().getFullYear() + getRandomInt(1, 10);

    return `${day}/${month}/${year}`;
  },
  titularName: function (fullName) {
    let names = fullName.split(' ');
    let titularName = `${names[0]} ${names[1].charAt(0)} ${names.slice(-1)[0]}`;
    return titularName;
  }

};


/* 
let bankAccount = {
  generate: function (code) {
    const bankSearch = code ? dbBanco.find(bank => bank.code === code) : dbBanco.find(bank => bank.code === 237);
    const sortAgency = bankSearch.agency[Math.floor(Math.random() * bankSearch.agency.length)];
    return {
      code: bankSearch.code,
      name: bankSearch.name,
      agency: sortAgency
    };
  },
  consult: function (code) {

  }
}; */




const genAgencyAccount = function (numberOfDigits = 4) {
  let account = [];
  for (let i = 0; i < numberOfDigits; i++) {
    account.push(Math.floor(Math.random() * 10));
  }
  return account;
};

const genMultiplier = function (multipliers) {
  let sumNumbers = 0;
  for (let i = 0; i < multipliers.length; i++) {
    sumNumbers += (i + 2) * multipliers[multipliers.length - i - 1];
  }
  return sumNumbers;
};

const formatter = function (list, type, digit = '') {
  let formatted = '';
  for (let i = 0; i < list.length; i++) {
    formatted += list[i];
  }
  if (type.toUpperCase() === 'AG') {
    return `${formatted}${digit ? '-' + digit : '0'}`; //AG
  } else if (type.toUpperCase() === 'CC') {
    return `${formatted}${digit ? '-' + digit : '0'}`; //CC
  } else {
    return [`${formatted.slice(0, 4)}`, `${formatted.slice(4)}-${digit}`]; //AG CC
  }
};

const bankAccount = {
  generateBancoDoBrazil: function () {
    let bankCode = 1;
    let bankName = 'Banco do Brasil';
    let agency = genAgencyAccount();
    let account = genAgencyAccount(8);

    let sumAgencyDV = genMultiplier(agency);
    let sumAccountDV = genMultiplier(account);

    let agencyDV = Math.abs((sumAgencyDV % 11) - 11);
    agencyDV = agencyDV === 11 || agencyDV === 10 ? (agencyDV === 10 ? 0 : 'X') : agencyDV;

    let accountDV = Math.abs((sumAccountDV % 11) - 11);
    accountDV = accountDV === 11 || accountDV === 10 ? (accountDV === 10 ? 0 : 'X') : accountDV;
    let agencyFormatted = formatter(agency, 'AG', agencyDV);
    let accountFormatted = formatter(account, 'CC', accountDV);

    return {
      bankCode,
      bankName,
      agency: agencyFormatted,
      account: accountFormatted,
    }

  },
  generateBradesco: function () {
    let bankCode = 237;
    let bankName = 'Bradesco';
    let agency = genAgencyAccount();
    let account = genAgencyAccount(6);

    let sumAgencyDV = genMultiplier(agency);
    let sumAccountDV = genMultiplier(account);

    let agencyDV = Math.abs(sumAgencyDV % 11 - 11);
    agencyDV = agencyDV === 10 || agencyDV === 11 ? (agencyDV === 10 ? 'P' : 0) : agencyDV;

    let accountDV = Math.abs(sumAccountDV % 11 - 11);
    accountDV = accountDV === 10 || accountDV === 11 ? (accountDV === 10 ? 'P' : 0) : accountDV;

    let agencyFormatted = formatter(agency, 'AG', agencyDV);
    let accountFormatted = formatter(account, 'CC', accountDV);
    return {
      bankCode,
      bankName,
      agency: agencyFormatted,
      account: accountFormatted,
    }
  },
  generateCaixa: function () {
    let bankCode = 104;
    let bankName = 'Caixa';

    let agency = genAgencyAccount();
    let account = [0, 0, 1];

    for (let i = 0; i < 12; i++) {
      if (i < 4) {
        account.unshift(agency[i]);
      } else {
        account.push(Math.floor(Math.random() * 10));
      }
    }

    let sumAccountDV = 0;
    for (let i = 0; i < account.length; i++) {
      if (i < 9) {
        sumAccountDV += (i + 2) * account[i];
      } else {
        sumAccountDV += (i - 7) * account[i];
      }
    }

    let accountDV = Math.abs(Math.floor((sumAccountDV * 10 / 11)) * 11 - (sumAccountDV * 10));
    accountDV = accountDV === 10 ? 0 : accountDV;

    let accountFormatted = formatter(account, 'ALL', accountDV);

    return {
      bankCode,
      bankName,
      agency: accountFormatted[0],
      account: accountFormatted[1],
    }

  },
  generateCitibank: function () {

    let bankCode = 745;
    let bankName = 'Citibank';
    let agency = genAgencyAccount();
    let account = genAgencyAccount(7);

    let sumAccountDV = genMultiplier(account);

    let accountDV = Math.abs((sumAccountDV % 11) - 11);
    accountDV = accountDV === 11 || accountDV === 10 ? 0 : accountDV;

    let agencyFormatted = formatter(agency, 'AG');
    let accountFormatted = formatter(account, 'CC', accountDV);
    return {
      bankCode,
      bankName,
      agency: agencyFormatted,
      account: accountFormatted,
    }
  },
  generateHsbc: function () {
    let bankCode = 296;
    let bankName = 'HSBC';
    let agency = genAgencyAccount();
    let account = genAgencyAccount(6);
    let multipliers = [8, 9, 2, 3, 4, 5, 6, 7, 8, 9];

    for (let i = agency.length - 1; i >= 0; i--) {
      account.unshift(agency[i]);
    }

    let sumAccountDV = 0;
    for (let i = 0; i < multipliers.length; i++) {
      sumAccountDV += account[i] * multipliers[i];
    }

    let accountDV = Math.abs(sumAccountDV % 11);
    accountDV = accountDV === 0 || accountDV === 10 ? 0 : accountDV;

    let accountFormatted = formatter(account, 'ALL', accountDV);
    return {
      bankCode,
      bankName,
      agency: accountFormatted[0],
      account: accountFormatted[1],
    }
  },
  generateItau: function () {
    let bankCode = 341;
    let bankName = 'Itaú';
    let account = genAgencyAccount(9);

    let sumAccountDV = 0;
    for (let i = 0; i < account.length; i++) {
      if (i % 2 === 0) {
        let par = account[i] * 2;
        if (par > 9) {
          sumAccountDV += (par % 10) + Math.floor(par / 10);
        } else {
          sumAccountDV += par;
        }
      } else {
        sumAccountDV += account[i];
      }
    }

    let accountDV = Math.abs((sumAccountDV % 10) - 10);
    accountDV = sumAccountDV % 10 === 0 ? 0 : accountDV;

    let accountFormatted = formatter(account, 'ALL', accountDV);
    return {
      bankCode,
      bankName,
      agency: accountFormatted[0],
      account: accountFormatted[1],
    }
  },
  generateSantander: function () {
    let bankCode = 33;
    let bankName = 'Santander';
    let multipliers = [9, 7, 3, 1, 9, 7, 1, 3, 1, 9, 7, 3];
    let agency = genAgencyAccount().reverse();
    let account = genAgencyAccount(8);

    for (let i = 0; i < agency.length; i++) {
      account.unshift(agency[i]);
    }

    let sumDV = 0;
    for (let i = 0; i < multipliers.length; i++) {
      sumDV += (multipliers[i] * account[i]) % 10;
    }

    let accountDV = Math.abs(sumDV % 10 - 10);
    accountDV = sumDV % 10 === 0 ? 0 : accountDV;

    let accountFormatted = formatter(account, 'ALL', accountDV);
    return {
      bankCode,
      bankName,
      agency: accountFormatted[0],
      account: accountFormatted[1],
    }
  },
  generateSortBank: function (bank = 'Indiferente', allBanks = false) {
    let listaBancos = ['Banco do Brasil', 'Bradesco', 'Caixa', 'Citibank', 'HSBC', 'Itau', 'Santander', 'Indiferente'];
    if (allBanks) {
      return listaBancos;
    }

    let options = {
      [listaBancos[0]]: bankAccount.generateBancoDoBrazil(),
      [listaBancos[1]]: bankAccount.generateBradesco(),
      [listaBancos[2]]: bankAccount.generateCaixa(),
      [listaBancos[3]]: bankAccount.generateCitibank(),
      [listaBancos[4]]: bankAccount.generateHsbc(),
      [listaBancos[5]]: bankAccount.generateItau(),
      [listaBancos[6]]: bankAccount.generateSantander(),
      [listaBancos[7]]: ''
    };

    let selected;
    if (bank === 'Indiferente') {
      selected = Math.floor(Math.random() * 7);
    } else {
      selected = listaBancos.indexOf(bank);
    }
    let selectedBank = Object.keys(options);

    //return [selectedBank[selected],]];
    return options[listaBancos[selected]];
  }
}


//let ccInd = bankAccount.generateSortBank(bankName);
//let cc001 = bankAccount.generateBancoDoBrazil();
//let cc237 = bankAccount.generateBradesco();
//let cc104 = bankAccount.generateCaixa();
//let cc745 = bankAccount.generateCitibank();
//let cc269 = bankAccount.generateHsbc();
//let cc341 = bankAccount.generateItau();
//let cc033 = bankAccount.generateSantander();






export default { address, name, birthDate, cpf, cnpj, rg, cnh, categoryCnh, voterTitle, pis, cns, passport, email, nickname, cellphone, telephone, ie, licensePlate, renavam, bank, creditCard, bankAccount };