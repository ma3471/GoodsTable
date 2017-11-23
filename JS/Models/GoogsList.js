(function () {
    TABLE.Models.GoodsList = (function () { 
        var GoodsList = [{
            name: "Samsung",
            count: 5,
            price: 12123343.25
        }, {
            name: "Apple S",
            count: 10,
            price: 12225.00
        }, {
            name: "Google",
            count: 115,
            price: 12143.25
        }, {
            name: "Sony",
            count: 5,
            price: 993343.25,
        }];
        function _getGoodsList() {
            return GoodsList;
        }

        return {
            getGoodsList: _getGoodsList,
        }

    })();
})();