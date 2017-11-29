(function () {  
    TABLE.Controllers.AddEditDeleteController = function () {  
        var model = TABLE.Models,
            view = TABLE.Views;

        var goodsList = model.GoodsList.getGoodsList(),
            validator = model.Validator,
            name$ = $('#inpName'),
            count$ = $('#inpCount'),
            price$ = $('#inpPrice'),
            goodsId,
            priceStored,
            isPriceStored,
            priceToggle = true,
            isCursorIn = true,
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
            price$.focusin(function (e) { isCursorIn = true;  priceComeInHandler(e) });
            price$.blur(function (e) { isCursorIn = false;  priceComeOutHandler(e) });
            price$.keyup(priceKeyPressHandler);
            price$.keydown(catchEnterHandler);

            function addEditHandler(e) {  
                e.preventDefault();
                var errorInName = validator.getErrorInNameIfAny(name$.val()),
                    errorInPrice;
                if (isPriceStored) {
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
                if (/update/i.test(e.target.textContent.replace(/\s/g, ''))) {
                    goodsList.splice(goodsId, 1);  
                }
                goodsList.push({name: name$.val(), count: count$.val() * 1, price: priceStored * 1});
                goodBye();
            }

            function deleteHandler(e) {  
                goodsList.splice(goodsId, 1); 
                goodBye();
            }

            function goodBye() { 
                var filter = $('#currentFilter').val(),
                    filterX = $('#currentFilterX').val(); 
                view.TableView.renderFilteredTable(goodsList, filter, filterX);
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
                    isPriceStored = false;
                    return;
                }
                view.ModalView.hideError('errorInPrice');
                isPriceStored = true;
                priceStored = value;
            }

            function priceComeOutHandler(e) { 
                if (priceToggle || isCursorIn) { 
                    return;
                }
                priceToggle = true;
    
                var value = price$.val(),
                    errorInPrice = validator.getErrorInPriceIfAny(value);
                if (errorInPrice) {
                    view.ModalView.showError(errorInPrice, 'errorInPrice');
                    isPriceStored = false;
                    return;
                }
                view.ModalView.hideError('errorInPrice');
                priceStored = value;
                isPriceStored = true;
                price$.val((value * 1).toLocaleString("en", {
                    style: "currency",
                    currency: "USD"
                   }));
            }

            function priceComeInHandler(e) {
                if (!priceToggle) {   
                    return;
                }  
                priceToggle = false;
                if (isPriceStored) {
                    price$.val(priceStored);
                }
            } 
// Clear all fields handler
            function clearClackHandler(e) { 
                name$.val('');
                count$.val(''); 
                price$.val('');
                isPriceStored = false;
                view.ModalView.hideModal();
                view.ModalView.renderModal();
                _initializer();        
            }

            function catchEnterHandler(e) {  
                if (e.keyCode === 13) {
                    e.preventDefault();
                }
            }

            function _initializer(Id) { 
                if (Id) {
                    goodsId = Id;
                    priceStored = goodsList[goodsId].price;
                    isPriceStored = true;
                }
                priceToggle = true; 
                isCursorIn = false;
                nameNotEntered = true;
                name$.click(function () { nameNotEntered = false; name$.unbind('click')  });
                $('#main').keydown(catchEnterHandler);
            }
        return {
            initializer: _initializer
        }
    }();
})()