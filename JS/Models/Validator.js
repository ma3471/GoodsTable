(function () {
    TABLE.Models.Validator = (function () {

        function _getErrorInNameIfAny(item) {
            var error ='';
            if (/^\s*$/i.test(item)) {  
                error = 'Name may not be empty';
            }
            if (item.length > 15) {
                error = 'Max length is 15 chars, you typed ' + item.length + '.';
            }
            return error;
        }
        function _getErrorInCountIfAny(item) {
            var error ='';
            if (!/^\d+$/.test(item)) {
                error = 'Only numbers are acceptable';
            }
            return error;
        }
        function _getErrorInPriceIfAny(item) {
            var error ='',
                pattern = /^\s*\d+(\.\d{0,2})?\s*$/;
            if (!pattern.test(item)) {
                error = 'It is not a price anyway.';
            }
            return error;
        }
        return {
            getErrorInNameIfAny: _getErrorInNameIfAny,
            getErrorInCountIfAny: _getErrorInCountIfAny,
            getErrorInPriceIfAny: _getErrorInPriceIfAny
        }
    })();
})();