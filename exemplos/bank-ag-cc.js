function genericAgencyOrAccount(numberOfDigits = 4) {
  let account = [];
  for (let i = 0; i < numberOfDigits; i++) {
    account.push(Math.floor(Math.random() * 10));
  }
  return account;
}

function genericMultiplier(multipliers) {
  let sumNumbers = 0;
  for (let i = 0; i < multipliers.length; i++) {
    sumNumbers += (i + 2) * multipliers[multipliers.length - i - 1];
  }
  return sumNumbers;
}

function formatter(list, type, digit = '') {
  let formatted = '';
  for (let i = 0; i < list.length; i++) {
    formatted += list[i];
  }
  if (type.toUpperCase() === 'AG') {
    return `${formatted}${digit ? '-' + digit : ''} `; //AG
  } else if (type.toUpperCase() === 'CC') {
    return `${formatted}${digit ? '-' + digit : ''}`; //CC
  } else {
    return `${formatted.slice(0, 4)} ${formatted.slice(4)}-${digit}`; //AG CC
  }
}

function bancoDoBrazil() {
  let agency = genericAgencyOrAccount();
  let account = genericAgencyOrAccount(8);

  let sumAgencyDV = genericMultiplier(agency);
  let sumAccountDV = genericMultiplier(account);

  let agencyDV = Math.abs((sumAgencyDV % 11) - 11);
  agencyDV = agencyDV === 11 || agencyDV === 10 ? (agencyDV === 10 ? 0 : 'X') : agencyDV;

  let accountDV = Math.abs((sumAccountDV % 11) - 11);
  accountDV = accountDV === 11 || accountDV === 10 ? (accountDV === 10 ? 0 : 'X') : accountDV;

  let agencyFormatted = formatter(agency, 'AG', agencyDV);
  let accountFormatted = formatter(account, 'CC', accountDV);
  return `${agencyFormatted}${accountFormatted}`;

}

function citibank() {
  let agency = genericAgencyOrAccount();
  let account = genericAgencyOrAccount(7);

  let sumAccountDV = genericMultiplier(account);

  let accountDV = Math.abs((sumAccountDV % 11) - 11);
  accountDV = accountDV === 11 || accountDV === 10 ? 0 : accountDV;

  let agencyFormatted = formatter(agency, 'AG');
  let accountFormatted = formatter(account, 'CC', accountDV);
  return `${agencyFormatted}${accountFormatted}`;
}

function itau() {
  let account = genericAgencyOrAccount(9);

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
  return accountFormatted;
}

function caixa() {
  let agency = genericAgencyOrAccount();
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
  return accountFormatted;
}

function santander() {
  let multipliers = [9, 7, 3, 1, 9, 7, 1, 3, 1, 9, 7, 3];
  let agency = genericAgencyOrAccount().reverse();
  let account = genericAgencyOrAccount(8);

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
  return accountFormatted;
}

function bradesco() {
  let agency = genericAgencyOrAccount();
  let account = genericAgencyOrAccount(6);

  let sumAgencyDV = genericMultiplier(agency);
  let sumAccountDV = genericMultiplier(account);

  let agencyDV = Math.abs(sumAgencyDV % 11 - 11);
  agencyDV = agencyDV === 10 || agencyDV === 11 ? (agencyDV === 10 ? 'P' : 0) : agencyDV;

  let accountDV = Math.abs(sumAccountDV % 11 - 11);
  accountDV = accountDV === 10 || accountDV === 11 ? (accountDV === 10 ? 'P' : 0) : accountDV;

  let agencyFormatted = formatter(agency, 'AG', agencyDV);
  let accountFormatted = formatter(account, 'CC', accountDV);
  return `${agencyFormatted}${accountFormatted}`;
}

function real() {
  let agency = genericAgencyOrAccount();
  let account = genericAgencyOrAccount(7);
  let multipliers = [8, 1, 4, 7, 2, 2, 5, 9, 3, 9, 5];

  for (let i = agency.length - 1; i >= 0; i--) {
    account.unshift(agency[i]);
  }

  let sumAccountDV = 0;
  for (let i = 0; i < multipliers.length; i++) {
    sumAccountDV += account[i] * multipliers[i];
  }

  let accountDV = Math.abs(sumAccountDV % 11 - 11);
  accountDV = sumAccountDV % 11 <= 1 ? 1 : accountDV;

  let accountFormatted = formatter(account, 'ALL', accountDV);
  return `${accountFormatted}`;
}

function hsbc() {
  let agency = genericAgencyOrAccount();
  let account = genericAgencyOrAccount(6);
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
  return `${accountFormatted}`;
}

function selectBank(bank = 'Indiferente', allBanks = false) {
  let listaBancos = ['Banco do Brasil', 'Caixa', 'Santander', 'Itau', 'HSBC', 'Citibank', 'Bradesco', 'Real', 'Indiferente'];
  if (allBanks) {
    return listaBancos;
  }

  let options = {
    [listaBancos[0]]: bancoDoBrazil(),
    [listaBancos[1]]: caixa(),
    [listaBancos[2]]: santander(),
    [listaBancos[3]]: itau(),
    [listaBancos[4]]: hsbc(),
    [listaBancos[5]]: citibank(),
    [listaBancos[6]]: bradesco(),
    [listaBancos[7]]: real(),
    [listaBancos[8]]: ''
  };

  let selected;
  if (bank === 'Indiferente') {
    selected = Math.floor(Math.random() * 8);
  } else {
    selected = listaBancos.indexOf(bank);
  }
  let selectedBank = Object.keys(options);
  return [selectedBank[selected], options[listaBancos[selected]]];
}

// Exemplo de uso:
console.log(selectBank());
console.log('Banco do Brasil\n' + bancoDoBrazil() + '\n');
console.log('Santander\n' + santander() + '\n');
console.log('Bradesco\n' + bradesco() + '\n');
console.log('Caixa economica federal\n' + caixa() + '\n');
console.log('Itaú\n' + itau() + '\n');
console.log('Real\n' + real() + '\n');
console.log('Citibank\n' + citibank() + '\n');
console.log('HSBC\n' + hsbc() + '\n');
