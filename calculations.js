/* eslint-disable max-len */

// the retirementBalance function calculates the entire balance the user will have saved at the age of retirement
const retirementBalance = () => {
  let currentAge = document.getElementById('currentAge').value
  let currentIncome = document.getElementById('currentIncome').value
  let incomeIncrease = (document.getElementById('incomeIncrease').value) / 100
  let incomeContributed = (document.getElementById('incomeContributed').value) / 100
  let retirementAge = document.getElementById('retirementAge').value
  let retirementSavings = document.getElementById('retirementSavings').value
  let assetsReturn = (document.getElementById('assetsReturn').value) / 100

  let balance = (
    (currentIncome * incomeContributed) *
    (((1 + assetsReturn) ** (retirementAge - currentAge)) - ((1 + incomeIncrease) ** (retirementAge - currentAge))) /
    (assetsReturn - incomeIncrease) + (retirementSavings * ((1 + assetsReturn) ** (retirementAge - currentAge)))
  )

  if (isNaN(balance)) {
    document.getElementById('balance').innerHTML = ' '
  }
  else {
    document.getElementById('balance').innerHTML = balance.toFixed(2)

    return balance.toFixed(2)
  }
}

// the retirementIncomePerYear function calculates the yearly income that the user will be able to spend from retirement to death (or age 90)
const retirementIncomePerYear = () => {
  let retirementAge = document.getElementById('retirementAge').value
  let yearsRetired = (90 - retirementAge)
  let negativeYearsRetired = -yearsRetired
  let assetsReturn = (document.getElementById('assetsReturn').value) / 100

  let incomeBalance = (((assetsReturn * retirementBalance()) / (1 - (1 + assetsReturn) ** negativeYearsRetired)))

  if (isNaN(incomeBalance)) {
    document.getElementById('incomeBalance').innerHTML = ' '
  }
  else {
    document.getElementById('incomeBalance').innerHTML = incomeBalance.toFixed(2)

    return incomeBalance.toFixed(2)
  }
}

// the yearsWithRetirementIncome function calculates the number of years the user will have income
const yearsWithRetirementIncome = () => {
  let assetsReturn = (document.getElementById('assetsReturn').value) / 100
  let anticSpending = document.getElementById('anticSpending').value

  const yearsWithIncome = (Math.log((anticSpending / (anticSpending - retirementBalance() * assetsReturn))) / Math.log(1 + assetsReturn))

  if (isNaN(yearsWithIncome)) {
    document.getElementById('yearsWithIncome').innerHTML = ''
  }
  else {
    document.getElementById('yearsWithIncome').innerHTML = yearsWithIncome.toFixed(2)

    return yearsWithIncome.toFixed(2)
  }
}

// the retirementCalculations function displays the three functions within the calculate button
const retirementCalculations = () => {
  retirementBalance()
  retirementIncomePerYear()
  yearsWithRetirementIncome()
}

const suggestions = () => {
  let currentAge = document.getElementById('currentAge').value
  
  if (currentAge < 30) {
    return 'You should aim to save about the amount of your yearly income your income by age 30'
  }
}

// calling function
console.log(retirementBalance())
console.log(retirementIncomePerYear())
console.log(yearsWithRetirementIncome())
console.log(retirementCalculations())

// const assetsReturn = .05
// const retirementAge = 78
console.log('here')
console.log(retirementBalanceObject)

