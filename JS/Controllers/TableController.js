(function () {
    var model = TABLE.Models.GoodsList,
        view = TABLE.Views.TableView,
        filter = '',//'\\w',
        filterX = '',//\\w
        sort = {
            nameUp: true,
            priceUp: false,
            by: 'name'
        };
    
    TABLE.Controllers.TableController = (function () {  
        var GoodsList = model.getGoodsList();
        
        view.renderFilteredTable(GoodsList, filter, filter);

        // eHandlers
        $('#btn-search').click(filterHandler);
        $('#filter').keyup(highlightHandler);
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
                GoodsList.sort(function (a ,b) { return a.name.toUpperCase() < b.name.toUpperCase() ? -1: 1;  });
            }else{
                GoodsList.sort(function (a, b) { return a.price - b.price; });
            }
            if (sortOrderUp) {
                GoodsList.reverse();
            }

            view.renderSortedTable(GoodsList, filter, filterX, sort.by);
        }
        // filter handler
        function filterHandler(e) {  
            e.preventDefault();
            var p = document.getElementById('filter'),
                wasEmpty = !filter;
            filter = $('#filter').val().replace(/\s/g, '');
            $('#currentFilter').val(filter);
            if (!filter) {
                p.value = '';
            } 
            if ((wasEmpty||(wasEmpty == '\\w'))&&!filter) {
                return;
            }
            
            view.renderFilteredTable(GoodsList, filter, filter);
        }   
        
        function highlightHandler(e) {  
          //  e.preventDefault();
            var p = document.getElementById('filter'),
                wasEmpty = !filterX;
            filterX = $('#filter').val().replace(/\s/g, '');
            $('#currentFilterX').val(filterX);
            if (!filterX) {
                p.value = '';
            } 
            if ((e.keyCode === 8) || (e.keyCode === 46)){ //backspase or del
                var counter = 0,
                    counterX = 0,
                    pattern = new RegExp(filter, 'i')
                    patternX = new RegExp(filterX, 'i');
                GoodsList.forEach(element => {
                   if (patternX.test(element.name)) {
                        counterX += 1;
                   }
                   if (pattern.test(element.name)) {
                        counter += 1;
                    }
                });
                if (counterX > counter) {
                    filter = filterX;    
                $('#currentFilter').val(filter);
                }  
            }
            if ((wasEmpty||(wasEmpty == '\\w'))&&!filterX) {
                return;
            }
            view.renderFilteredTable(GoodsList, filter, filterX);
          /*  if (!filterX) {
                view.renderFilteredTable(GoodsList, '');
            } 
            pattern = new RegExp(filterX, 'ig'),
            len = GoodsList.length;
            for (let index = 0; index < len; index++) {
                const element = GoodsList[index];                                  
      
                $('#' + index + ' a').text(element.name);

            }
           // view.renderFilteredTable(GoodsList, filter);
            for (let index = 0; index < len; index++) {
                const element = GoodsList[index];                                  
      
                if (!pattern.test(element.name)) {
                    continue;
                }
                $('#' + index + ' a').html(element.name.replace(pattern, '<i>'+ filterX.toUpperCase() + '</i>'));
            }*/
        }
    })();
})();