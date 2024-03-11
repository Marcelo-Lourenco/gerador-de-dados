import db from './assets/scripts/db.js';
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    mask: false
  });

  let a = 'all';
  let e = 'editable';
  let s = 'selection';
  let pId = chrome.contextMenus.create({
    'id': 'parent',
    'title': 'Gerador de Dados',
    'contexts': [a, e, s]
  });


  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'cpf-unmasked', 'title': 'CPF sem máscara' });
  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'cpf-masked', 'title': 'CPF com máscara' });
  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'separator01', 'type': 'separator' });
  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'cnpj-unmasked', 'title': 'CNPJ sem máscara' });
  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'cnpj-masked', 'title': 'CNPJ com máscara' });
  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'separator02', 'type': 'separator' });
  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'rg-unmasked', 'title': 'RG sem máscara' });
  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'rg-masked', 'title': 'RG com máscara' });
  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'separator03', 'type': 'separator' });
  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'pis-unmasked', 'title': 'PIS sem máscara' });
  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'pis-masked', 'title': 'PIS com máscara' });
  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'separator04', 'type': 'separator' });
  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'ie-unmasked', 'title': 'Inscrição Estadual sem máscara' });
  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'ie-masked', 'title': 'Inscrição Estadual com máscara' });
  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'separator05', 'type': 'separator' });
  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'cep-unmasked', 'title': 'CEP sem máscara' });
  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'cep-masked', 'title': 'CEP com máscara' });
  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'separator06', 'type': 'separator' });
  chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, e], 'id': 'ag-bradesco', 'title': 'Agência Bradesco' });
  // chrome.contextMenus.create({ 'parentId': pId, 'contexts': [a, s], 'id': 'validate-document', 'title': 'Validar CPF ou CNPJ' });
});

chrome.contextMenus.onClicked.addListener((info, tabs) => {
  switch (info.menuItemId) {
    case 'cpf-masked':
      chrome.tabs.sendMessage(tabs.id, { tag: 'showDocument', message: CPF.gerar(true) });
      break;
    case 'cpf-unmasked':
      chrome.tabs.sendMessage(tabs.id, { tag: 'showDocument', message: CPF.gerar(false) });
      break;
    case 'cnpj-masked':
      chrome.tabs.sendMessage(tabs.id, { tag: 'showDocument', message: CNPJ.gerar(true) });
      break;
    case 'cnpj-unmasked':
      chrome.tabs.sendMessage(tabs.id, { tag: 'showDocument', message: CNPJ.gerar(false) });
      break;
    case 'rg-masked':
      chrome.tabs.sendMessage(tabs.id, { tag: 'showDocument', message: RG.gerar(true) });
      break;
    case 'rg-unmasked':
      chrome.tabs.sendMessage(tabs.id, { tag: 'showDocument', message: RG.gerar(false) });
      break;
    case 'pis-masked':
      chrome.tabs.sendMessage(tabs.id, { tag: 'showDocument', message: PIS.gerar(true) });
      break;
    case 'pis-unmasked':
      chrome.tabs.sendMessage(tabs.id, { tag: 'showDocument', message: PIS.gerar(false) });
      break;
    case 'ie-masked':
      chrome.tabs.sendMessage(tabs.id, { tag: 'showDocument', message: IE.gerar(true) });
      break;
    case 'ie-unmasked':
      chrome.tabs.sendMessage(tabs.id, { tag: 'showDocument', message: IE.gerar(false) });
      break;
    case 'cep-masked':
      chrome.tabs.sendMessage(tabs.id, { tag: 'showDocument', message: CEP.gerar(true) });
      break;
    case 'cep-unmasked':
      chrome.tabs.sendMessage(tabs.id, { tag: 'showDocument', message: CEP.gerar(false) });
      break;
    case 'ag-bradesco':
      chrome.tabs.sendMessage(tabs.id, { tag: 'showDocument', message: AG.gerar(false) });
      break;
    case 'validate-document':
      validarDocumento(info, tabs);
      break;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  chrome.storage.local.get('mask', data => {
    if (request === 'generate-cpf') {
      sendResponse({ type: 'CPF', message: CPF.gerar(data.mask) });
    } else if (request == 'generate-cnpj') {
      sendResponse({ type: 'CNPJ', message: CNPJ.gerar(data.mask) });
    } else if (request == 'generate-rg') {
      sendResponse({ type: 'RG', message: RG.gerar(data.mask) });
    } else if (request == 'generate-pis') {
      sendResponse({ type: 'PIS', message: PIS.gerar(data.mask) });
    } else if (request == 'generate-ie') {
      sendResponse({ type: 'IE', message: IE.gerar(data.mask) });
    } else if (request == 'generate-cep') {
      sendResponse({ type: 'CEP', message: CEP.gerar(data.mask) });
    } else if (request == 'generate-ag') {
      sendResponse({ type: 'AG', message: AG.gerar(data.mask) });
    }
  });
  return true;
});

function validarDocumento(info, tab) {
  let message;
  let numero = info.selectionText;
  let n = numero.replace(/[\.\/-]/g, '');

  if (n.length == 11) {
    message = (CPF.validar(numero) ? 'CPF VÁLIDO!' : 'CPF INVÁLIDO!');
  } else if (n.length == 14) {
    message = (CNPJ.validar(numero) ? 'CNPJ VÁLIDO!' : 'CNPJ INVÁLIDO!');
  } else {
    message = 'Documento ' + numero + ' não foi identificado como CPF ou CNPJ';
  }

  chrome.tabs.sendMessage(tab.id, { tag: 'alert', message: message });
}

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['./assets/scripts/foreground.js']
    })
      .catch(err => console.log(err));
  }
});

