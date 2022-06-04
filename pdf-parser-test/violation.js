const DEFAULT_VALUE = 0;


const fetchFormattedITRObject = (
    cpl = DEFAULT_VALUE,
    fbi = DEFAULT_VALUE,
    pmi = DEFAULT_VALUE, 
    cav = DEFAULT_VALUE,
    pit = DEFAULT_VALUE,
    kmi = DEFAULT_VALUE,
    tsl = DEFAULT_VALUE,
    tusl = DEFAULT_VALUE,
    ti = DEFAULT_VALUE,
    itrType = DEFAULT_VALUE,
    ay = DEFAULT_VALUE,
    pan = DEFAULT_VALUE,
    message = DEFAULT_VALUE,
    documentAssessmentYear = DEFAULT_VALUE,
    
) => {
    
    return {
        financialManagement:
        {
            totalRevenue: Number(totalRevenue),
            accountsReceivables: Number(accountsReceivables),
            currentLiabilities: Number(currentLiabilities),
            currentAssets: Number(currentAssets),
            totalAssets: Number(totalAssets),
            totalLiabilities: Number(totalLiabilities),
            totalWages: Number(totalWages),
            grossProfitMargin: Number(grossProfitMargin),
            incentives: Number(incentives),
            immediateAndCashEquivalents: Number(immediateAndCashEquivalents),
            interestPayable: Number(interestPayable),
            netProfit: Number(netProfit),
            debtorDays: Number(debtorDays),
            creditorDays: Number(creditorDays),
        },
        financialStanding:
        {
            totalDebt: Number(totalDebt),
            totalEquity: Number(totalEquity),
            totalAssets: Number(totalAssets),
            totalInterestPaid: Number(totalInterestPaid),
            goodsSoldPrice: Number(goodsSoldPrice),
            sundryCreditors: Number(sundryCreditors),
            itrFilingGap: Number(itrFilingGap)
        },
        stabilitySurvival: {
            revenueGrowth: Number(revenueGrowth)
        },
        revenuePotential: {
            totalRevenue: Number(totalRevenue),
            totalExpense: Number(totalExpense),
            turnOver: Number(turnOver)
        },
        insuranceData: {
            commercialPropertyInsurance: isValidInsurance(cpl),
            fireAndBurglaryInsurance: isValidInsurance(fbi),
            plantAndMachineryInsurance: isValidInsurance(pmi),
            commercialAutoOrVehicle: isValidInsurance(cav),
            propertyInTransit: isValidInsurance(pit),
            keyManInsurance: isValidInsurance(kmi)
        },
        others: {
            totalSecuredLoans: Number(tsl),
            totalUnsecuredLoans: Number(tusl),
            netProfit: Number(netProfit),
            depreciation: Number(depreciationAndAmortisation),
            interestPayable: Number(interestPayable),
            totalRevenue: Number(totalRevenue),
            totalIncome: Number(ti)
        },
        metaData: {
            itrType,
            ay,
            pan,
            message
        },
        documentAssessmentYear
    }
}

fetchFormattedITRObject(
    10,
    15,
    24,
    67,
    78,
    78,
    67,
    345,
    89,
    2333,
    '2020-19',
    489
)