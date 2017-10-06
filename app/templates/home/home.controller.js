/**
 * Created by credo on 30.09.2017.
 */

;(function () {
    'use strict';
    angular.module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['data', 'weather', 'cities', '$timeout', '$q'];

    function HomeController(data, weather, cities, $timeout, $q) {
        var vm = this;

        vm.weatherData = data;
        vm.city = 'Bradford';

        vm.myLimit = 10;
        vm.myPage = 1;
        vm.myOrder = 'year';

        vm.simulateQuery = false;
        vm.isDisabled = false;

        vm.states = cities;

        vm.changeCity = changeCity;
        vm.querySearch = querySearch;
        vm.selectedItemChange = selectedItemChange;

        function changeCity(city) {
            weather.getData(city)
                .then(function (res) {
                    vm.weatherData = res;
                })
        }

        function querySearch(query) {
            var results = query ? vm.states.filter(createFilterFor(query)) : vm.states,
                deferred;
            if (vm.simulateQuery) {
                deferred = $q.defer();
                $timeout(function () {
                    deferred.resolve(results);
                }, Math.random() * 1000, false);
                return deferred.promise;
            } else {
                return results;
            }
        }

        function selectedItemChange(item) {
            if (item) {
                vm.city = item.display;
                vm.myPage = 1;
                vm.changeCity(item.value);
            }
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);
            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }
    }
})();