function r() {
  return Math.round(Math.random() * 9);
}

let CPF = {
  gerar: function (mascarar) {
    let n1 = r(), n2 = r(), n3 = r(), n4 = r(), n5 = r(), n6 = r(), n7 = r(), n8 = r(), n9 = r();

    var dv1 = n9 * 2 + n8 * 3 + n7 * 4 + n6 * 5 + n5 * 6 + n4 * 7 + n3 * 8 + n2 * 9 + n1 * 10;
    dv1 = CPF.calcDV(dv1);

    var dv2 = dv1 * 2 + n9 * 3 + n8 * 4 + n7 * 5 + n6 * 6 + n5 * 7 + n4 * 8 + n3 * 9 + n2 * 10 + n1 * 11;
    dv2 = CPF.calcDV(dv2);

    let cpfGerado = `${n1}${n2}${n3}.${n4}${n5}${n6}.${n7}${n8}${n9}-${dv1}${dv2}`;

    return (mascarar) ? cpfGerado : cpfGerado.replace(/\D/g, '');
  },
  validar: function (documento) {
    if (documento == null) return;
    n = documento.replace(/\D/g, '');
    validado = false;

    var dv1 = n.charAt(8) * 2 + n.charAt(7) * 3 + n.charAt(6) * 4 + n.charAt(5) * 5 + n.charAt(4) * 6 + n.charAt(3) * 7 + n.charAt(2) * 8 + n.charAt(1) * 9 + n.charAt(0) * 10;
    dv1 = CPF.calcDV(dv1);

    var dv2 = dv1 * 2 + n.charAt(8) * 3 + n.charAt(7) * 4 + n.charAt(6) * 5 + n.charAt(5) * 6 + n.charAt(4) * 7 + n.charAt(3) * 8 + n.charAt(2) * 9 + n.charAt(1) * 10 + n.charAt(0) * 11;
    dv2 = CPF.calcDV(dv2);

    validado = ((dv1.toString() + dv2.toString()) == (n.charAt(9) + n.charAt(10)));

    return validado;
  },
  calcDV: function (dv) {
    dv = 11 - (dv % 11);
    return (dv >= 10) ? 0 : dv;
  }
}


