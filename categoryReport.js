const _ = require('lodash');

let entireVoucherList = [
    {
        "_id": "629276466c00bb3dfc5e6a41",
        "isDeleted": false,
        "orgId": "629113215ac5ff359c5c84a6",
        "voucherheadId": "629123994b61c33e703339f3",
        "transactionType": "Debit",
        "accbookId": "6292721bda77f80df887b3fd",
        "particulars": "remark",
        "amount": 1010,
        "updatedBy": "6291128a5ac5ff359c5c849a",
        "createdBy": "6291128a5ac5ff359c5c849a",
        "createdAt": "2022-05-28T19:21:42.318Z",
        "updatedAt": "2022-05-28T19:21:42.318Z",
        "voucherNumber": 4,
        "__v": 0
    },
    {
        "_id": "629276466c00bb3dfc5e6a41",
        "isDeleted": false,
        "orgId": "629113215ac5ff359c5c84a6",
        "voucherheadId": "629123994b61c33e703339f4",
        "transactionType": "Credit",
        "accbookId": "6292721bda77f80df887b3fd",
        "particulars": "remark",
        "amount": 7000,
        "updatedBy": "6291128a5ac5ff359c5c849a",
        "createdBy": "6291128a5ac5ff359c5c849a",
        "createdAt": "2022-05-28T19:21:42.318Z",
        "updatedAt": "2022-05-28T19:21:42.318Z",
        "voucherNumber": 4,
        "__v": 0
    }
]

let entireReceiptList = [
    {
        "_id": "6295120f2210e43d688d2fbe",
        "receiptDate": "2022-05-27T08:17:45.023Z",
        "isDeleted": false,
        "receiptDetails": [
            {
                "amount": 1000,
                "_id": "62951f23b3819c4994d20a77",
                "categoryId": "6293a1f201a8132f58c90394",
                "transactionType": "Credit",
                "accbookId": "6292721bda77f80df887b3fd",
                "particulars": "remark"
            },
            {
                "amount": 1000,
                "_id": "62951f23b3819c4994d20a78",
                "categoryId": "62913099d2abfb4a1432729a",
                "transactionType": "Debit",
                "accbookId": "6292721bda77f80df887b3fd",
                "particulars": "remark"
            }
        ],
        "orgId": "629113215ac5ff359c5c84a6",
        "studentId": "629229269f338244f0401d3b",
        "receiptNumber": 28,
        "totalAmount": 5000,
        "createdBy": "6291128a5ac5ff359c5c849a",
        "createdAt": "2022-05-30T18:50:55.155Z",
        "updatedAt": "2022-05-30T19:46:43.675Z",
        "__v": 0,
        "updatedBy": "6291128a5ac5ff359c5c849ae"
    },
    {
        "_id": "6295120f2210e43d688d2fbe",
        "receiptDate": "2022-05-27T08:17:45.023Z",
        "isDeleted": false,
        "receiptDetails": [
            {
                "amount": 10000,
                "_id": "62951f23b3819c4994d20a77",
                "categoryId": "6293a1f201a8132f58c90394",
                "transactionType": "Credit",
                "accbookId": "6292721bda77f80df887b3fd",
                "particulars": "remark"
            },
            {
                "amount": 4000,
                "_id": "62951f23b3819c4994d20a78",
                "categoryId": "62913099d2abfb4a1432729a",
                "transactionType": "Debit",
                "accbookId": "6292721bda77f80df887b3fd",
                "particulars": "remark"
            }
        ],
        "orgId": "629113215ac5ff359c5c84a6",
        "studentId": "629229269f338244f0401d3b",
        "receiptNumber": 28,
        "totalAmount": 5000,
        "createdBy": "6291128a5ac5ff359c5c849a",
        "createdAt": "2022-05-30T18:50:55.155Z",
        "updatedAt": "2022-05-30T19:46:43.675Z",
        "__v": 0,
        "updatedBy": "6291128a5ac5ff359c5c849ae"
    }
]

let accountList = [
    {
        "_id": "6292721bda77f80df887b3fd",
        "openingBalance": 10,
        "openingDate": "2022-01-02T00:00:00.000Z",
        "closingBalance": 4500,
        "isActive": true,
        "isDeleted": false,
        "accbookName": "HDFC BANK C/A",
        "remarks": "",
        "orgId": "629113215ac5ff359c5c84a6",
        "accbookNumber": 1,
        "updatedBy": "6291128a5ac5ff359c5c849a",
        "createdBy": "6291128a5ac5ff359c5c849a",
        "createdAt": "2022-05-28T19:03:55.388Z",
        "updatedAt": "2022-05-30T19:46:43.686Z",
        "__v": 0
    },
    {
        "_id": "6292721bda77f80df887b3fd",
        "openingBalance": 0,
        "openingDate": "2022-01-02T00:00:00.000Z",
        "closingBalance": 4500,
        "isActive": true,
        "isDeleted": false,
        "accbookName": "HDFC BANK C/A",
        "remarks": "",
        "orgId": "629113215ac5ff359c5c84a6",
        "accbookNumber": 1,
        "updatedBy": "6291128a5ac5ff359c5c849a",
        "createdBy": "6291128a5ac5ff359c5c849a",
        "createdAt": "2022-05-28T19:03:55.388Z",
        "updatedAt": "2022-05-30T19:46:43.686Z",
        "__v": 0
    }
]

