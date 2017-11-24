(function () {
    TABLE.Models.Validator = (function () {

        function _getErrorInNameIfAny(item) {
            var error ='',
                pattern = '';
            if (!pattern.test(item)) {
                error = '';
            }

            return error;
        }
        function _getErrorInCountIfAny(item) {
            var error ='',
                pattern = '';
            if (!pattern.test(item)) {
                error = '';
            }

            return error;
        }
        function _getErrorInPriceIfAny(item) {
            var error ='',
                pattern = '';
            if (!pattern.test(item)) {
                error = '';
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