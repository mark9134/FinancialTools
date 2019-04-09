/**
 * Set of functions to calculate property evaluations
 */

var UIController = (function() {
    var DOMstrings = {
        description:    'description',
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
                    description: document.getElementById(DOMstrings.description).value,
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
   
    var Property = function (id, description, price, rent, fees) {
        this.id = id;
        this.description = description;
        this.price = price;
        this.rent = rent;
        this.fees = fees;
    }

    propertyDB = {
        propertyArray: []
    }

    function create_UUID(){
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    return {
        addNewProperty: function(desc, price, rent, fees) {
            var id = create_UUID();
            var newProp;
            newProp = new Property(id, desc, price, rent, fees);
            propertyDB.propertyArray.push(newProp);
            console.log(propertyDB)
            return(newProp);
        },
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
    
    var setupEventListeners = function () {
        var dom = UICtrl.getDOMstrings;
        
        //add event listener to button
        document.querySelector('.calc_button').addEventListener('click',calcOnClick);
        //add event listener for keyboard (enter key code =13)
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                calcOnClick();
            }
        });
    
    }

    var calcOnClick = function() {
        var properties = UICtrl.getInput();
        var newProperty;

        console.log(properties);
        newProperty = dataController.addNewProperty(properties.description,
            properties.purchasePrice, properties.annualIncome, properties.annualExpenses);
        
        UICtrl.displayRentRation(
            DATACtrl.calcRentPriceRatio(properties.monthlyRent, properties.purchasePrice));
        
        UICtrl.displayCapRate(DATACtrl.calCapRate(properties));
    }
   

    return {
        init : function () {
            setupEventListeners();

        }
    };

    })(UIController, dataController);

    controller.init();