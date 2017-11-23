(function () {  
    TABLE.Controllers.ModalController = function () {  
        var model = TABLE.Models.GoodsList;

        var GoodsList = model.getGoodsList();

        $('#ProductTableBody').click(popUpModal);
        $('#btn-addnew').click(popUpModal);

        function popUpModal(e) {  
            e.preventDefault();
            if (/btn-addnew/.test(e.target.className)) {
                $('#iModal').css('display', 'block');
            }
            if ( /btn-tb-edit/i.test(e.target.className)) {
                $('#iModal').css('display', 'block');
               var goodsId = e.target.parentNode.parentNode.id;
             //  var d = GoodsList[goodsId];
               $('#inp-name').val(GoodsList[goodsId].name);
               $('#inp-count').val(GoodsList[goodsId].count);
               $('#inp-price').val(GoodsList[goodsId].price);
            }           
        }
    }();
})();