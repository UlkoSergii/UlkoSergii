/**
 * Created by credo on 30.09.2017.
 */

;(function () {
    'use strict';
    angular.module('app.home')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['data', 'weather', 'cities', '$timeout', '$q', '$log'];

    function HomeController(data, weather, cities, $timeout, $q, $log) {
        var vm = this;
        vm.weatherData = data;
        vm.city = 'Bradford';


        vm.myLimit = 10;
        vm.myPage = 1;
        vm.myOrder = 'year';

        vm.simulateQuery = false;
        vm.isDisabled = false;

        // list of `state` value/display objects
        vm.states = cities;
        vm.querySearch = querySearch;
        vm.selectedItemChange = selectedItemChange;
        vm.searchTextChange = searchTextChange;

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

        function searchTextChange(text) {
            $log.info('Text changed to ' + text);
        }

        function selectedItemChange(item) {
            if (item) {
                vm.city = item.display;
                vm.myPage = 1;
                vm.changeCity(item.value);
            }
            $log.info('Item changed to ' + JSON.stringify(item));
        }

        function createFilterFor(query) {
            var lowercaseQuery = angular.lowercase(query);

            return function filterFn(state) {
                return (state.value.indexOf(lowercaseQuery) === 0);
            };
        }
        
        vm.changeCity = changeCity;
        function changeCity(city) {
            weather.getData(city)
                .then(function (res) {
                    vm.weatherData = res;
                })
        }


        /*  vm.some = data.getAllData();

         vm.some.then(function (data) {
         vm.all = data;
         vm.items = [];
         vm.split = data.split("\n");


         vm.split.forEach(function (item) {
         item.split('\n').forEach(function (item) {

         if (item.split('')[0] == ' ' &&
         item.split('')[1] == ' ' &&
         item.split('')[2] == ' ' &&
         isNumeric(item.split('')[3])
         ) {
         parser(item);
         }

         })
         });


         console.log(vm.items);

         });

         function parser(item) {
         var str = '';
         var i = 0;
         var idx = [
         'year',
         'month',
         'tmax',
         'tmin',
         'af',
         'rain',
         'sun',
         'Provisional'
         ];
         var obj = {};
         for (var j = 0; j < item.length; j++) {

         if (item[j] != ' ') {
         str += item[j];
         if (item.length - 1 === j) {
         if (str[str.length - 2] == "*") {
         if (isNumeric(str[0])) str = +str.substring(0, str.length-2);
         obj[idx[i]] = {
         value: str,
         star: true
         }
         } else {
         if (isNumeric(str[0])) str = +str.substring(0, str.length);
         obj[idx[i]] = {
         value: str,
         star: false
         }
         }
         i++;
         str = '';
         }
         } else {
         if (str) {
         if (str[str.length - 1] == "*") {
         if (isNumeric(str[0])) str = +str.substring(0, str.length-1);
         obj[idx[i]] = {
         value: str,
         star: true
         }
         } else {
         if (isNumeric(str[0])) str = +str.substring(0, str.length);
         obj[idx[i]] = {
         value: str,
         star: false
         }
         }

         i++;
         str = '';
         }
         }
         }


         vm.items.push(obj);
         }


         function isNumeric(n) {
         return !isNaN(parseFloat(n)) && isFinite(n);
         }*/


        /*       function getData() {
         console.log(vm.some.split("/n"));
         return vm.some.split("/n");
         }*/

    }
})();