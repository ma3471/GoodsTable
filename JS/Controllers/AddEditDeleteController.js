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
            priceEntered = false,
            nameNotEntered = true;
             
            $('#btnModal').click(addEditHandler);
            $('#inpClear').click(clearClackHandler);
            $('#btnYes').click(deleteHandler);
             
            name$.keypress(nameHandler);
            name$.hover(nameHoverHandler);
            name$.keydown(catchEnterHandler);
            name$.focusout(nameHandler);
            name$.change(nameHandler);

            count$.keypress(countHandler);
            count$.mouseleave(countLeaveHandler); 
            count$.bind('paste', function() { return false;});

            price$.hover(priceComeInHandler, priceComeOutHandler);
            price$.keypress(priceKeyPressHandler);
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
                priceEntered = false;
                nameNotEntered = true;
            }

            function deleteHandler(e) {  
                var goodsId = $('#goodsId').val();
                filter = $('#currentFilter').val();
                goodsList.splice(goodsId, 1); 
                view.TableView.renderFilteredTable(goodsList, filter);
                view.ModalView.hideModal();
            }
// Field Name hadlers
            function nameHandler(e) { 
                if (nameNotEntered) {
                    nameNotEntered = false;
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

            function nameHoverHandler(e) { 
                if (nameNotEntered) {
                        return;
                    } 
                var errorInName = validator.getErrorInNameIfAny(name$.val());

                if (errorInName) {
                    view.ModalView.showError(errorInName, 'errorInName');
                    return;
                }
                view.ModalView.hideError('errorInName');
                return;
            }
// Field Count handlers
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
// Field Price handlers
            function priceKeyPressHandler(e) {
                priceEntered = true;  
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
                var value = price$.val(),
                    errorInPrice = validator.getErrorInPriceIfAny(value);
                if (errorInPrice && priceEntered) {
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
                priceNotEntered = true;
                nameEntered = false;
            }

            function catchEnterHandler(e) {  
                if (e.keyCode === 13) {
                    e.preventDefault();
                }
            }
    }();
})()