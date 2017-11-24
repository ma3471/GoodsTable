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
            if (/add/i.test(e.target.textContent.replace(/\s/g, ''))) {               
                view.renderModal();
            }
            if (/edit/i.test(e.target.textContent.replace(/\s/g, ''))) {   
               var goodsId = e.target.parentNode.parentNode.id;
               view.renderModal(GoodsList, goodsId);
            }  
            if (/delete/i.test(e.target.textContent.replace(/\s/g, ''))) {   
                var goodsId = e.target.parentNode.parentNode.id;
                view.renderModal(GoodsList, goodsId, true);
             }           
        }
    }();
})();