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

    /* 
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
     */

    { id: 'semMascara', title: 'Sem Máscara' },
    { id: 's01', type: 'separator' },
    { id: 'comMascara', title: 'Com Máscara' },
    { id: 's02', type: 'separator' },
    { id: 'contatosOutros', title: 'Contatos e Outro' },
    { id: 's03', type: 'separator' },
    { id: 'conta', title: 'Conta Bancária' },

  ];

  const submenus = [

    { parentId: 'semMascara', id: 'cpfSem', title: 'CPF' },
    { parentId: 'semMascara', id: 'rgSem', title: 'RG' },
    { parentId: 'semMascara', id: 'cnh', title: 'CNH' },
    { parentId: 'semMascara', id: 'pisSem', title: 'PIS' },
    { parentId: 'semMascara', id: 'cnsSem', title: 'CNS' },
    { parentId: 'semMascara', id: 'tituloSem', title: 'Título de Eleitor' },
    { parentId: 'semMascara', id: 'passaporte', title: 'Passaporte' },
    { parentId: 'semMascara', id: 's11', type: 'separator' },
    { parentId: 'semMascara', id: 'cnpjSem', title: 'CNPJ' },
    { parentId: 'semMascara', id: 'ieSem', title: 'Insc. Estadual' },
    { parentId: 'semMascara', id: 's12', type: 'separator' },
    { parentId: 'semMascara', id: 'cepSem', title: 'CEP' },
    { parentId: 'semMascara', id: 's13', type: 'separator' },
    { parentId: 'semMascara', id: 'cartaoCreditoSem', title: 'Cartão de Crédito' },
    { parentId: 'semMascara', id: 's14', type: 'separator' },
    { parentId: 'semMascara', id: 'celularSem', title: 'Celular' },
    { parentId: 'semMascara', id: 'telefoneSem', title: 'Telefone' },
    { parentId: 'semMascara', id: 's15', type: 'separator' },
    { parentId: 'semMascara', id: 'placaAntigaSem', title: 'Placa Antiga' },
    { parentId: 'semMascara', id: 'placaMercosulSem', title: 'Placa Mercosul' },
    { parentId: 'semMascara', id: 'renavam', title: 'Renavam' },


    { parentId: 'comMascara', id: 'cpfCom', title: 'CPF (Alt+Shift+F)' },
    { parentId: 'comMascara', id: 'rgCom', title: 'RG' },
    { parentId: 'comMascara', id: 'pisCom', title: 'PIS' },
    { parentId: 'comMascara', id: 'cnsCom', title: 'CNS' },
    { parentId: 'comMascara', id: 'tituloCom', title: 'Título de Eleitor' },
    { parentId: 'comMascara', id: 's21', type: 'separator' },
    { parentId: 'comMascara', id: 'cnpjCom', title: 'CNPJ (Alt+Shift+J)' },
    { parentId: 'comMascara', id: 'ieCom', title: 'Insc. Estadual' },
    { parentId: 'comMascara', id: 's22', type: 'separator' },
    { parentId: 'comMascara', id: 'cepCom', title: 'CEP (Alt+Shift+C)' },
    { parentId: 'comMascara', id: 's23', type: 'separator' },
    { parentId: 'comMascara', id: 'cartaoCreditoCom', title: 'Cartão de Crédito' },
    { parentId: 'comMascara', id: 's24', type: 'separator' },
    { parentId: 'comMascara', id: 'celularCom', title: 'Celular' },
    { parentId: 'comMascara', id: 'telefoneCom', title: 'Telefone' },
    { parentId: 'comMascara', id: 's25', type: 'separator' },
    { parentId: 'comMascara', id: 'placaAntigaCom', title: 'Placa Antiga' },
    { parentId: 'comMascara', id: 'placaMercosulCom', title: 'Placa Mercosul' },

    { parentId: 'contatosOutros', id: 'email', title: 'E-mail' },
    { parentId: 'contatosOutros', id: 's31', type: 'separator' },
    { parentId: 'contatosOutros', id: 'celularCom2', title: 'Celular' },
    { parentId: 'contatosOutros', id: 'telefoneCom2', title: 'Telefone' },
    { parentId: 'contatosOutros', id: 's32', type: 'separator' },
    { parentId: 'contatosOutros', id: 'nomeMas', title: 'Nome Masculino' },
    { parentId: 'contatosOutros', id: 'nomeFem', title: 'Nome Feminino' },
    { parentId: 'contatosOutros', id: 'nickname', title: 'Nickname' },
    { parentId: 'contatosOutros', id: 's33', type: 'separator' },
    { parentId: 'contatosOutros', id: 'dtNasc', title: 'Data Nascimento' },

    { parentId: 'conta', id: 'agBB', title: 'Banco do Brasil - Agência' },
    { parentId: 'conta', id: 'ccBB', title: 'Banco do Brasil - Conta' },
    { parentId: 'conta', id: 's41', type: 'separator' },
    { parentId: 'conta', id: 'agBradesco', title: 'Bradesco - Agência' },
    { parentId: 'conta', id: 'ccBradesco', title: 'Bradesco - Conta' },
    { parentId: 'conta', id: 's42', type: 'separator' },
    { parentId: 'conta', id: 'agCaixa', title: 'Caixa - Agência' },
    { parentId: 'conta', id: 'ccCaixa', title: 'Caixa - Conta' },
    { parentId: 'conta', id: 's43', type: 'separator' },
    { parentId: 'conta', id: 'agCitibank', title: 'Citibank - Agência' },
    { parentId: 'conta', id: 'ccCitibank', title: 'Citibank - Conta' },
    { parentId: 'conta', id: 's44', type: 'separator' },
    { parentId: 'conta', id: 'agHSBC', title: 'HSBC - Agência' },
    { parentId: 'conta', id: 'ccHSBC', title: 'HSBC - Conta' },
    { parentId: 'conta', id: 's45', type: 'separator' },
    { parentId: 'conta', id: 'agItau', title: 'Itaú - Agência' },
    { parentId: 'conta', id: 'ccItau', title: 'Itaú - Conta' },
    { parentId: 'conta', id: 's46', type: 'separator' },
    { parentId: 'conta', id: 'agSantander', title: 'Santander - Agência' },
    { parentId: 'conta', id: 'ccSantander', title: 'Santander - Conta' }
  ];

  const parentId = chrome.contextMenus.create({ id: 'parent', title: 'Gerador de Dados', contexts: ['all', 'editable', 'selection'] });

  menus.forEach(menu => {
    chrome.contextMenus.create({ parentId, contexts: ['all', 'editable'], ...menu });
  });
  submenus.forEach(submenu => {
    chrome.contextMenus.create({ parentId: submenu.parentId, contexts: ['all', 'editable'], ...submenu });
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
    'placaAntigaSem': () => gen.licensePlate.generate(false, false),
    'placaAntigaCom': () => gen.licensePlate.generate(true, false),
    'placaMercosulSem': () => gen.licensePlate.generate(false, true),
    'placaMercosulCom': () => gen.licensePlate.generate(true, true),
    'renavam': () => gen.renavam.generate(),
    'nomeMas': () => gen.name.generate("m"),
    'nomeFem': () => gen.name.generate("f"),
    'dtNasc': () => gen.birthDate.generate(),
    'email': () => gen.email.generateNickname(),
    'celularSem': () => gen.cellphone.generate(false, uf),
    'celularCom': () => gen.cellphone.generate(true, uf),
    'celularCom2': () => gen.cellphone.generate(true, uf),
    'telefoneSem': () => gen.telephone.generate(false, uf),
    'telefoneCom': () => gen.telephone.generate(true, uf),
    'telefoneCom2': () => gen.telephone.generate(true, uf),
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


