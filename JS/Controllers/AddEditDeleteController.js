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
            isPriceStored$ = $('#isPriceStored'),
            priceTrigger = true,
//            priceNotEntered = true,
            nameNotEntered = true;
             
            $('#btnModal').click(addEditHandler);
            $('#inpClear').click(clearClackHandler);
            $('#btnYes').click(deleteHandler);
             
            name$.keyup(nameHandler);
            name$.hover(nameHandler);
            name$.focusout(nameHandler);
            name$.keydown(catchEnterHandler);

            count$.keypress(countHandler);
            count$.mouseleave(countLeaveHandler); 
            count$.bind('paste', function() { return false;});

            price$.hover(priceComeInHandler, priceComeOutHandler);
            price$.focusin(priceComeInHandler);
            price$.blur(priceComeOutHandler);
            price$.keyup(priceKeyPressHandler);
            price$.keydown(catchEnterHandler);

            function addEditHandler(e) {  
                e.preventDefault();
                var errorInName = validator.getErrorInNameIfAny(name$.val()),
                    errorInPrice;
                if (isPriceStored$.val()) {
                    errorInPrice = false;
                }else{
                    errorInPrice = validator.getErrorInPriceIfAny(price$.val());
                }
                if (errorInName) {
                    view.ModalView.showError(errorInName, 'errorInName');
                }
                if (errorInPrice) {
                    view.ModalView.showError(errorInPrice, 'errorInPrice');
                }
                if (errorInName || errorInPrice ) { 
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
                $('#main').unbind('keydown');
            }

            function deleteHandler(e) {  
                var goodsId = $('#goodsId').val();
                filter = $('#currentFilter').val();
                goodsList.splice(goodsId, 1); 
                view.TableView.renderFilteredTable(goodsList, filter);
                view.ModalView.hideModal();
                $('#main').unbind('keydown');
            }
            
// Field Name hadler
            function nameHandler(e) { 
                if (nameNotEntered) {
                    return true;
                } 
                var errorInName = validator.getErrorInNameIfAny(name$.val());    
                
                if (errorInName) {
                    view.ModalView.showError(errorInName, 'errorInName');
                    return true;
                }
                view.ModalView.hideError('errorInName');
                return true;
            }

// Field Count handlers
            function countHandler(e) {  
                if (e.which === 13) {
                    return false;
                }
                var key = String.fromCharCode(e.which),
                    error = validator.getErrorInCountIfAny(key);
                if (error) {               
                    view.ModalView.showError(error, 'errorInCount');
                    return false;
                }
                view.ModalView.hideError('errorInCount');
                return true;
            }

            function countLeaveHandler(e) {  
                view.ModalView.hideError('errorInCount');
            }

// Field Price handlers
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
            }

            function priceComeOutHandler(e) { 
                if (priceTrigger) { 
                    return;
                }
                priceTrigger = true;
    
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

            function priceComeInHandler(e) {
                if (!priceTrigger) {   
                    return;
                }  
                priceTrigger = false;
                if (isPriceStored$.val()) {
                    price$.val(priceStored$.val());
                }
            } 
// Clear all fields handler
            function clearClackHandler(e) { 
                name$.val('');
                count$.val(''); 
                price$.val('');
                isPriceStored$.val(false);
                view.ModalView.hideModal();
                view.ModalView.renderModal();
                _initializer();        
            }

            function catchEnterHandler(e) {  
                if (e.keyCode === 13) {
                    e.preventDefault();
                }
            }

            function _initializer() { 
                priceTrigger = true; 
                nameNotEntered = true;
                name$.click(function () { nameNotEntered = false; name$.unbind('click')  });
                $('#main').keydown(catchEnterHandler);
            }
        return {
            initializer: _initializer
        }
    }();
})()