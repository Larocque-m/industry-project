/* eslint-disable no-console */
/* eslint-disable max-len */
let chartRetirementSavings = parseInt(document.getElementById('retirementSavings').value)
let chartRetirementBalance = 0
let chartCurrentAge = parseInt(document.getElementById('currentAge').value)
let chartRetirementAge = parseInt(document.getElementById('retirementAge').value)

window.onload = () => {
  renderChart()
}

// the retirementBalance function calculates the entire balance the user will have saved at the age of retirement
const retirementBalance = () => {
  let currentAge = document.getElementById('currentAge').value
  let currentIncome = document.getElementById('currentIncome').value
  let incomeIncrease = (document.getElementById('incomeIncrease').value) / 100
  let incomeContributed = (document.getElementById('incomeContributed').value) / 100
  let retirementAge = document.getElementById('retirementAge').value
  let retirementSavings = document.getElementById('retirementSavings').value
  let assetsReturn = (document.getElementById('assetsReturn').value) / 100

  try {
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
  } catch (error) {
    console.error(error)
  }
}

// this renders a dynamic chart based on user inputs and function data
const renderChart = () => {
  // Setup Chart
  let chartElement = document.getElementById('chartContainer')

  chartRetirementBalance = parseInt(retirementBalance())

  let chart = new CanvasJS.Chart(chartElement, {
    animationEnabled: true,
    theme: 'light1',
    title: {
      text: 'Retirement Balance',
      fontFamily: 'Montserrat, sans-serif'
    },
    axisX: {
      title: 'Age',
      gridColor: '#AAAAAA ',
    },
    axisY: {
      title: 'Money Saved',
      gridColor: '#AAAAAA ',

    },
    data: [{
      type: 'line',
      indexLabelFontSize: 16,
      dataPoints: [
        {
          y: chartRetirementSavings, x: chartCurrentAge, indexLabel: '\u2193 current savings', markerColor: '#FF8C00', markerType: 'triangle', lineColor: '#FF8C00'
        },
        {
          y: chartRetirementBalance, x: chartRetirementAge, indexLabel: '\u2191 retirement balance', markerColor: '#FF8C00', markerType: 'triangle'
        },
      ]
    }]
  })

  chart.render()
}

// the retirementIncomePerYear function calculates the yearly income that the user will be able to spend from retirement to death (or age 90)
const retirementIncomePerYear = () => {
  let retirementAge = document.getElementById('retirementAge').value
  let yearsRetired = (90 - retirementAge)
  let negativeYearsRetired = -yearsRetired
  let assetsReturn = (document.getElementById('assetsReturn').value) / 100

  try {
    let incomeBalance = (((assetsReturn * retirementBalance()) / (1 - (1 + assetsReturn) ** negativeYearsRetired)))

    if (isNaN(incomeBalance)) {
      document.getElementById('incomeBalance').innerHTML = ' '
    }
    else {
      document.getElementById('incomeBalance').innerHTML = incomeBalance.toFixed(2)

      return incomeBalance.toFixed(2)
    }
  }
  catch (error) {
    console.log(error)
  }
}

// the yearsWithRetirementIncome function calculates the number of years the user will have income
const yearsWithRetirementIncome = () => {
  let assetsReturn = (document.getElementById('assetsReturn').value) / 100
  let anticSpending = document.getElementById('anticSpending').value

  try {
    const yearsWithIncome = (Math.log((anticSpending / (anticSpending - retirementBalance() * assetsReturn))) / Math.log(1 + assetsReturn))

    if (isNaN(yearsWithIncome)) {
      document.getElementById('yearsWithIncome').innerHTML = '>90'
    }
    else {
      document.getElementById('yearsWithIncome').innerHTML = yearsWithIncome.toFixed(2)

      return yearsWithIncome.toFixed(2)
    }
  }
  catch (error) {
    console.log(error)
  }
}

const suggestions = () => {
  let currentAge = document.getElementById('currentAge').value
  let currentIncome = document.getElementById('currentIncome').value
  let suggestion1 = document.getElementById('suggestion1').value

  if (currentAge <= 29) {
    let suggestion = `You should aim to save about ${currentIncome} of your yearly income by age 30`

    document.getElementById('suggestion1').innerHTML = suggestion
  }
  else if (currentAge >= 30 && currentAge <= 39) {
    let suggestion = `You should aim to save about ${(currentIncome * 2)} of your yearly income by age 40`

    document.getElementById('suggestion1').innerHTML = suggestion
  }
  else if (currentAge >= 40 && currentAge <= 49) {
    let suggestion = `You should aim to save about ${(currentIncome * 2)} of your yearly income by age 50`

    document.getElementById('suggestion1').innerHTML = suggestion
  }

  else if (currentAge >= 50 && currentAge <= 59) {
    let suggestion = `You should aim to save about $${(currentIncome * 3)} of your yearly income by age 60`

    document.getElementById('suggestion1').innerHTML = suggestion
  }

  if (incomeContributed <= 10) {
    let suggestion = `You should aim to save about $${(currentIncome * 3)} of your yearly income by age 60`

    document.getElementById('suggestion1').innerHTML = suggestion
  }
}

const suggestionIncome = () => {
  let incomeContributed = (document.getElementById('incomeContributed').value) / 100

  if (incomeContributed < 10) {
    let suggestion = 'You should aim to save at least 10% of your income each year'

    document.getElementById('suggestion2').innerHTML = suggestion
  }
}

// the retirementCalculations function displays the functions within the calculate button and renders the chart
const retirementCalculations = () => {
  let currentAge = document.getElementById('currentAge').value
  let anticSpending = document.getElementById('anticSpending').value
  let currentIncome = document.getElementById('currentIncome').value
  let incomeIncrease = (document.getElementById('incomeIncrease').value) / 100
  let incomeContributed = (document.getElementById('incomeContributed').value) / 100
  let retirementAge = document.getElementById('retirementAge').value
  let retirementSavings = document.getElementById('retirementSavings').value
  let assetsReturn = (document.getElementById('assetsReturn').value) / 100

  if (!currentAge || !retirementAge || !currentIncome || !incomeIncrease || !incomeContributed || !retirementSavings ||
    !assetsReturn || !anticSpending) alert('Please fill out all fields')

  else try {
    retirementBalance()
    retirementIncomePerYear()
    yearsWithRetirementIncome()
    chartRetirementSavings = parseInt(document.getElementById('retirementSavings').value)
    chartRetirementBalance = parseInt(retirementBalance())
    chartCurrentAge = parseInt(document.getElementById('currentAge').value)
    chartRetirementAge = parseInt(document.getElementById('retirementAge').value)
    renderChart()
    suggestions()
    suggestionIncome()
  }
  catch (error) {
    console.log(error)
  }
}

// calling functions
// console.log(retirementBalance())
// console.log(retirementIncomePerYear())
// console.log(yearsWithRetirementIncome())
// console.log(retirementCalculations())
// console.log(suggestions())
