import gen from './generator.js';

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ mask: false });

  const menus = [
    { id: 'cpfSem', title: 'CPF sem máscara' },
    { id: 'cpfCom', title: 'CPF com máscara' },
    { id: 'rgSem', title: 'RG sem máscara' },
    { id: 'rgCom', title: 'RG com máscara' },
    { id: 'cnh', title: 'CNH' },
    { id: 'tituloSem', title: 'Título de Eleitor sem máscara' },
    { id: 'tituloCom', title: 'Título de Eleitor com máscara' },
    { id: 'pisSem', title: 'PIS sem máscara' },
    { id: 'pisCom', title: 'PIS com máscara' },
    { id: 'cnsSem', title: 'CNS sem máscara' },
    { id: 'cnsCom', title: 'CNS com máscara' },
    { id: 'passaporte', title: 'Passaporte' },
    { id: 's01', type: 'separator' },
    { id: 'cnpjSem', title: 'CNPJ sem máscara' },
    { id: 'cnpjCom', title: 'CNPJ com máscara' },
    { id: 'ieSem', title: 'Insc. Estadual sem máscara' },
    { id: 'ieCom', title: 'Insc. Estadual com máscara' },
    { id: 's02', type: 'separator' },
    { id: 'nomeMas', title: 'Nome Masculino' },
    { id: 'nomeFem', title: 'Nome Feminino' },
    { id: 'email', title: 'E-mail' },
    { id: 'nickname', title: 'Nickname' },
    { id: 'dtNasc', title: 'Data Nascimento' },
    { id: 's03', type: 'separator' },
    { id: 'cartaoCreditoSem', title: 'Cart. Crédito sem máscara' },
    { id: 'cartaoCreditoCom', title: 'Cart. Crédito com máscara' },
    { id: 's04', type: 'separator' },
    { id: 'ag237', title: 'Ag. Bradesco' },
    { id: 'ag104', title: 'Ag. Caixa' },
    { id: 'ag341', title: 'Ag. Itaú' },
    { id: 'ag33', title: 'Ag. Santande' }
  ];

  const parentId = chrome.contextMenus.create({ id: 'parent', title: 'Gerador de Dados2', contexts: ['all', 'editable', 'selection'] });

  menus.forEach(menu => {
    chrome.contextMenus.create({ parentId, contexts: ['all', 'editable'], ...menu });
  });
});

chrome.contextMenus.onClicked.addListener((info, tabs) => {
  const ufArr = [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"
  ];
  const uf = ufArr[Math.floor(Math.random() * ufArr.length)];

  const generators = {
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
    'ag237': () => gen.bank.generate(237).agency,
    'ag104': () => gen.bank.generate(104).agency,
    'ag341': () => gen.bank.generate(341).agency,
    'ag33': () => gen.bank.generate(33).agency,

  };

  const generator = generators[info.menuItemId];
  if (generator) {
    sendMessage(generator());
  }
});

function sendMessage(message) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { tag: 'showDocument', message });
  });
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
