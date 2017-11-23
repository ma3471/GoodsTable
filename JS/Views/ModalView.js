(function () {  
    TABLE.Views.ModalView = (function () {  

        function _renderModal(goodsList, goodsId) {  
            if (goodsId) {
                $('#inp-name').val(goodsList[goodsId].name);
                $('#inp-count').val(goodsList[goodsId].count);
                $('#inp-price').val(goodsList[goodsId].price);
                $('.clear-block').css('display', 'none');
                $('#btn-modal').html('Update');
            }else{
                $('.clear-block').css('display', 'block');
                $('#btn-modal').html('  Add  ');
            }
            $('#iModal').css('display', 'block');
        }
        function _hideModal() {  
            $('#iModal').css('display', 'none');
        }
        return {
            renderModal: _renderModal,
            hideModal: _hideModal
        }
    })();
})();