(function () {  
    TABLE.Controllers.ModalController = function () {  
        var model = TABLE.Models.GoodsList,
            view = TABLE.Views.ModalView,
            controller = TABLE.Controllers.AddEditDeleteController;

        var GoodsList = model.getGoodsList(),
            goodsId;
        // Handlers
        $('#ProductTableBody').click(popUpModal);
        $('#btnAddnew').click(popUpModal);
        $('#modalClose').click(function (e) {  $('#main').unbind('keydown'); view.hideModal();} );
        $('#btnNo').click(function (e) {  $('#main').unbind('keydown'); view.hideModal(goodsId);});
        
        function popUpModal(e) {  
            e.preventDefault();
            if (!/button/i.test(e.target.tagName)){
                return;
            }
            if (/add/i.test(e.target.textContent.replace(/\s/g, ''))) {               
                view.renderModal();
                controller.initializer();
            }
            if (/edit/i.test(e.target.textContent.replace(/\s/g, ''))) {   
               goodsId = e.target.parentNode.parentNode.id;
               view.renderModal(GoodsList, goodsId);
               controller.initializer(goodsId);
            }  
            if (/delete/i.test(e.target.textContent.replace(/\s/g, ''))) {   
                goodsId = e.target.parentNode.parentNode.id;
                view.renderModal(GoodsList, goodsId, true);
                controller.initializer(goodsId);
             }           
        }
    }();
})();