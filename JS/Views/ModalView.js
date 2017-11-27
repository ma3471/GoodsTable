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
    
            }else{
                // Add modal pop up
                $('.clear-block').css('display', 'block');
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
               // e.stopPropagation();
            }           
        }

        function _showError(errorText, address) { 
            $('#' + address).text(errorText);
            $('#inp' + address.slice(7)).css('border', '2px solid red');
        }

        function _hideError(address) { 
            $('#' + address).text('');
            $('#inp' + address.slice(7)).css('border', 'inherit');
        }
        
        return {
            renderModal: _renderModal,
            hideModal: _hideModal,
            showError: _showError,
            hideError: _hideError
        }
    })();
})();