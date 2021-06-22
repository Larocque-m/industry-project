/* eslint-disable max-len */
/* eslint-disable indent */
let describe = require('mocha').describe
let it = require('mocha').it
let expect = require('chai').expect
let { retirementBalance, retirementIncomePerYear, yearsWithRetirementIncome } = require('./calculations')

describe('calculations', () => {
  describe('retirementBalance', () => {
    it('returns the total balance of retirement balance', () => {
      // setup test data
      const currentAge = 40
      const currentIncome = 100000
      const incomeIncrease = .02
      const incomeContributed = .25
      const retirementAge = 65
      const retirementSavings = 200000
      const assetsReturn = .05

      // call the function with the test data
      let totalBalance = retirementBalance(currentAge, currentIncome, incomeIncrease, incomeContributed, retirementAge, retirementSavings, assetsReturn)

      // asserts what should be true
      expect(totalBalance).to.equal(2132061.78)
    })
  })

  describe('retirement income per year', () => {
    it('returns the amount distributed per year at retirement', () => {
      // setup test data
      const retirementAge = 65
      const assetsReturn = .05
      const yearsRetired = (90 - retirementAge)
      const negativeYearsRetired = -yearsRetired

      // call the function with the test data
      let totalIncomePerYear = retirementIncomePerYear(negativeYearsRetired, assetsReturn, retirementBalance())

      // asserts what should be true
      expect(totalIncomePerYear).to.equal(151275.02)
    })
  })

  describe('years with retirement income', () => {
    it('returns the amount of years until money runs out', () => {
      // setup test data
      const assetsReturn = .05
      const anticSpending = 120000

      // call the function with the test data
      let totalYearsWithIncome = yearsWithRetirementIncome(anticSpending, retirementBalance(), assetsReturn)

      // asserts what should be true
      expect(totalYearsWithIncome).to.equal(44.9)
})
  })
})
