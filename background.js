chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({
    mask: false
  });

  let parent = chrome.contextMenus.create({ 'id': 'parent-menu', 'title': 'Gerador de Dados', 'contexts': ['all', 'editable', 'selection'] });

  chrome.contextMenus.create({ 'id': 'cpf-unmasked', 'title': 'CPF sem máscara', 'parentId': parent, 'contexts': ['all', 'editable'] });
  chrome.contextMenus.create({ 'id': 'cpf-masked', 'title': 'CPF com máscara', 'parentId': parent, 'contexts': ['all', 'editable'] });
  chrome.contextMenus.create({ 'id': 'cpf-separator', 'type': 'separator', 'parentId': parent, 'contexts': ['all', 'editable'] });
  chrome.contextMenus.create({ 'id': 'cnpj-unmasked', 'title': 'CNPJ sem máscara', 'parentId': parent, 'contexts': ['all', 'editable'] });
  chrome.contextMenus.create({ 'id': 'cnpj-masked', 'title': 'CNPJ com máscara', 'parentId': parent, 'contexts': ['all', 'editable'] });
  chrome.contextMenus.create({ 'id': 'cnpj-separator', 'type': 'separator', 'parentId': parent, 'contexts': ['all', 'selection'] });
  chrome.contextMenus.create({ 'id': 'rg-unmasked', 'title': 'RG sem máscara', 'parentId': parent, 'contexts': ['all', 'editable'] });
  chrome.contextMenus.create({ 'id': 'rg-masked', 'title': 'RG com máscara', 'parentId': parent, 'contexts': ['all', 'editable'] });
  chrome.contextMenus.create({ 'id': 'rg-separator', 'type': 'separator', 'parentId': parent, 'contexts': ['all', 'editable'] });
  chrome.contextMenus.create({ 'id': 'pis-unmasked', 'title': 'PIS sem máscara', 'parentId': parent, 'contexts': ['all', 'editable'] });
  chrome.contextMenus.create({ 'id': 'pis-masked', 'title': 'PIS com máscara', 'parentId': parent, 'contexts': ['all', 'editable'] });
  chrome.contextMenus.create({ 'id': 'pis-separator', 'type': 'separator', 'parentId': parent, 'contexts': ['all', 'editable'] });
  chrome.contextMenus.create({ 'id': 'ie-unmasked', 'title': 'Inscrição Estadual sem máscara', 'parentId': parent, 'contexts': ['all', 'editable'] });
  chrome.contextMenus.create({ 'id': 'ie-masked', 'title': 'Inscrição Estadual com máscara', 'parentId': parent, 'contexts': ['all', 'editable'] });
  chrome.contextMenus.create({ 'id': 'ie-separator', 'type': 'separator', 'parentId': parent, 'contexts': ['all', 'editable'] });
  chrome.contextMenus.create({ 'id': 'validate-document', 'title': 'Validar CPF ou CNPJ', 'parentId': parent, 'contexts': ['all', 'selection'] });
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
    message = 'Documento ' + numero + ' não foi identicado como CPF ou CNPJ';
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
    let ceps = ['06290200', '03983000', '06458265', '18618004', '03168040', '14711000', '11660300', '11350585', '11674820', '13051221', '06766525', '09842047', '13440005', '17492250', '04225010', '01039901', '13049131', '02127025', '07190017', '09380908', '21362100', '22790765', '25050280', '26410150', '25902700', '24901125', '27960001', '24431090', '23898395', '24471635', '25908519', '24346137', '27524535', '26582350', '28060660', '22765330', '20765465', '21555150', '26279205', '26062025', '29903057', '29016430', '29103580', '29145588', '29141041', '29222320', '29197075', '29227345', '29707318', '29933450', '29315477', '29367980', '29164045', '29197661', '29164008', '29147733', '29104500', '29141360', '29016280', '29706170', '37415848', '33110370', '39401566', '35504655', '37200525', '33236792', '37200420', '35522248', '32070140', '32215122', '36025110', '36576102', '32250010', '35900155', '38620532', '30673140', '36201360', '36400052', '36504032', '39804297', '45208099', '45994725', '41510860', '45540991', '40231300', '45826820', '45826824', '48909273', '42704720', '41300020', '45007610', '45604285', '41500020', '48610772', '41820530', '41340520', '44003102', '45656080', '40720209', '40484540', '49509209', '49026100', '49511625', '49504160', '49007164', '49400974', '49504024', '49037239', '49027240', '49500268', '49320972', '49060480', '49096255', '49088046', '49502049', '49072636', '49047010', '49007256', '49700973', '49087380', '54325374', '55606500', '52081295', '50920135', '53530080', '54520696', '50760265', '54759166', '55190810', '54517270', '53180410', '54160630', '55191681', '55037255', '50660305', '54735710', '54170540', '54130470', '55043160', '54580120', '57085074', '57071102', '57607500', '57071382', '57071639', '57303064', '57081531', '57307400', '57072890', '57200959', '57072294', '57073578', '57245259', '57303845', '57602640', '57600970', '57603070', '57018403', '57500959', '57230991', '58074172', '58432448', '58071636', '58423105', '58038262', '58015050', '58028680', '58083672', '58665000', '58033220', '58038570', '58900970', '58088550', '58068512', '58706083', '58707020', '58084000', '58060108', '58038341', '58050220', '59104058', '59054977', '59632220', '59293396', '59071050', '59138604', '59142095', '59082105', '59143010', '59294543', '59145208', '59139260', '59086130', '59603764', '59607073', '59600168', '59088020', '59464959', '59035325', '59114678', '60833192', '63015500', '62322655', '60541716', '60420710', '63908225', '60835195', '60355420', '60430420', '62880105', '61919470', '61605075', '60877504', '61656132', '60835810', '63900585', '60545660', '61923112', '60182170', '62039703', '64034578', '64013070', '64018410', '64004470', '64038065', '64028570', '64012615', '64033700', '64083220', '64042084', '64051110', '64019375', '64009680', '64062080', '64081160', '64079133', '64016400', '64690970', '64078166', '64012283', '65905606', '65067220', '65609455', '65057410', '65632435', '65058767', '65605660', '65082010', '65940970', '65470000', '65070010', '65043150', '65635568', '65075047', '65035830', '65041869', '65631391', '65090572', '65909330', '65095357', '68620972', '68555231', '66080235', '68550017', '68552045', '68377740', '66811785', '66623140', '67103340', '66085300', '67215045', '67146068', '66915140', '68627125', '68746253', '68744435', '68745570', '66920540', '68555151', '66033150', '68901340', '68906305', '68908645', '68903585', '68928003', '68904366', '68904344', '68904397', '68906120', '68909327', '68909362', '68926310', '68900090', '68928271', '68909809', '68929540', '68905735', '68911380', '68909525', '68903331', '69077160', '69101179', '69088343', '69073042', '69098097', '69018562', '69065030', '69054959', '69086070', '69036668', '69078690', '69020124', '69037478', '69088277', '69099625', '69088072', '69088077', '69006560', '69065008', '69060360', '69317468', '69307755', '69301350', '69301130', '69304032', '69304070', '69313278', '69316430', '69301225', '69315245', '69313013', '69317530', '69314104', '69313092', '69310015', '69312170', '69306640', '69308370', '69313138', '69313478', '69401092', '69553435', '69400359', '69403646', '69400125', '69555250', '69402108', '69552015', '69400619', '69403652', '69430000', '69400146', '69403706', '69402078', '69401562', '69736000', '69730970', '69402247', '69402570', '69552735', '69911057', '69914328', '69921413', '69915712', '69915004', '69902819', '69905020', '69955959', '69908852', '69908087', '69906260', '69921392', '69909008', '69912054', '69905151', '69909738', '69975959', '69901018', '69906508', '69911522', '72546608', '72320213', '72001345', '71996370', '70674013', '72603218', '72127200', '71551400', '72543302', '72145836', '71575310', '72630111', '72444141', '70835530', '71587078', '70390155', '72428083', '72320212', '72242165', '71635020', '72809185', '72870101', '72863424', '72875062', '72922671', '72883036', '72917092', '72860576', '72870052', '72890060', '72853038', '72926284', '73060515', '73368320', '72873237', '72928070', '73020070', '72865439', '72859292', '72833101', '74482504', '75903561', '74672700', '75697570', '75110180', '74775082', '75245000', '74690750', '75837595', '75094570', '74335190', '75807190', '74886073', '74975385', '75804190', '75680748', '75513457', '75388226', '74565660', '74810085', '76982204', '76985456', '76907629', '76820718', '76820523', '76980784', '76985034', '76982106', '76913078', '76870141', '76804596', '76963600', '76912742', '76889959', '76821468', '76828600', '76985542', '76901012', '76985730', '76901872', '77001869', '77930000', '77829334', '77475000', '77829320', '77829012', '77064018', '77060017', '77060770', '77815842', '77816270', '77827500', '77827630', '77816420', '77820170', '77816500', '77416060', '77829090', '77827350', '77016520', '78091548', '78057216', '78551373', '78898112', '78201570', '78131240', '78211328', '78725580', '78110153', '78725384', '78601192', '78721616', '78553298', '78050513', '78200520', '78144460', '78058348', '78551374', '78718150', '78890049', '79816154', '79310220', '79903400', '79096854', '79037031', '79050913', '79905338', '79002360', '79046232', '79630233', '79010450', '79903358', '79014240', '79040690', '79062461', '79072415', '79814430', '79036566', '79011160', '79170959', '87504576', '84022492', '85606527', '81315040', '81305560', '87200256', '86805380', '84272470', '87014220', '80530913', '84165450', '85867070', '86070545', '87035210', '85301040', '85861439', '87501650', '86055450', '83608246', '86183834', '88306000', '88040100', '89210641', '89711890', '88015902', '89020300', '89302060', '88025250', '89710380', '88134720', '89035610', '88133670', '89062395', '88512475', '88119341', '89255340', '89564400', '89213601', '89207255', '88312135', '91770430', '94450555', '97542601', '98792340', '91240210', '91550101', '94430314', '96045040', '95910310', '91540600', '96405340', '94970550', '97110710', '95034570', '96405030', '96785134', '95072200', '91520458', '93808042', '99705703'];

    let randomIndex = Math.floor(Math.random() * ceps.length);
    let cep = ceps[randomIndex];

    /* 
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(response => response.json())
      .then(data => {
        console.log(data); // Aqui você pode fazer o que quiser com os dados da API
      })
      .catch(error => console.error('Erro ao chamar a API ViaCEP', error));
    */

    if (mascarar) {
      cep = cep.replace(/^(\d{5})(\d{3})$/, '$1-$2');
    }
    return cep;
  }
};