const receiptCategoryList = [
    {
        "_id": "6293a1f201a8132f58c90394",
        receiptName: "receipt_1"
    },
    {
        "_id": "62913099d2abfb4a1432729a",
        receiptName: "receipt_2"
    }
];

const voucherCategory = [
    {
        "_id": "629123994b61c33e703339f3",
        voucherName: "Voucher_1"
    },
    {
        "_id": "629123994b61c33e703339f4",
        voucherName: "Voucher_2"
    }
];

/**
 * // do filtering operation with query with from and to date 
 * let entireVoucherList = await Voucher.find({  }) 
 */

const getTotalSum = (detailedInfo, propertyName = 'amount') => {
    return _.sumBy(detailedInfo, propertyName)
}

const getVoucherSummary = (list = []) => {

    let creditInfo = list.filter((item) => item.transactionType === "Credit");

    let debitInfo = list.filter((item) => item.transactionType === "Debit");

    let totalCreditInfo = getTotalSum(creditInfo);

    let totalDebitInfo = getTotalSum(debitInfo);

    return totalCreditInfo - totalDebitInfo
}

const getReceiptSummary = (list = []) => {

    let extractedReceiptDetails = list.map(item => item.receiptDetails);

    let updatedReceiptList = _.flattenDeep(extractedReceiptDetails);

    return getReceiptTransactionCalculation(updatedReceiptList)
}

const getAccountBookSummary = (list = []) => {

    let totalOpeningBalance = getTotalSum(list, 'openingBalance');

    let totalClosingBalance = getTotalSum(list, 'closingBalance');

    return { totalOpeningBalance, totalClosingBalance }
}

const getTransactionCalculation = (list = []) => {

    let creditInfo = list.filter((item) => item.transactionType === "Credit");

    let debitInfo = list.filter((item) => item.transactionType === "Debit");

    let totalCreditInfo = getTotalSum(creditInfo);

    let totalDebitInfo = getTotalSum(debitInfo);

    return { totalCreditInfo, totalDebitInfo }
}

const getVoucherCategoryReport = (categoryList = voucherCategory, list = entireVoucherList) => {

    const groupedVoucherSummary = [];

    categoryList.map(item => {

        let filteredVoucherList = [];

        list.filter(entry => {

            if (item._id === entry.voucherheadId) { filteredVoucherList.push(entry) }

        })

        groupedVoucherSummary.push({
            voucherId: item._id,
            voucherName: item.voucherName,
            transactions: filteredVoucherList
        })
    })

    return groupedVoucherSummary.map(item => {

        const { transactions = [], voucherName, _id } = item;

        return { voucherCategoryId: _id, voucherName, summary: getTransactionCalculation(transactions) }
    })
}

const getReceiptCategoryReport = (categoryList = receiptCategoryList, list = entireReceiptList) => {

    let extractedReceiptDetails = list.map(item => item.receiptDetails);

    let updatedReceiptList = _.flattenDeep(extractedReceiptDetails);

    const groupedReportSummary = [];

    categoryList.map(item => {

        let filteredReceiptList = [];

        updatedReceiptList.filter(entry => {

            if (item._id === entry.categoryId) { filteredReceiptList.push(entry) }

        })

        groupedReportSummary.push({
            receiptId: item._id,
            receiptName: item.receiptName,
            transactions: filteredReceiptList
        })
    })

    return groupedReportSummary.map(item => {
        const { transactions = [], _id, receiptName } = item;
        return { receiptCategoryId: _id, receiptName, summary: getTransactionCalculation(transactions) }
    })
}

const getTotalCategoryBasedSummaryReport = async() => {

    const voucherCategory = await VoucherCategorySchema.find();

    const receiptCategory = await ReceiptCategorySchema.find();

    const voucherList = await Voucher.find();

    const receiptList = await Receipt.find();

    let receiptSummary = getReceiptCategoryReport(receiptCategory, receiptList);

    let voucherSummary = getVoucherCategoryReport(voucherCategory, voucherList);

    return { receiptSummary, voucherSummary }

}