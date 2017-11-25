(function () {  
    TABLE.Controllers.AddEditDeleteController = function () {  
        var model = TABLE.Models,
            view = TABLE.Views;

        var goodsList = model.GoodsList.getGoodsList(),
            validator = model.Validator,
            name$ = $('#inpName'),
            count$ = $('#inpCount'),
            price$ = $('#inpPrice'),
            priceStored$ = $('#currentPrice'),
            isPriceStored$ = $('#isPriceStored');
             
            $('#btnModal').click(addEditHandler);
            
        //    price$.click(priceSwitchHandler);
            price$.hover(priceComeInHandler, priceComeOutHandler);
            price$.keypress(priceKeyPressHandler);
            
            name$.keypress(nameHandler);
            name$.hover(nameHandler);
//            count.bind('copy', function() { return false;});
            count$.keypress(countHandler);
            count$.mouseleave(countLeaveHandler); 
            count$.bind('paste', function() { return false;});
 //           count.bind('cut', function() { return false;});

            function addEditHandler(e) {  
                e.preventDefault();
              /*  var whoIs = e.target.id;//textContent.replace(/\s/g, '')
                switch (whoIs) {
                    case 'btnModal':*/
                        var /*name = $('#inpName').val(),
                            count = $('#inpCount').val(),
                            price = $('#inpPrice').val(),*/
                            errorInName = validator.getErrorInNameIfAny(name$.val()),
                         //   errorInCount = validator.getErrorInCountIfAny(count.val()),
                            errorInPrice;
                            if (isPriceStored$.val()) {
                                errorInPrice = false;//validator.getErrorInPriceIfAny(priceStored.val());
                            }else{
                                errorInPrice = validator.getErrorInPriceIfAny(price$.val());
                            }

                            if (errorInName) {
                                view.ModalView.showError(errorInName, 'errorInName');
                            }
                         /*   if (errorInCount) {
                                view.ModalView.showError(errorInCount, 'errorInCount');
                            }*/
                            if (errorInPrice) {
                                view.ModalView.showError(errorInPrice, 'errorInPrice');
                            }
                            if (errorInName || errorInPrice ) { //|| errorInCount
                                return;
                            }
                            // Get values from HTML storage
                            var goodsId = $('#goodsId').val();
                                filter = $('#currentFilter').val();
                            if (/update/i.test(e.target.textContent.replace(/\s/g, ''))) {
                                goodsList.splice(goodsId, 1);  
                            }
                            goodsList.push({name: name$.val(), count: count$.val() * 1, price: priceStored$.val() * 1});
                            view.TableView.renderFilteredTable(goodsList, filter);
                            view.ModalView.hideModal();
            /*            break;
                    case 'inpName':
                        break;
                    case 'inpCount':
                        break;
                    case 'inpPrice':
                        if (takeFromStorage) {
                            price.val(priceStored.val());
                        }
                        
                        break;
                    default:
                        break;
                }*/
            }

            function nameHandler(e) {  
                var errorInName = validator.getErrorInNameIfAny(name$.val());
                
                    if (errorInName) {
                        view.ModalView.showError(errorInName, 'errorInName');
                        return true;
                    }
                    view.ModalView.hideError('errorInName');
                    return true;
            }

            function countHandler(e) {  
                var key = String.fromCharCode(e.which),
                    error = validator.getErrorInCountIfAny(key);
                if (error) {                 ///\d/.test(key)
                    view.ModalView.showError(error, 'errorInCount');
                    return false;
                }
                view.ModalView.hideError('errorInCount');
                return true;
            }

            function countLeaveHandler(e) {  
                view.ModalView.hideError('errorInCount');
            }

            function priceKeyPressHandler(e) {  
                var value = price$.val(),
                    errorInPrice = validator.getErrorInPriceIfAny(value);
                if (errorInPrice) {
                    view.ModalView.showError(errorInPrice, 'errorInPrice');
                    isPriceStored$.val(false);
                    return;
                }
                view.ModalView.hideError('errorInPrice');
                isPriceStored$.val(true);
                priceStored$.val(value);
            /*    price$.val((value * 1).toLocaleString("en", {
                    style: "currency",
                    currency: "USD"
                   }));*/
            }
            function priceComeOutHandler(e) {  
                var value = price$.val(),
                    errorInPrice = validator.getErrorInPriceIfAny(value);
                if (errorInPrice) {
                    view.ModalView.showError(errorInPrice, 'errorInPrice');
                    isPriceStored$.val(false);
                    return;
                }
                view.ModalView.hideError('errorInPrice');
                priceStored$.val(value);
                isPriceStored$.val(true);
                price$.val((value * 1).toLocaleString("en", {
                    style: "currency",
                    currency: "USD"
                   }));
            }
            function priceComeInHandler(e) {  //hover or mouseleavein
                if (isPriceStored$.val()) {
                    price$.val(priceStored$.val());
                }
            } 

            function getPriceHelper() {  

            }

            function deleteHandler(e) {  

            }
    }();
})()