let AG = {
  gerar: function () {
    let agBradesco = ['23', '31', '46', '90', '95', '104', '105', '108', '109', '131', '136', '152', '197', '268', '296', '322', '451', '468', '495', '498', '503', '504', '549', '614', '627', '653', '665', '680', '701', '707', '760', '762', '764', '768', '774', '787', '812', '821', '825', '840', '846', '849', '857', '859', '866', '870', '884', '889', '909', '924', '927', '938', '962', '975', '977', '978', '989', '992', '1003', '1019', '1022', '1030', '1034', '1039', '1040', '1041', '1043', '1045', '1048', '1050', '1051', '1056', '1059', '1063', '1065', '1067', '1071', '1073', '1084', '1086', '1088', '1090', '1092', '1095', '1177', '1221', '1227', '1265', '1382', '1431', '1518', '1628', '1656', '1657', '1658', '1667', '1668', '1669', '1670', '1671', '1673', '1676', '1683', '1687', '1688', '1690', '1696', '1701', '1707', '1708', '1718', '1720', '1747', '1752', '1755', '1757', '1759', '1762', '1763', '1764', '1767', '1768', '1769', '1770', '1773', '1782', '1787', '1794', '1796', '1799', '1814', '1817', '1833', '1837', '1838', '1845', '1851', '1860', '1945', '1975', '1991', '1998', '2036', '2127', '2130', '2144', '2231', '2243', '2265', '2278', '2300', '2317', '2318', '2322', '2323', '2326', '2328', '2329', '2337', '2338', '2342', '2343', '2370', '2375', '2377', '2380', '2381', '2385', '2389', '2390', '2403', '2435', '2494', '2495', '2503', '2515', '2516', '2519', '2526', '2560', '2573', '2580', '2584', '2590', '2593', '2594', '2616', '2624', '2630', '2649', '2650', '2652', '2661', '2663', '2665', '2667', '2668', '2680', '2691', '2692', '2696', '2705', '2719', '2774', '2832', '2833', '2856', '2896', '2897', '2948', '2958', '2983', '3089', '3176', '3180', '3193', '3199', '3204', '3220', '3221', '3225', '3228', '3239', '3241', '3243', '3244', '3245', '3246', '3247', '3250', '3256', '3259', '3261', '3264', '3334', '3335', '3338', '3418', '3424', '3441', '3465', '3466', '3480', '3483', '3486', '3487', '3489', '3494', '3497', '3531', '3539', '3541', '3554', '3560', '3561', '3564', '3568', '3599', '3614', '3636', '3642', '3647', '3648', '3753', '3757', '3761', '3763', '3764', '3765', '3766', '3767', '3768', '3769', '3777', '3795', '3796', '3798', '3799', '3803', '3804', '3805', '3841', '3854', '3952', '5247', '5308', '5639', '5670', '5673', '5694', '5716', '5718', '5720', '5721', '5723', '5724', '5726', '5727', '5749', '5750', '5753', '5755', '5758', '5760', '5840', '5904', '5930', '5947', '5968', '6012', '6068', '6074', '6077', '6083', '6087', '6097', '6117', '6123', '6124', '6130', '6154', '6170', '6198', '6199', '6224', '6246', '6294', '6454', '6468', '6588', '6589', '6591', '6592', '6593', '6594', '6595', '6596', '6597', '6598', '6600', '6601', '6602', '6603', '6618', '6619', '6621', '6628', '6638', '6710', '6902', '7001', '7007', '7014', '7025', '7031', '7033', '7034', '7041', '7044', '7048', '7049', '7050', '7051', '7053', '7056', '7057', '7058', '7060', '7072', '7073', '7075', '7088', '7090', '7091', '7093', '7095', '7096', '7101', '7102', '7104', '7106', '7110', '7111', '7114', '7115', '7125', '7130', '7173', '7177', '7185', '7192', '7197', '7198', '7200', '7201', '7202', '7208', '7209', '7210', '7218', '7220', '7238', '7242', '7254', '7255', '7257', '7259', '7274', '7304', '7305', '7325', '7338', '7383', '7384', '7387', '7633', '7642', '7652', '7654', '7656', '7658', '7667', '7674', '7675', '7679', '7680', '7683', '7687', '7695', '7704', '7709', '7711', '7715', '7717', '7718', '7731', '7732', '7733', '7737', '7738', '7742', '7744', '7748', '7749', '7750', '7754', '7762', '7766', '7769', '7770', '7774', '7775', '7782', '7783', '7791', '7795', '7796', '7800', '7808', '7809', '7810', '7819', '7824', '7827', '7828', '7829', '7833', '7844', '7850', '7851', '7855', '7863', '7864', '7865', '7869', '7870', '7871', '7873', '7876', '7877', '7882', '7887', '7888', '7890', '7891', '7894', '7895', '7896', '7898', '7899', '7900', '7902', '7903', '7904', '7905', '7907', '7911', '7913', '7915', '7917', '7920', '7922', '7925', '7927', '7928', '7936', '7938', '7941', '7958', '7979', '7980', '7981', '7982', '7983', '7988', '7991', '7999'];
    let agItau = ['32', '35', '37'];
    let agSantander = ['45', '101', '3010'];
    let agCaixa = ['17', '21', '22'];
    let agbb = ['1234', '23456', '652'];

    let randomIndex = Math.floor(Math.random() * agBradesco.length);
    let ag = agBradesco[randomIndex];
    return ag;
  }
};


