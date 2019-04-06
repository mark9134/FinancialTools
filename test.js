//write UI related code here
var UIController = (function() {
//create private vars and functions here
var state = 'false';

//create publich vars and functions here

return {
    getState: function() {
        return state;
    },

    setState: function(bool) {
        if (state === true || state === false) {
            state = bool;
        }
    };
}
})();


//write Data code here
var DataController = (function() {
    //private vars and methods here

    //puglic vars and methods here
    return {

    };
})();

//write code for main controller here

var Controller = (function(UICtrlr, DataCtrl){

        console.log(UICtrlr.getState());

})(UIController, DataController);