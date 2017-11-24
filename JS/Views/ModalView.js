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
                $('#inpPrice').val(goodsList[goodsId].price);
                $('.clear-block').css('display', 'none');
                $('#btnModal').html('Update');
            }else{
                $('.clear-block').css('display', 'block');
                $('#btnModal').html('  Add  ');
            }
            $('#iModal').css('display', 'block');
        }
        function _hideModal(e) {  
            $('#iModal').css('display', 'none');
            e.stopPropagation();
        }
        return {
            renderModal: _renderModal,
            hideModal: _hideModal
        }
    })();
})();