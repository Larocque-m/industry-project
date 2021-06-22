/* eslint-disable max-len */

let currentAge = document.getElementById('currentAge').value
let currentIncome = document.getElementById('currentIncome').value
let incomeIncrease = (document.getElementById('incomeIncrease').value) / 100
let incomeContributed = (document.getElementById('incomeContributed').value) / 100
let retirementAge = document.getElementById('retirementAge').value
let retirementSavings = document.getElementById('retirementSavings').value
let assetsReturn = .05

// let assetsReturn = document.getElementById('assetsReturn').value

const yearsRetired = (90 - retirementAge)

const anticSpending = 120000

const retirementBalance = () => {
  let balance = (
    (currentIncome * incomeContributed) *
    (((1 + assetsReturn) ** (retirementAge - currentAge)) - ((1 + incomeIncrease) ** (retirementAge - currentAge))) /
    (assetsReturn - incomeIncrease) + (retirementSavings * ((1 + assetsReturn) ** (retirementAge - currentAge)))
  )

  document.getElementById('balance').innerHTML = balance.toFixed(2)

  return balance.toFixed(2)
}

const retirementIncomePerYear = () => {
  let negativeYearsRetired = -yearsRetired
  let incomeBalance = (((assetsReturn * retirementBalance()) / (1 - (1 + assetsReturn) ** negativeYearsRetired)))

  document.getElementById('incomeBalance').innerHTML = incomeBalance.toFixed(2)

  return incomeBalance.toFixed(2)
}

const yearsWithRetirementIncome = () => {
  try {
    const yearsWithIncome = (Math.log((anticSpending / (anticSpending - retirementBalance() * assetsReturn))) / Math.log(1 + assetsReturn))

    document.getElementById('yearsWithIncome').innerHTML = yearsWithIncome.toFixed(1)

    return yearsWithIncome.toFixed(1)
  }
  catch (error) {
    console.alert('Put error message here', error) // 500 status error
  }
}

// test data
// const currentAge = 40
// const currentIncome = 100000
// const incomeIncrease = .02
// const incomeContributed = .25
// const retirementAge = 65
// const retirementSavings = 200000
// const assetsReturn = .05

// calling function
// console.log(retirementBalance())
// console.log(retirementIncomePerYear())
// console.log(yearsWithRetirementIncome())

// module.exports = {
//   retirementBalance,
//   retirementIncomePerYear,
//   yearsWithRetirementIncome
// }
