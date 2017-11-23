(function () {  
    TABLE.Controllers.ModalController = function () {  
        var model = TABLE.Models.GoodsList,
            view = TABLE.Views.ModalView;

        var GoodsList = model.getGoodsList();
        // Handlers
        $('#ProductTableBody').click(popUpModal);
        $('#btn-addnew').click(popUpModal);
        $('.modal-close').click(view.hideModal);

        function popUpModal(e) {  
            e.preventDefault();
            if (/btn-addnew/.test(e.target.className)) {               
                view.renderModal();
            }
            if ( /btn-tb-edit/i.test(e.target.className)) {
   
               var goodsId = e.target.parentNode.parentNode.id;
               view.renderModal(GoodsList, goodsId);
             //  var d = GoodsList[goodsId];
               
            }           
        }
    }();
})();