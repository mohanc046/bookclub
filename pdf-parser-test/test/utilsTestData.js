var parsedSampleData = [
  ['Total', 'Revenue', '', '', 0],
  ['10Total10100', '', '', ''],
  [90,'96',' !57','',''],
  ['', '', '', '', ''],
  ['10Total10100', '', '', '', ''],
  ['', '10Total10100', '', '', '', ''],
  ['','Assessment Year : 2019-20', '', '', '', '2019'],
  ['', '', '', '', '2019'],
  ['Assessment Year : ', '', '', '', '2019'],
  ['Total','10','Revenue',5,0],
  ['Total','','Revenue',5,0]
]

var itrInfoSampleData = [
  {
    type: '',
    assessmentYear: ''
  },
  {

  },
  {
    itrType: 'ITR-7',
    assessmentYear: '2019-20'
  },
  {
    itrType: 'ITR7',
    assessmentYear: '201920'
  },
  {
    type: '',
    assessmentYear: ''
  }
]

var extractedNestedArrayData = [
  '',
  'Current assets\n' +
  'Inventories\n' +
  'A.Raw materialsiA0\n' +
  'B. Work-in-progressiB0\n' +
  'C.Finished goodsiC0\n' +
  'D.Stock-in-trade (in respect of goods\n' +
  'acquired for trading)\n' +
  'iD0\n' +
  'E.Stores/consumables including\n' +
  'packing material\n' +
  'iE0\n' +
  'F.Loose toolsiF0\n' +
  'G.OthersiG0\n' +
  'i\n' +
  'H. Total (iA + iB + iC + iD + iE + iF + iG)iH0\n' +
  'Sundry Debtors\n' +
  'A.Outstanding for more than one yeariiA0\n' +
  'B.OthersiiB0\n' +
  'ii\n' +
  'C.Total Sundry DebtorsiiC100\n' +
  'Cash and bank balances\n' +
  'A.Balance with banksiiiA0\n' +
  'B.Cash-in-handiiiB0\n' +
  'C.OthersiiiC0\n' +
  'iii\n' +
  'D. Total Cash and cash equivalents (iiiA + iiiB + iiiC)iiiD0\n' +
  'ivOther Current Assetsaiv0\n' +
  'a\n' +
  'vTotal current assets(iH +iiC + iiiD + aiv)av0',
  '',
  '',
  '',
  '',
  '',
  ''
];

var itrFormTypeData = [
  [
    ['ITR-5', '', ''],
    ['', '', '', '']
  ],
  [
    [], [], []
  ],
  [], [], [], [], [], []
]


module.exports = { parsedSampleData,extractedNestedArrayData,itrFormTypeData,itrInfoSampleData }