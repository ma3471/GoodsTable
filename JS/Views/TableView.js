(function () {  
    TABLE.Views.TableView = (function () {  

        var patternTableRowHTML = $('#TableRowPattern').html(),
            tableBody = $('#ProductTableBody');

        function getFullHTML(goodsList, filter, whatHighliht) { 
            var result = '',
                pattern = new RegExp(filter, 'i'),
                patternX = new RegExp(whatHighliht, 'ig'),
                len = goodsList.length;
                for (let index = 0; index < len; index++) {
                    const element = goodsList[index];                                  
                    if (!pattern.test(element.name)) {
                        continue;
                    }
                    result = result + patternTableRowHTML
                    .replace(/ItemId/, index)
                    .replace(/ItemName/, element.name.replace(patternX, '<i>'+ whatHighliht.toUpperCase() + '</i>'))
                    .replace(/ItemCount/, element.count)
                    .replace(/ItemPrice/, element.price.toLocaleString("en", {
                     style: "currency",
                     currency: "USD"
                    }));
            };
            return result;
        }
        function _renderSortedTable(goodsList, filter, whatHighliht, sortBy) { 
            var imageElement; 
            if (sortBy == 'name') {
                imageElement = $('#sort-name-image');
            }else{
                imageElement = $('#sort-price-image');
            }
            imageElement.toggleClass('lnr-chevron-up');
            imageElement.toggleClass('lnr-chevron-down');
       
            _renderFilteredTable(goodsList, filter, whatHighliht);
        }
        
        function _renderFilteredTable(goodsList, filter, whatHighliht) {  
            tableBody.html(getFullHTML(goodsList, filter, whatHighliht));
        }

        return {
            renderFilteredTable: _renderFilteredTable,
            renderSortedTable: _renderSortedTable
        }
    })();
})();