;(function () {
    'use strict';

    angular.module('app', [
        'ngMaterial',
        'ui.router',
        'md.data.table',
        'app.home'
    ])
        .run(run);


    function run() {
        console.log('app is ready');
    }

})();



