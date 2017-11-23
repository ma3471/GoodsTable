(function () {
    TABLE.Models.GoodsList = (function () { 
        var GoodsList = [{
            id: 1,
            name: "Samsung",
            count: 5,
            price: 12123343.25
        }, {
            id: 2,
            name: "Apple S",
            count: 10,
            price: 12225.00
        }, {
            id: 3,
            name: "Google",
            count: 115,
            price: 12143.25
        }, {
            id: 4,
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