'use strict';

window.name = "NG_DEFER_BOOTSTRAP!";

require(['angular', 'ngRoute', 'ngGrid'], function (angular) {
    function buildUpTemplate(controllers) {
        var stringBuilder = [];

        for (var i in controllers) {
            stringBuilder.push('<div ng-controller="' + controllers[i] + '"><div>{{title}}</div><div class="gridStyle" ng-grid="gridOptions"></div></div>');
        }

        return stringBuilder.join('\r');
    }

    var testData = [
            {name: "Moroni", age: 50},
            {name: "Tiancum", age: 43},
            {name: "Jacob", age: 27},
            {name: "Nephi", age: 29},
            {name: "Enos", age: 34}
    ];

    var app = angular.module('ngGridDemoApp', ['ngRoute', 'ngGrid']);

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
        .when('/selection',
        {
            templateUrl: 'selection.html',
            controller: 'containerController'
        })
        .when('/template',
        {
            templateUrl: 'template.html',
            controller: 'containerController'
        });
    }]);

    app.controller('containerController', function($scope) {
    });

    app.controller('singleSelectionController', function($scope) {
        $scope.testData = testData;
        $scope.title = 'Single selection';
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
        };
    });

    app.controller('multipleSelectionController', function($scope) {
        $scope.testData = testData;
        $scope.title = 'Multiple selection';
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: true,
        };
    });

    app.controller('cellSelectionController', function($scope) {
        $scope.testData = testData;
        $scope.title = 'Cell selection';
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
            enableCellSelection: true,
            enableRowSelection: false,
        };
    });

    app.run(['$templateCache', function ($templateCache) {
        $templateCache.put('selection.html', buildUpTemplate(['singleSelectionController', 'multipleSelectionController', 'cellSelectionController']));
    }]);

    app.controller('cellTemplateController', function($scope) {
        $scope.testData = testData;
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
            columnDefs: [
                {field: 'name', displayName: 'Name'},
                {field:'age', displayName:'Age', cellTemplate: '<div class="ngCellText"><input value="{{row.getProperty(col.field)}}"></input></div>'}]
        };
    });

    app.controller('rowTemplateController', function($scope) {
        $scope.testData = testData;
        $scope.gridOptions = {
            data: 'testData',
            multiSelect: false,
            rowHeight: 90,
            rowTemplate:'<div style="height: 100%" ng-style="{ \'cursor\': row.cursor }"><div ng-repeat="col in renderedColumns">{{row.getProperty(col.field)}}</div><button ng-click="row.entity.name = row.entity.name + \' - changed\'">change</button><button ng-click="$parent.testData=[]">remove</button></div>'
        };
    });

    app.run(['$templateCache', function ($templateCache) {
        $templateCache.put('template.html', buildUpTemplate(['cellTemplateController', 'rowTemplateController']));
    }]);

    angular.bootstrap(document, ['ngGridDemoApp']);
});

