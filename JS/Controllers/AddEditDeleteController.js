(function () {  
    TABLE.Controllers.AddEditDeleteController = function () {  
        var model = TABLE.Models,
            view = TABLE.Views;

        var goodsList = model.GoodsList.getGoodsList();
            validator = model.Validator;
             
            $('#iModalContent').click(addEditHandler);
            $('#inpPrice').focusout(priceHandler);
            $('#inpCount').keypress(countHandler);
            $('#inpName').focusout(nameHandler);


            function addEditHandler(e) {  
                e.preventDefault();
                var whoIs = e.target.id;//textContent.replace(/\s/g, '')
                switch (whoIs) {
                    case 'btnModal':
                        var name = $('#inpName').val(),
                            count = $('#inpCount').val(),
                            price = $('#currentPrice').val(),
                            errorInName = validator.getErrorInNameIfAny(name),
                            errorInCount = validator.getErrorInCountIfAny(count),
                            errorInPrice = validator.getErrorInPriceIfAny(price);

                            if (errorInName) {
                                view.ModalView.showError(errorInName, 'errorInName');
                            }
                            if (errorInCount) {
                                view.ModalView.showError(errorInCount, 'errorInCount');
                            }
                            if (errorInPrice) {
                                view.ModalView.showError(errorInPrice, 'errorInPrice');
                            }
                            if (errorInName || errorInPrice || errorInCount) {
                                return;
                            }
                            // Get values from HTML storage
                            var goodsId = $('#goodsId').val();
                                filter = $('#currentFilter').val();
                            if (/update/i.test(e.target.textContent.replace(/\s/g, ''))) {
                                goodsList.splice(goodsId, 1);  
                            }
                            goodsList.push({name: name, count: count * 1, price: price * 1});
                            view.TableView.renderFilteredTable(goodsList, filter);
                            view.ModalView.hideModal();
                        break;
                    case 'inpName':
                        break;
                    case 'inpCount':
                        break;
                    case 'inpPrice':
                        $('#inpPrice').val($('#currentPrice').val());
                        break;
                    default:
                        break;
                }
            }

            function nameHandler(e) {  

            }

            function countHandler(e) {  

            }

            function priceHandler(e) {  
                $('#inpPrice').val($('#currentPrice').val());
            }

            function deleteHandler(e) {  

            }
    }();
})()