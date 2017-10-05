;(function () {
    angular.module('app')
        .service('weather', weather);

    weather.$inject = ['$http'];

    function weather($http) {
        var city = 'bradford';
        var service = {
            getData: getData,
            getCityName: getCityName
        };

        return service;

        function getData(url) {
            city = url;
            return $http(
                {
                    method: 'GET',
                    url: './data/' + url + 'data.txt'
                }
            ).then(function (res) {
                return parseData(res.data)
            });
        }

        function getCityName() {
            return city
        }

    }

    function parseData(res) {
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
        var temp = res.split('\n');
        var result = [];
        temp.forEach(function (item) {
            var replace = item.replace(/  +/g, ' ').replace(/^\s*/, '');
            if (!isNaN(parseInt(replace))) {
                var obj = {};
                replace.split(' ').forEach(function (item, i) {
                    obj[idx[i]] = item;
                    obj[idx[i] + '_transformed'] = transformData(item);
                });
                result.push(obj);
            }
        });
        return result;
    }

    function transformData(res) {
        if (res.indexOf('*') != -1) {
            var tmp;
            tmp = +res.slice(0, res.indexOf('*'));
            return tmp
        } else if (res.indexOf('#') != -1) {
            var tmp;
            tmp = +res.slice(0, res.indexOf('#'));
            return tmp
        } else if (res.indexOf('---') != -1) {
            return Number.MIN_SAFE_INTEGER
        } else {
            return +res
        }
    }
})();