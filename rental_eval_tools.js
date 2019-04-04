/**
 * Set of functions to calculate property evaluations
 */
var UIController = (function() {

    var DOMstrings = {
        purchasePrice : 'purchase_price',
        monthlyRent : 'monthly_rent',
        annualIncome : 'annual_income',
        vacancyRate : 'vacancy_rate',
        annualExpenses : 'annual_expense',
        rentRatioOutput : 'rentratio-output',
        capRateOutput : 'caprate-output'
    };

    return {
        getInput : function() {
            return {
                    purchasePrice: document.getElementById(DOMstrings.purchasePrice).value,
                    monthlyRent: document.getElementById(DOMstrings.monthlyRent).value,
                    annualIncome: document.getElementById(DOMstrings.annualIncome).value,
                    vacancyRate: document.getElementById(DOMstrings.vacancyRate).value,
                    annualExpenses: document.getElementById(DOMstrings.annualExpenses).value// HOA 380 * 12 + 1000 for taxes & insurance
 
                    };
        },
        
        getDOMstrings: function() {
            return (DOMstrings);
        },

        displayRentRation: function (rentRatio) {
            rrString = "The rent to price ratio is " + rentRatio.toFixed(2) + '%';
            document.getElementById(DOMstrings.rentRatioOutput).innerHTML = rrString;
        },

        displayCapRate: function (capRate) {
            crString = ('The Cap Rate is ' + capRate.toFixed(2) + '%');
            document.getElementById(DOMstrings.capRateOutput).innerHTML = crString;
        }
        
        

    };
})();

// create data model controller
var dataController = (function() {
   
    return {
        calcRentPriceRatio: function(monthlyRent, purchasePrice) {
            return (monthlyRent / purchasePrice) * 100;
            
        },
        calCapRate: function (properties) {
            properties.netOperatingIncome = (properties.annualIncome - properties.vacancyRate) - properties.annualExpenses;
            properties.capRate = (properties.netOperatingIncome / properties.purchasePrice) * 100;
            return properties.capRate;
        }

    }

})();


// create global app controller
var controller  = (function(UICtrl, DATACtrl){
    var dom = UICtrl.getDOMstrings;

    var calcOnClick = function() {
        var properties = UICtrl.getInput();
        console.log(properties);
        UICtrl.displayRentRation(
            DATACtrl.calcRentPriceRatio(properties.monthlyRent, properties.purchasePrice));
        
        UICtrl.displayCapRate(DATACtrl.calCapRate(properties));
    }

    document.querySelector('.calc_button').addEventListener('click',calcOnClick);
    document.addEventListener('keypress', function(event) {
        if (event.keyCode === 13 || event.which === 13) {
            calcOnClick();
        }
    });
    

})(UIController, dataController);
