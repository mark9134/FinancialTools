/**
 * Set of functions to calculate property evaluations
 */

 // property object
 var property = {
    purchasePrice: 119000,
    monthlyRent: 1200,
    annualIncome: 14400,
    vacancyRate: 720,
    annualExpenses: 5560, // HOA 380 * 12 + 1000 for taxes & insurance
    calcRentPriceRatio: function() {
        this.rentPriceRatio = (this.monthlyRent / this.purchasePrice) * 100;
        return this.rentPriceRatio;
    },
    calCapRate: function () {
        this.netOperatingIncome = (this.annualIncome - this.vacancyRate) - this.annualExpenses;
        this.capRate = (this.netOperatingIncome / this.purchasePrice) * 100;
        return this.capRate;
    }
 };

 console.log("The rent to price ratio is " + property.calcRentPriceRatio() + '%');
 console.log('The Cap Rate is ' + property.calCapRate() + '%');