var CNPJ = {
  gerar: function (mascarar) {
    let n1 = r(), n2 = r(), n3 = r(), n4 = r(), n5 = r(), n6 = r(), n7 = r(), n8 = r(), n9 = 0, n10 = 0, n11 = 0, n12 = 1;

    var dv1 = n12 * 2 + n11 * 3 + n10 * 4 + n9 * 5 + n8 * 6 + n7 * 7 + n6 * 8 + n5 * 9 + n4 * 2 + n3 * 3 + n2 * 4 + n1 * 5;
    dv1 = CNPJ.calcDV(dv1);

    var dv2 = dv1 * 2 + n12 * 3 + n11 * 4 + n10 * 5 + n9 * 6 + n8 * 7 + n7 * 8 + n6 * 9 + n5 * 2 + n4 * 3 + n3 * 4 + n2 * 5 + n1 * 6;
    dv2 = CNPJ.calcDV(dv2);

    let cnpjGerado = `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}/${n9}${n10}${n11}${n12}-${dv1}${dv2}`;

    return (mascarar) ? cnpjGerado : cnpjGerado.replace(/\D/g, '');
  },
  validar: function (documento) {
    if (documento == null) return;
    n = documento.replace(/\D/g, '');
    validado = false;

    var dv1 = n.charAt(11) * 2 + n.charAt(10) * 3 + n.charAt(9) * 4 + n.charAt(8) * 5 + n.charAt(7) * 6 + n.charAt(6) * 7 + n.charAt(5) * 8 + n.charAt(4) * 9 + n.charAt(3) * 2 + n.charAt(2) * 3 + n.charAt(1) * 4 + n.charAt(0) * 5;
    dv1 = CNPJ.calcDV(dv1);

    var dv2 = dv1 * 2 + n.charAt(11) * 3 + n.charAt(10) * 4 + n.charAt(9) * 5 + n.charAt(8) * 6 + n.charAt(7) * 7 + n.charAt(6) * 8 + n.charAt(5) * 9 + n.charAt(4) * 2 + n.charAt(3) * 3 + n.charAt(2) * 4 + n.charAt(1) * 5 + n.charAt(0) * 6;
    dv2 = CNPJ.calcDV(dv2);

    validado = ((dv1.toString() + dv2.toString()) == (n.charAt(12) + n.charAt(13)));
    return validado;
  },
  calcDV: function (dv) {
    dv = 11 - (dv % 11);
    return (dv >= 10) ? 0 : dv;
  }
}



let RG = {
  gerar: function (mascarar) {
    let n1 = r(), n2 = r(), n3 = r(), n4 = r(), n5 = r(), n6 = r(), n7 = r(), n8 = r(), n9 = r();

    let rgGerado = `${n1}${n2}.${n3}${n4}${n5}.${n6}${n7}${n8}-${n9}`;

    return (mascarar) ? rgGerado : rgGerado.replace(/\D/g, '');
  }
}

let PIS = {
  gerar: function (mascarar) {
    const peso = [3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
    const n = String(Math.floor(Math.random() * 10000000000)).padStart(10, '0');

    const somaTotal = n.split('').reduce((acc, value, i) => {
      return acc + (peso[i] * Number(value));
    }, 0);

    const resultado = 11 - (somaTotal % 11);

    let pis = [11, 10].includes(resultado) ? `${n}0` : `${n}${resultado}`;

    if (mascarar) {
      pis = pis.replace(/(\d{3})(\d{5})(\d{2})(\d{1})/, '$1.$2.$3.$4');
    }

    return pis;
  }
}


let IE = {
  gerar: function (mascarar) {
    let n1 = r(), n2 = r(), n3 = r(), n4 = r(), n5 = r(), n6 = r();

    let ieGerado = `${n1}${n2}${n3}.${n4}${n5}${n6}`;
    return (mascarar) ? ieGerado : ieGerado.replace(/\D/g, '');
  },
  validar: function (documento) {
    return (documento.length === 6 && !isNaN(documento));
  }
};

let CEP = {
  gerar: function (mascarar) {
    let ceps = db.ceps;
    let randomIndex = Math.floor(Math.random() * ceps.length);
    let cep = ceps[randomIndex];
    if (mascarar) {
      cep = cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
    }
    return cep;
  }
};


let AG = {
  gerar: function () {
    let agBradesco = db.agBradesco;
    let agItau = db.agItau;
    let agSantander = db.agSantander;
    let agCaixa = db.agCaixa;
    let agbb = db.agbb;

    let randomIndex = Math.floor(Math.random() * agBradesco.length);
    let ag = agBradesco[randomIndex];
    return ag;
  }
};


let BANCOS = {
  consultar: function () {
    let bancos = db.bancos;
    return banco;
  }
};



// Adicione esta função para filtrar os bancos com base no termo de pesquisa
function filterBancos(searchTerm) {
  return db.bancos.filter(banco => banco.name && banco.name.toLowerCase().includes(searchTerm));
}

// Adicione esta função para obter os resultados da busca dinâmica de bancos
function getBancoResults(searchTerm) {
  const filteredBancos = filterBancos(searchTerm);
  return filteredBancos.map(banco => ({ ispb: banco.ispb, name: banco.name, code: banco.code, fullName: banco.fullName }));
}

// Adicione esta função para responder à mensagem da popup com os resultados da busca dinâmica
function searchBancos(request, sender, sendResponse) {
  if (request.type === 'search-bancos') {
    const searchTerm = request.searchTerm.toLowerCase();
    const results = getBancoResults(searchTerm);
    sendResponse({ type: 'search-bancos-result', results });
  }
}

// Adicione um ouvinte para a mensagem da popup que solicita a busca dinâmica de bancos
chrome.runtime.onMessage.addListener(searchBancos);