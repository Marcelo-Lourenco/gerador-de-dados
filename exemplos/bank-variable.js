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
    return `${formatted}${digit ? '-' + digit : '0'} `; //AG
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
  generateIndiferente: function (bank = 'Indiferente', allBanks = false) {
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


let ccInd = bankAccount.generateIndiferente();
let cc001 = bankAccount.generateBancoDoBrazil();
let cc237 = bankAccount.generateBradesco();
let cc104 = bankAccount.generateCaixa();
let cc745 = bankAccount.generateCitibank();
let cc269 = bankAccount.generateHsbc();
let cc341 = bankAccount.generateItau();
let cc033 = bankAccount.generateSantander();


// Exemplo de uso:
console.log(`${ccInd.bankCode} ${ccInd.bankName} ${ccInd.agency} ${ccInd.account}\n`);
console.log(`${cc001.bankCode} ${cc001.bankName} ${cc001.agency} ${cc001.account}\n`);
console.log(`${cc237.bankCode} ${cc237.bankName} ${cc237.agency} ${cc237.account}\n`);
console.log(`${cc104.bankCode} ${cc104.bankName} ${cc104.agency} ${cc104.account}\n`);
console.log(`${cc745.bankCode} ${cc745.bankName} ${cc745.agency} ${cc745.account}\n`);
console.log(`${cc269.bankCode} ${cc269.bankName} ${cc269.agency} ${cc269.account}\n`);
console.log(`${cc341.bankCode} ${cc341.bankName} ${cc341.agency} ${cc341.account}\n`);
console.log(`${cc033.bankCode} ${cc033.bankName} ${cc033.agency} ${cc033.account}\n`);