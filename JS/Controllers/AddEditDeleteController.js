(function () {  
    TABLE.Controllers.AddEditDeleteController = function () {  
        var model = TABLE.Models,
            view = TABLE.Views.ModalView;

        var goodsList = model.GoodsList.getGoodsList();
            validator = model.Validator;
             
            $('#iModalContent').click(addEditHandler);

            function addEditHandler(e) {  
                e.preventDefault();
                var whoIs = e.target.id;//textContent.replace(/\s/g, '')
                switch (whoIs) {
                    case 'btnModal':
                        var name = $('#inpName').val(),
                            count = $('#inpCount').val(),
                            price = $('#inpPrice').val(),
                            errorInName = validator.getErrorInNameIfAny(name),
                            errorInCount = validator.getErrorInCountIfAny(count),
                            errorInPrice = validator.getErrorInPriceIfAny(price);

                            if (errorInName) {
                                
                            }
                            if (errorInCount) {
                                
                            }
                            if (errorInPrice) {
                                
                            }
                            
                        break;
                    case 'inpName':
                        break;
                    case 'inpCount':
                        break;
                    case 'inpPrice':
                        break;
                    default:
                        break;
                }
            }

            function deleteHandler(e) {  

            }
    }();
})()