(function () {  
    TABLE.Views.ModalView = (function () {  

        function _renderModal(goodsList, goodsId, toDelete) {
            if (toDelete) {
                // Delete confirmation pop up
                $('#' + goodsId).css('background-color', 'red');
                $('#iModalDelete').css('display', 'block');
                $('#goodsId').val(goodsId);
                return;
            }  
            if (goodsId) {
                // Update  modal pop up
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
                // Add modal pop up
                $('.clear-block').css('display', 'block');
                $('#btnModal').html('  Add  ');
               // $('#isPriceStored').val(false);
            }
            $('#iModal').css('display', 'block');
        }
        function _hideModal(e) {  
            $('#iModal').css('display', 'none');
            $('#iModalDelete').css('display', 'none');
            ['errorInName', 'errorInCount', 'errorInPrice'].forEach(element => { _hideError(element) });
            if (e) {
                e.stopPropagation();
            }           
        }
        function _showError(errorText, address) { 
            var elem = $('#' + address);
            elem.text(errorText);
            var s = '#' + address + ' *';
            $(s).css('border', '3px solid red');
         //   $('#inpPrice').css('border', '3px solid red');
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