/**
 * Created by credo on 04.10.2017.
 */
;(function () {
    angular.module('app.home' ,[])
        .config(config);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('home', {
                url: '/',
                templateUrl: 'templates/home/home.html',
                controller: 'HomeController',
                controllerAs: 'vm',
                resolve: {
                    data: function (weather) {
                        return weather.getData('bradford').then(function (res) {
                            return res
                        });
                    }
                }
            })
    }

})();