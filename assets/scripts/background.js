import gen from './generator.js';

function sortState() {
  const ufArr = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];
  const uf = ufArr[Math.floor(Math.random() * ufArr.length)];
  return uf;
}

function sendMessage(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { tag: 'showDocument', message });
  });
}

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ mask: false });

  const menus = [
    { id: 'cepSem', title: 'CEP sem máscara' },
    { id: 'cpfSem', title: 'CPF sem máscara' },
    { id: 'cnpjSem', title: 'CNPJ sem máscara' },
    { id: 'rgSem', title: 'RG sem máscara' },
    { id: 'cnh', title: 'CNH' },
    { id: 'tituloSem', title: 'Título de Eleitor sem máscara' },
    { id: 'pisSem', title: 'PIS sem máscara' },
    { id: 'cnsSem', title: 'CNS sem máscara' },
    { id: 'passaporte', title: 'Passaporte' },
    { id: 'ieSem', title: 'Insc. Estadual sem máscara' },
    { id: 'nomeMas', title: 'Nome Masculino' },
    { id: 'nomeFem', title: 'Nome Feminino' },
    { id: 'email', title: 'E-mail' },
    { id: 'nickname', title: 'Nickname' },
    { id: 'dtNasc', title: 'Data Nascimento' },
    { id: 'cartaoCreditoSem', title: 'Cartão de Crédito sem máscara' },

    { id: 's01', type: 'separator' },

    { id: 'cepCom', title: 'CEP com máscara (Alt + Shift + C)' },
    { id: 'cpfCom', title: 'CPF com máscara (Alt + Shift + F)' },
    { id: 'cnpjCom', title: 'CNPJ com máscara (Alt + Shift + J)' },
    { id: 'rgCom', title: 'RG com máscara' },
    { id: 'tituloCom', title: 'Título de Eleitor com máscara' },
    { id: 'pisCom', title: 'PIS com máscara' },
    { id: 'cnsCom', title: 'CNS com máscara' },
    { id: 'ieCom', title: 'Insc. Estadual com máscara' },
    { id: 'cartaoCreditoCom', title: 'Cartão de Crédito com máscara' },

    { id: 's02', type: 'separator' },

    { id: 'conta', title: 'Conta Bancária' }
  ];

  const submenus = [
    { parentId: 'conta', id: 'agBB', title: 'Banco do Brasil - Agência' },
    { parentId: 'conta', id: 'ccBB', title: 'Banco do Brasil - Conta' },
    { parentId: 'conta', id: 'agBradesco', title: 'Bradesco - Agência' },
    { parentId: 'conta', id: 'ccBradesco', title: 'Bradesco - Conta' },
    { parentId: 'conta', id: 'agCaixa', title: 'Caixa - Agência' },
    { parentId: 'conta', id: 'ccCaixa', title: 'Caixa - Conta' },
    { parentId: 'conta', id: 'agCitibank', title: 'Citibank - Agência' },
    { parentId: 'conta', id: 'ccCitibank', title: 'Citibank - Conta' },
    { parentId: 'conta', id: 'agHSBC', title: 'HSBC - Agência' },
    { parentId: 'conta', id: 'ccHSBC', title: 'HSBC - Conta' },
    { parentId: 'conta', id: 'agItau', title: 'Itaú - Agência' },
    { parentId: 'conta', id: 'ccItau', title: 'Itaú - Conta' },
    { parentId: 'conta', id: 'agSantander', title: 'Santander - Agência' },
    { parentId: 'conta', id: 'ccSantander', title: 'Santander - Conta' }
  ];

  const parentId = chrome.contextMenus.create({ id: 'parent', title: 'Gerador de Dados', contexts: ['all', 'editable', 'selection'] });

  menus.forEach(menu => {
    chrome.contextMenus.create({ parentId, contexts: ['all', 'editable'], ...menu });
  });
  submenus.forEach(submenu => {
    chrome.contextMenus.create({ parentId: submenu.parentId, contexts: ['all', 'editable'], id: submenu.id, title: submenu.title });
  });
});

chrome.contextMenus.onClicked.addListener((info, tabs) => {
  let uf = sortState();

  const generators = {
    'cepSem': () => gen.address.generate(false, uf)[0],
    'cepCom': () => gen.address.generate(true, uf)[0],
    'cpfSem': () => gen.cpf.generate(false, uf),
    'cpfCom': () => gen.cpf.generate(true, uf),
    'rgSem': () => gen.rg.generate(false, uf),
    'rgCom': () => gen.rg.generate(true, uf),
    'cnh': () => gen.cnh.generate(),
    'tituloSem': () => gen.voterTitle.generate(false, uf),
    'tituloCom': () => gen.voterTitle.generate(true, uf),
    'pisSem': () => gen.pis.generate(false),
    'pisCom': () => gen.pis.generate(true),
    'cnsSem': () => gen.cns.generate(false),
    'cnsCom': () => gen.cns.generate(true),
    'passaporte': () => gen.passport.generate(),
    'cnpjSem': () => gen.cnpj.generate(false),
    'cnpjCom': () => gen.cnpj.generate(true),
    'ieSem': () => gen.ie.generate(false),
    'ieCom': () => gen.ie.generate(true),
    'nomeMas': () => gen.name.generate("m"),
    'nomeFem': () => gen.name.generate("f"),
    'dtNasc': () => gen.birthDate.generate(),
    'email': () => gen.email.generateNickname(),
    'nickname': () => gen.nickname.generate(),
    'cartaoCreditoSem': () => gen.creditCard.generate(false).number,
    'cartaoCreditoCom': () => gen.creditCard.generate(true).number,

    'agBB': () => gen.bankAccount.generateSortBank('Banco do Brasil').agency,
    'ccBB': () => gen.bankAccount.generateSortBank('Banco do Brasil').account,
    'agBradesco': () => gen.bankAccount.generateSortBank('Bradesco').agency,
    'ccBradesco': () => gen.bankAccount.generateSortBank('Bradesco').account,
    'agCaixa': () => gen.bankAccount.generateSortBank('Caixa').agency,
    'ccCaixa': () => gen.bankAccount.generateSortBank('Caixa').account,
    'agCitibank': () => gen.bankAccount.generateSortBank('Citibank').agency,
    'ccCitibank': () => gen.bankAccount.generateSortBank('Citibank').account,
    'agHSBC': () => gen.bankAccount.generateSortBank('HSBC').agency,
    'ccHSBC': () => gen.bankAccount.generateSortBank('HSBC').account,
    'agItau': () => gen.bankAccount.generateSortBank('Itau').agency,
    'ccItau': () => gen.bankAccount.generateSortBank('Itau').account,
    'agSantander': () => gen.bankAccount.generateSortBank('Santander').agency,
    'ccSantander': () => gen.bankAccount.generateSortBank('Santander').account
  };


  const generator = generators[info.menuItemId];
  if (generator) {
    sendMessage(generator());
  }
});

chrome.commands.onCommand.addListener(async (command) => {
  let uf = sortState();
  if (command === 'cep') {
    sendMessage(gen.address.generate(true, uf)[0]);
  }
  if (command === 'cpf') {
    sendMessage(gen.cpf.generate(true, uf));
  }
  if (command === 'cnpj') {
    sendMessage(gen.cnpj.generate(true, uf));
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    chrome.scripting.executeScript({
      target: { tabId: tabId },
      files: ['./assets/scripts/foreground.js']
    })
      .catch(err => console.log(err));
  }
});


