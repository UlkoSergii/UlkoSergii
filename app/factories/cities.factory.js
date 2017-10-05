/**
 * Created by credo on 04.10.2017.
 */
;(function () {
    angular.module('app')
        .factory('cities', cities);

    cities.$inject = [];
    
    function cities() {
        
        const citiesNames = 'Bradford, Durham, Eastbourne, Leuchars, Paisley';

        return citiesNames.split(/, +/g).map( function (state) {
            return {
                value: state.toLowerCase(),
                display: state
            };
        });
    }

})();