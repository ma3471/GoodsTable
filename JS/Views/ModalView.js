(function () {  
    TABLE.Views.ModalView = (function () {  

        function _renderModal(goodsList, goodsId, toDelete) {
            if (toDelete) {
                $('#' + goodsId).css('background-color', 'red');
                return;
            }  
            if (goodsId) {
                $('#inpName').val(goodsList[goodsId].name);
                $('#inpCount').val(goodsList[goodsId].count);
                $('#inpPrice').val(goodsList[goodsId].price.toLocaleString("en", {
                    style: "currency",
                    currency: "USD"
                   }));
                
                $('.clear-block').css('display', 'none');
                $('#btnModal').html('Update');
                // fill storage
                $('#goodsId').val(goodsId);
                $('#currentPrice').val(goodsList[goodsId].price);
                $('#isPriceStored').val(true);
            }else{
                $('.clear-block').css('display', 'block');
                $('#btnModal').html('  Add  ');
            }
            $('#iModal').css('display', 'block');
        }
        function _hideModal(e) {  
            $('#iModal').css('display', 'none');
            ['errorInName', 'errorInCount', 'errorInPrice'].forEach(element => { _hideError(element) });
            if (e) {
                e.stopPropagation();
            }           
        }
        function _showError(errorText, address) { 
            var elem = $('#' + address);
            elem.text(errorText);
           // elem.css('display', 'inline-block');
        }
        function _hideError(address) { 
            var elem = $('#' + address).text('');
            elem.text('');
           // elem.css('display', 'none');
        }
        return {
            renderModal: _renderModal,
            hideModal: _hideModal,
            showError: _showError,
            hideError: _hideError
        }
    })();
})();