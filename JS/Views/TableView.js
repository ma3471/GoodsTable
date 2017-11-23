(function () {  
    TABLE.Views.TableView = (function () {  

        var patternTableRowHTML = $('#TableRowPattern').html(),
            tableBody = $('#ProductTableBody');

        function getFullHTML(goodsList, filter) { 
            var result = '',
                pattern = new RegExp(filter, 'i');
                for (let index = 0; index < goodsList.length; index++) {
                    const element = goodsList[index];                                  
          //  goodsList.forEach(element => {
                    if (!pattern.test(element.name)) {
                        continue;
                    }
                    result = result + patternTableRowHTML
                    .replace(/ItemId/, index)
                    .replace(/ItemName/, element.name)
                    .replace(/ItemCount/, element.count)
                    .replace(/ItemPrice/, element.price.toLocaleString("en", {
                     style: "currency",
                     currency: "USD"
                    }));
            };
            return result;
        }
        function _renderSortedTable(goodsList, filter, sortBy) { 
            var imageElement; 
            if (sortBy == 'name') {
                imageElement = $('#sort-name-image');
            }else{
                imageElement = $('#sort-price-image');
            }
            imageElement.toggleClass('lnr-chevron-up');
            imageElement.toggleClass('lnr-chevron-down');
        /*    if (imageElement.hasClass('lnr-chevron-up')) {
                imageElement.removeClass('lnr-chevron-up');
                imageElement.addClass('lnr-chevron-down');
            }else{
                imageElement.removeClass('lnr-chevron-down');
                imageElement.addClass('lnr-chevron-up');
            }*/
            _renderFilteredTable(goodsList, filter);
        }
        
        function _renderFilteredTable(goodsList, filter) {  
            tableBody.html(getFullHTML(goodsList, filter));
        }
        return {
            renderFilteredTable: _renderFilteredTable,
            renderSortedTable: _renderSortedTable
        }
    })();
})();