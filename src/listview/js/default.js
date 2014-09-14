'use strict';

window.name = "NG_DEFER_BOOTSTRAP!";

require(['angular'], function (angular) {
    var app = angular.module('listViewDemoApp', []);

    app.controller('listViewDemoController', function($scope) {
        $scope.tableControls = [
            {
                name: 'ng-grid',
                url: 'nggrid.html',
                selected: true,
            },
        ];

        $scope.features = [
            {
                name: 'selection',
                selected: true,
            },
            {
                name: 'template',
            },
            {
                name: 'datasource',
            },
            {
                name: 'inlineeditor',
            },
            {
                name: 'paginate',
            },
        ];

        $scope.selectedTableControl = $scope.tableControls[0];
        $scope.selectedFeature = $scope.features[0];

        $scope.selectTableControl = function(tableControl) {
            $scope.selectedTableControl.selected = false;
            $scope.selectedTableControl = tableControl;
            $scope.selectedTableControl.selected = true;
            navigate();
        };

        $scope.selectFeature = function(feature) {
            $scope.selectedFeature.selected = false;
            $scope.selectedFeature = feature;
            $scope.selectedFeature.selected = true;
            navigate();
        };

        function navigate() {
            $scope.demoUrl = $scope.selectedTableControl.url + '#/' + $scope.selectedFeature.name;
        };

        navigate();
    });

    angular.bootstrap(document, ['listViewDemoApp']);
});


