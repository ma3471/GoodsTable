(function () {
    var model = TABLE.Models.GoodsList,
        view = TABLE.Views.TableView,
        filter = '\\w',
        sort = {
            nameUp: true,
            priceUp: false,
            by: 'name'
        };
    
    TABLE.Controllers.TableController = (function () {  
        var GoodsList = model.getGoodsList();

        view.renderFilteredTable(GoodsList, filter);

        // eHandlers
        $('#btn-search').click(filterHandler);
        $('#sort-by-name').click(sortHandler);
        $('#sort-by-price').click(sortHandler);
        // Sort handler
        function sortHandler(e) {  
            e.preventDefault();
            var sortOrderUp;
            
            if ($(this).attr('id') == 'sort-by-name'){
                sort.by = 'name';
                sortOrderUp = sort.nameUp;
                sort.nameUp = !sort.nameUp;
            }else{
                sort.by = 'price';
                sortOrderUp = sort.priceUp;
                sort.priceUp = !sort.priceUp;
            }
            if (sort.by == 'name') {
                GoodsList.sort(function (a ,b) { return a.name > b.name;  });
            }else{
                GoodsList.sort(function (a, b) { return a.price - b.price; });
            }
            if (sortOrderUp) {
                GoodsList.reverse();
            }

            view.renderSortedTable(GoodsList, filter, sort.by);

        }
        // filter handler
        function filterHandler(e) {  
            e.preventDefault();
            var p = document.getElementById('filter'),
                wasEmpty = !filter;
            filter = $('#filter').val().replace(/\s/g, '');
            if (!filter) {
                p.value = '';
            } 
            if ((wasEmpty||(wasEmpty == '\\w'))&&!filter) {
                return;
            }
            
            view.renderFilteredTable(GoodsList, filter);
        }        
    })();
})();