(function () {  
    TABLE.Views.ModalView = (function () {  

        function _renderModal(goodsList, goodsId, toDelete) {
            if (toDelete) {
                // Delete confirmation pop up
                $('#' + goodsId).css('background-color', 'red');
                $('#iModalDelete').css('display', 'block');
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
                
                $('#inpClear').css('display', 'none');
                $('#btnModal').html('Update');
    
            }else{
                // Add modal pop up
                $('#inpClear').css('display', 'block');
                $('#btnModal').html('  Add  ');
            }
            $('#iModal').css('display', 'block');
        }

        function _hideModal(goodsId) {  
            $('#iModal').css('display', 'none');
            $('#iModalDelete').css('display', 'none');
            ['errorInName', 'errorInCount', 'errorInPrice'].forEach(element => { _hideError(element) });
            if (goodsId) {
                $('#' + goodsId).css('background-color', 'inherit');
            }           
        }

        function _showError(errorText, address) { 
            $('#' + address).text(errorText);
            $('#' + address + ' + input').css('border', '2px solid red');
        }

        function _hideError(address) { 
            $('#' + address).text('');
            $('#' + address + ' + input').css('border', 'inherit');
        }
        
        return {
            renderModal: _renderModal,
            hideModal: _hideModal,
            showError: _showError,
            hideError: _hideError
        }
    })();
})();